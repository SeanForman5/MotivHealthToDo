using FluentAssertions;
using Moq;
using MotivHealthCore.DataAccess.Interfaces;
using MotivHealthCore.DataAccess.Models;
using MotivHealthCore.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MotivHealthToDo.Tests.Tests.Services {
    public class ToDoServiceTests {
        private readonly Mock<IToDoRepository> _repo;
        private readonly ToDoService _service;

        public ToDoServiceTests() {
            _repo = new Mock<IToDoRepository>();
            _service = new ToDoService(_repo.Object);
        }

        [Fact]
        public async Task GetAllAsync_ReturnsAllToDos() {
            var todos = new List<ToDo>
            {
            new() { Id = 1, Name = "Test A", DateCompleted = null },
            new() { Id = 2, Name = "Test B", DateCompleted = new DateTime(2025, 6, 3) }
        };

            _repo.Setup(r => r.GetAllAsync()).ReturnsAsync(todos);

            var result = await _service.GetAllAsync();

            result.Should().HaveCount(2);
            result.Should().Contain(x => x.Name == "Test A" && x.DateCompleted == null);
            result.Should().Contain(x => x.Name == "Test B" && x.DateCompleted != null);
        }
        [Fact]
        public async Task GetByIdAsync_ReturnsItem_WhenFound() {
            var todo = new ToDo { Id = 1, Name = "Find me", DateCompleted = null };
            _repo.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(todo);

            var result = await _service.GetByIdAsync(1);

            result.Should().NotBeNull();
            result!.Name.Should().Be("Find me");
            result.DateCompleted.Should().BeNull();
        }

        [Fact]
        public async Task GetByIdAsync_ReturnsNull_WhenNotFound() {
            _repo.Setup(r => r.GetByIdAsync(999)).ReturnsAsync((ToDo?)null);

            var result = await _service.GetByIdAsync(999);

            result.Should().BeNull();
        }

        [Fact]
        public async Task CreateAsync_SavesAndReturnsNewItem() {
            var now = DateTime.UtcNow;
            var dto = new MotivHealthCore.Models.Domain.ToDo { Name = "New item", DateCompleted = now };
            var saved = new ToDo { Id = 42, Name = "New item", DateCompleted = now };

            _repo.Setup(r => r.AddAsync(It.IsAny<ToDo>())).ReturnsAsync(saved);

            var result = await _service.CreateAsync(dto);

            result.Id.Should().Be(42);
            result.Name.Should().Be("New item");
            result.DateCompleted.Should().BeCloseTo(now, TimeSpan.FromSeconds(1));
        }

        [Fact]
        public async Task UpdateAsync_DoesNothing_WhenNotFound() {
            _repo.Setup(r => r.GetByIdAsync(404)).ReturnsAsync((ToDo?)null);

            var dto = new MotivHealthCore.Models.Domain.ToDo { Name = "Update me", DateCompleted = DateTime.UtcNow };

            await _service.UpdateAsync(404, dto);

            _repo.Verify(r => r.UpdateAsync(It.IsAny<ToDo>()), Times.Never);
        }

        [Fact]
        public async Task UpdateAsync_ChangesFields_WhenFound() {
            var existing = new ToDo { Id = 10, Name = "Old", DateCompleted = null };
            var newDate = DateTime.UtcNow;

            _repo.Setup(r => r.GetByIdAsync(10)).ReturnsAsync(existing);

            var dto = new MotivHealthCore.Models.Domain.ToDo { Name = "Updated", DateCompleted = newDate };

            await _service.UpdateAsync(10, dto);

            _repo.Verify(r => r.UpdateAsync(It.Is<ToDo>(t =>
                t.Id == 10 &&
                t.Name == "Updated" &&
                t.DateCompleted == newDate
            )), Times.Once);
        }

        [Fact]
        public async Task DeleteAsync_Deletes_WhenFound() {
            var item = new ToDo { Id = 5 };
            _repo.Setup(r => r.GetByIdAsync(5)).ReturnsAsync(item);

            await _service.DeleteAsync(5);

            _repo.Verify(r => r.DeleteAsync(item), Times.Once);
        }

        [Fact]
        public async Task DeleteAsync_Skips_WhenNotFound() {
            _repo.Setup(r => r.GetByIdAsync(999)).ReturnsAsync((ToDo?)null);

            await _service.DeleteAsync(999);

            _repo.Verify(r => r.DeleteAsync(It.IsAny<ToDo>()), Times.Never);
        }
    }
}

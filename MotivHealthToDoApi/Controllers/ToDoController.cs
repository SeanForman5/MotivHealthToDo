using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MotivHealthCore.Interfaces;
using MotivHealthCore.Models.Domain;

namespace MotivHealthToDoApi.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoController : ControllerBase {
        private readonly IToDoService _toDoService;

        public ToDoController(IToDoService toDoService) {
            _toDoService = toDoService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ToDo>>> GetAll() {
            var todos = await _toDoService.GetAllAsync();
            return Ok(todos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ToDo>> Get(int id) {
            var todo = await _toDoService.GetByIdAsync(id);
            return todo == null ? NotFound() : Ok(todo);
        }

        [HttpPost]
        public async Task<ActionResult<ToDo>> Create([FromBody] ToDo dto) {
            var created = await _toDoService.CreateAsync(dto);
            return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ToDo dto) {
            await _toDoService.UpdateAsync(id, dto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id) {
            await _toDoService.DeleteAsync(id);
            return NoContent();
        }
    }
}

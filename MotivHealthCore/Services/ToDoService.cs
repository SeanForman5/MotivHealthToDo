using MotivHealthCore.DataAccess.Interfaces;
using MotivHealthCore.Interfaces;
using MotivHealthCore.Mappers;
using MotivHealthCore.Models.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MotivHealthCore.Services;
public class ToDoService :IToDoService{
    private readonly IToDoRepository _repository;

    public ToDoService(IToDoRepository repository) {
        _repository = repository;
    }

    public async Task<List<ToDo>> GetAllAsync() {
        var entities = await _repository.GetAllAsync();
        return entities.Select(ToDoMapper.ToDomain).ToList();
    }

    public async Task<ToDo?> GetByIdAsync(Int64 id) {
        var toDo = await _repository.GetByIdAsync(id);
        return toDo == null ? null : ToDoMapper.ToDomain(toDo);
    }

    public async Task<ToDo> CreateAsync(ToDo dto) {

        var entity = dto.ToData();
        dto.DateAdded = DateTime.Now;

        var saved = await _repository.AddAsync(entity);
        return ToDoMapper.ToDomain(saved);
    }

    public async Task UpdateAsync(Int64 id, ToDo dto) {
        var existing = await _repository.GetByIdAsync(id);
        if (existing == null) return;

        existing.Name = dto.Name;
        existing.DateCompleted = dto.DateCompleted;

        await _repository.UpdateAsync(existing);
    }

    public async Task DeleteAsync(Int64 id) {
        var existing = await _repository.GetByIdAsync(id);
        if (existing != null) {
            await _repository.DeleteAsync(existing);
        }
    }


}


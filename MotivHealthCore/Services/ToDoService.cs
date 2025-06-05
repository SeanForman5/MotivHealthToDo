using Microsoft.Extensions.Logging;
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
    private readonly ILogger<ToDoService> _logger;

    public ToDoService(IToDoRepository repository, ILogger<ToDoService> logger) {
        _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public async Task<List<ToDo>> GetAllAsync() {
        try {
            var entities = await _repository.GetAllAsync();
            return entities.Select(ToDoMapper.ToDomain).ToList();
        } catch (Exception ex) {
            _logger.LogError(ex, "Failed to retrieve todos.");
            throw;
        }
    }

    public async Task<ToDo?> GetByIdAsync(long id) {
        if (id <= 0) {
            _logger.LogWarning("Invalid ID requested: {Id}", id);
            return null;
        }

        var entity = await _repository.GetByIdAsync(id);
        return entity == null ? null : ToDoMapper.ToDomain(entity);
    }

    public async Task<ToDo> CreateAsync(ToDo dto) {
        if (dto == null) {
            throw new ArgumentNullException(nameof(dto));
        }

        var dataEntity = dto.ToData();
        dataEntity.DateAdded = DateTime.Now;

        var savedEntity = await _repository.AddAsync(dataEntity);

        _logger.LogInformation("Created new todo item with ID {Id}", savedEntity.Id);
        return ToDoMapper.ToDomain(savedEntity);
    }

    public async Task<Boolean> UpdateAsync(Int64 id, ToDo dto) {
        if (dto == null)
            throw new ArgumentNullException(nameof(dto));

        var existing = await _repository.GetByIdAsync(id);
        if (existing == null) {
            _logger.LogWarning("Attempted update on non-existent todo with ID {Id}", id);
            return false;
        }

        existing.Name = dto.Name?.Trim() ?? existing.Name;
        existing.DateCompleted = dto.DateCompleted;

        await _repository.UpdateAsync(existing);

        _logger.LogInformation("Updated todo with ID {Id}", id);
        return true;
    }

    public async Task<Boolean> DeleteAsync(Int64 id) {
        var existing = await _repository.GetByIdAsync(id);
        if (existing == null) {
            _logger.LogWarning("Attempted delete on non-existent todo with ID {Id}", id);
            return false;
        }

        await _repository.DeleteAsync(existing);
        _logger.LogInformation("Deleted todo with ID {Id}", id);
        return true;
    }

}


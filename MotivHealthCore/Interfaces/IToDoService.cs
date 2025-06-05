using MotivHealthCore.Models.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MotivHealthCore.Interfaces {
    public interface IToDoService {
        Task<List<ToDo>> GetAllAsync();
        Task<ToDo?> GetByIdAsync(Int64 id);
        Task<ToDo> CreateAsync(ToDo toDo);
        Task<Boolean> UpdateAsync(Int64 id, ToDo toDo);
        Task<Boolean> DeleteAsync(Int64 id);
    }
}

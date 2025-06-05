using MotivHealthCore.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MotivHealthCore.DataAccess.Interfaces {
    public interface IToDoRepository {
        Task<List<ToDo>> GetAllAsync();
        Task<ToDo?> GetByIdAsync(Int64 id);
        Task<ToDo> AddAsync(ToDo toDo);
        Task UpdateAsync(ToDo toDo);
        Task DeleteAsync(ToDo toDo);

    }
}

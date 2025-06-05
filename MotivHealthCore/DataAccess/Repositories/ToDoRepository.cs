using Microsoft.EntityFrameworkCore;
using MotivHealthCore.DataAccess.Interfaces;
using MotivHealthCore.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MotivHealthCore.DataAccess.Contexts {
    public class ToDoRepository : IToDoRepository {
        private readonly ToDoContext _context;

        public ToDoRepository(ToDoContext context) {
            _context = context;
        }

        public async Task<List<ToDo>> GetAllAsync() {
            return await _context.ToDos.ToListAsync();
        }

        public async Task<ToDo?> GetByIdAsync(Int64 id) {
            return await _context.ToDos.FindAsync(id);
        }

        public async Task<ToDo> AddAsync(ToDo item) {
            _context.ToDos.Add(item);
            await _context.SaveChangesAsync();
            return item;
        }

        public async Task UpdateAsync(ToDo item) {
            _context.ToDos.Update(item);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(ToDo item) {
            _context.ToDos.Remove(item);
            await _context.SaveChangesAsync();
        }

    }
    
}

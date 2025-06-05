using Microsoft.EntityFrameworkCore;
using MotivHealthCore.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MotivHealthCore.DataAccess.Contexts {
    public class ToDoContext : DbContext {
        public ToDoContext(DbContextOptions<ToDoContext> options) : base(options) { }

        public DbSet<ToDo> ToDos => Set<ToDo>();
    }
}

using MotivHealthCore.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MotivHealthCore.Mappers {
    public static class ToDoMapper {
        public static Models.Domain.ToDo ToDomain(this ToDo toDo) {
            return new Models.Domain.ToDo {
                Id = toDo.Id,
                Name = toDo.Name,
                DateCompleted = toDo.DateCompleted,
                DateAdded = toDo.DateAdded
            };
        }
        public static ToDo ToData(this Models.Domain.ToDo toDo) {
            return new ToDo {
                Id = toDo.Id,
                Name = toDo.Name,
                DateCompleted = toDo.DateCompleted,
                DateAdded = toDo.DateAdded,
            };
        }
    }
}

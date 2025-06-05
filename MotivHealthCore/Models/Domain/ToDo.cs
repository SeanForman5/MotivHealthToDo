using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MotivHealthCore.Models.Domain {
    public class ToDo {
        public Int64 Id { get; set; }
        public String Name { get; set; }
        public DateTime DateAdded { get; set; }
        public DateTime? DateCompleted { get; set; }
    }
}

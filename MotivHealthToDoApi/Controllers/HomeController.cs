using Microsoft.AspNetCore.Mvc;

namespace MotivHealthToDoApi.Controllers {
    public class HomeController : Controller {
        public IActionResult Index() {
            return View();
        }
    }
}

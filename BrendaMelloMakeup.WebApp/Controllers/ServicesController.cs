using Microsoft.AspNetCore.Mvc;

namespace BrendaMelloMakeup.WebApp.Controllers
{
    public class ServicesController : Controller
    {
        public IActionResult Makeup()
        {
            return View();
        }

        public IActionResult MakeupCourse()
        {
            return View();
        }

        public IActionResult MakeupHair()
        {
            return View();
        }

        public IActionResult Wedding()
        {
            return View();
        }
    }
}

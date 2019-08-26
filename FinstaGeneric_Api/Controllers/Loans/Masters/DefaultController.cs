using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FinstaApi.Controllers.Loans.Masters
{
    [EnableCors("CorsPolicy")]
    [ApiController]
    public class DefaultController : ControllerBase
    {

        private IHostingEnvironment _hostingEnvironment;

        public DefaultController(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }
        public class Employee
        {
            public int ID { get; set; }
            public string Fname { get; set; }
            public string Lname { get; set; }
            public string email { get; set; }
        }

        [Route("api/loans/masters/contact/PostTestNew")]
        [HttpPost]
        public Employee PostTest([FromBody]Employee _Test)
        {
            Console.WriteLine("Hit");
            _Test.email = "Nag@gmail.com";
            return _Test;
        }


        [Route("api/loans/masters/contact/FileUpload")]

        [HttpPost, DisableRequestSizeLimit]
        public IActionResult Upload()
        {
            try
            {
                Console.WriteLine("gtewtewt");
                var file = Request.Form.Files[0];
                string folderName = "Upload";
                string webRootPath = _hostingEnvironment.ContentRootPath;
                string newPath = Path.Combine(webRootPath, folderName);
                if (!Directory.Exists(newPath))
                {
                    Directory.CreateDirectory(newPath);
                }
                if (file.Length > 0)
                {
                    string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    string fullPath = Path.Combine(newPath, fileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    return Ok("");
                }
                else
                {
                    return BadRequest();

                }

            }
            catch (System.Exception ex)
            {
                return StatusCode(500, "Internal server error");
                throw ex;
            }
        }
    }
}
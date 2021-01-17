using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Authorization;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineSchool.Models;
using ViewModel;

namespace OnlineSchool.Controllers
{

    ////  [ApiController]
  //  [Authorize(Roles = "Admin", AuthenticationSchemes = "Admin")]
    public class AdminController : Controller
    {

        private readonly DatabaseContext _context;
        private readonly IWebHostEnvironment _hostingEnvironment;

        public AdminController(DatabaseContext context, IWebHostEnvironment hostingEnvironment)
        {
            _context = context;
            _hostingEnvironment = hostingEnvironment;
        }


        /// <summary>
        ///  (Admin Registration with One Image Upload)
        /// </summary>
        /// <param name="admin"></param>
        /// <returns></returns>

        [HeaderAuthorization]
        [AllowAnonymous]
        [Route("Admin/Registration")]
        [HttpPost]
        public async Task<ActionResult> Registration(AdminRegistrationViewModel admin)
        {
            if (!ModelState.IsValid)
            {
                return Json(new { success = false, error = "Input Formate not Staisfy" });
            }
            int Auth_ID = Convert.ToInt32(HttpContext.Session.GetString("Subject"));

            var verify_Email = await _context.Admin
                .Where(x => (x.Email == admin.Email && x.AuthID == Auth_ID))
                .FirstOrDefaultAsync();

            if (verify_Email != null)
            {
                return Json(new { success = false, error = "This Email is Already in USE" });
            }

            String UploadFolder = Path.Combine(_hostingEnvironment.WebRootPath, "AdminProfilePicture");
            String UniqueFileName = Guid.NewGuid().ToString() + "_" + admin.Photo.FileName;
            String FilePath = Path.Combine(UploadFolder, UniqueFileName);
            admin.Photo.CopyTo(new FileStream(FilePath, FileMode.Create));

            var data = new Admin
            {
                Name = admin.Name,
                Email = admin.Email,
                Phone = admin.Phone,
                Address = admin.Address,
                Password = admin.Password,
                AuthID = Auth_ID,
                Profile_Image_Path = UniqueFileName,

            };
            _context.Admin.Add(data);
            await _context.SaveChangesAsync();
            return Json(new { success = true, data = "Registration Complete" });
        }


        [HeaderAuthorization]
        [AllowAnonymous]
        [Route("Admin/Login")]
        [HttpPost]

        public async Task<ActionResult> Login([FromBody] AdminLogin admin)
        {
            if (!ModelState.IsValid)
            {
                return Json(new { success = false, data = "Login Failed" });
            }

            int Auth_ID = Convert.ToInt32(HttpContext.Session.GetString("Subject"));

            var data = await _context.Admin
                .Where(x => (x.Email == admin.Email && x.Password == admin.Password && x.AuthID == Auth_ID))
                .FirstOrDefaultAsync();

            if (data == null)
            {
                return Json(new { success = false, data = "Login Failed" });
            }
            else
            {
                await HttpContext.SignOutAsync("Student");
                await HttpContext.SignOutAsync("Provider");
                await HttpContext.SignOutAsync("Admin");
                await HttpContext.SignOutAsync("Teacher");

                ClaimsIdentity identity = null;
                identity = new ClaimsIdentity(new[] {
                        new Claim(ClaimTypes.Email,admin.Email),
                        new Claim(ClaimTypes.Role,"Admin")

                     }, CookieAuthenticationDefaults.AuthenticationScheme);

                var principal = new ClaimsPrincipal(identity);
                await HttpContext.SignInAsync("Admin", principal);

                HttpContext.Session.SetString("ADID", data.ADID.ToString());


                return Json(new { success = true, data = "/Admin/Profile", UserId = data.ADID.ToString() });
            }
        }


        [HeaderAuthorization]
        [Route("Admin/Profile/{uid}")]
        [HttpGet]

        public async Task<ActionResult> Profile(int? uid)
        {
            if (uid == null)
            {
                return Unauthorized();
            }

            int Auth_ID = Convert.ToInt32(HttpContext.Session.GetString("Subject"));
            //  int ADID = Convert.ToInt32(HttpContext.Session.GetString("ADID"));
            int? ADID = uid;

            var value = await _context.Admin
                .Where(x => (x.ADID == ADID && x.AuthID == Auth_ID))
                .Select(y => new { y.ADID, y.Name, y.Email, y.Phone, y.Address, y.Profile_Image_Path })
                .FirstOrDefaultAsync();

            if (value == null)
            {
                return Unauthorized();
            }
            else
            {
                return Json(new { success = true, data = value });
            }

        }

        [HeaderAuthorization]
        [Route("Admin/ProfileUpdate")]
        [HttpPost]

        public async Task<ActionResult> ProfileUpdate(AdminUpdateViewModel admin)
        {
            if (!ModelState.IsValid)
            {
                return Json(new { success = false, error = "Input Formate Wrong" });
            }

            int Auth_ID = Convert.ToInt32(HttpContext.Session.GetString("Subject"));
            int ADID = Convert.ToInt32(HttpContext.Session.GetString("ADID"));

            var value = await _context.Admin
                .Where(x => (x.ADID == ADID && x.AuthID == Auth_ID))
                .FirstOrDefaultAsync();

            if (value == null)
            {
                return Unauthorized();
            }

            var verify_Email = await _context.Admin
               .Where(x => (x.Email == admin.Email && x.ADID != ADID))
               .FirstOrDefaultAsync();

            if (verify_Email != null)
            {
                return Json(new { success = false, error = "This Email is Already in USE" });
            }

            value.Name = admin.Name;
            value.Email = admin.Email;
            value.Phone = admin.Phone;
            value.Address = admin.Address;
            value.Password = admin.Password;

            await _context.SaveChangesAsync();

            return Json(new { success = true, data = value });
        }


        [HeaderAuthorization]
        [Route("Admin/ProfileImageUpdate")]
        [HttpPost]

        public async Task<ActionResult> ProfileImageUpdate(AdminProfileImageUpdate admin)
        {
            int Auth_ID = Convert.ToInt32(HttpContext.Session.GetString("Subject"));
            int ADID = Convert.ToInt32(HttpContext.Session.GetString("ADID"));

            var value = await _context.Admin
                .Where(x => (x.ADID == ADID && x.AuthID == Auth_ID))
                .FirstOrDefaultAsync();

            if (value == null)
            {
                return Unauthorized();
            }

            String UploadFolder = Path.Combine(_hostingEnvironment.WebRootPath, "AdminProfilePicture");
            String UniqueFileName = Guid.NewGuid().ToString() + "_" + admin.Photo.FileName;
            String FilePath = Path.Combine(UploadFolder, UniqueFileName);
            admin.Photo.CopyTo(new FileStream(FilePath, FileMode.Create));

            value.Profile_Image_Path = UniqueFileName;

            await _context.SaveChangesAsync();

            return Json(new { success = true, data = "Image Updated" });


        }

        [HeaderAuthorization]
        [Route("Admin/CreateCourse/{uid}")]
        [HttpPost]

        public async Task<ActionResult> CreateCourse(int? uid, [FromBody]CreateCourseViewModel create)
        {
            if (uid == null)
            {
                return Unauthorized();
            }
           
            int Auth_ID = Convert.ToInt32(HttpContext.Session.GetString("Subject"));
            // int ADID = Convert.ToInt32(HttpContext.Session.GetString("ADID"));

            int? ADID = uid;

            var value = await _context.Admin
                .Where(x => (x.ADID == ADID && x.AuthID == Auth_ID))
                .FirstOrDefaultAsync();

            if (value == null)
            {
                return Unauthorized();
            }


            if (!ModelState.IsValid)
            {
                return Json(new { success = false, data = "Input Mismatch" });
            }

            byte[] imageBytes = Convert.FromBase64String(create.Photo);
            var stream = new MemoryStream(imageBytes);
            IFormFile Photo = new FormFile(stream, 0, create.Photo.Length, "name", "NewCourse.jpg");

            String UploadFolder = Path.Combine(_hostingEnvironment.WebRootPath, "Course");
            String UniqueFileName = Guid.NewGuid().ToString() + "_" + Photo.FileName;
            String FilePath = Path.Combine(UploadFolder, UniqueFileName);
            Photo.CopyTo(new FileStream(FilePath, FileMode.Create));

            var data = new Models.Course
            {
                Title = create.Title,
                Description = create.Description,
                Image_Path = UniqueFileName,
                AuthID = Auth_ID

            };

            _context.Course.Add(data);
            await _context.SaveChangesAsync();

            var joiningInsert = new Admin_Course
            {
                ADID = Convert.ToInt32(ADID),
                CID = data.CID,
                AuthID = Auth_ID
            };

            _context.Admin_Courses.Add(joiningInsert);
            await _context.SaveChangesAsync();

            return Json(new { success = true, data = "New Course Added" });

        }



        [HeaderAuthorization]
        [Route("Admin/TutorialLikeRatio/{adid}")]
        [HttpGet]

        public async Task<ActionResult> TutorialLikeRatio(int adid)
        {
            int Auth_ID = Convert.ToInt32(HttpContext.Session.GetString("Subject"));
            int ADID = adid;

            var value = await _context.Admin
                .Where(x => (x.ADID == ADID && x.AuthID == Auth_ID))
                .FirstOrDefaultAsync();

            if (value == null)
            {
                return Unauthorized();
            }

            var TID = await _context.Tutorial
                .Where(x => x.AuthID == Auth_ID || x.AuthID == Auth_ID*(-1))
                .Select(y => y)
                .ToListAsync();


            List<Tutorial_Details> tutorial_Details = new List<Tutorial_Details>();

            for (int i = 0; i < TID.Count; i++)
            {
                int ratio = 0;

                var TeID = await _context.Teacher_Course_Tutorial
                    .Where(x => (x.TID == TID[i].TID && (x.AuthID == Auth_ID || x.AuthID == Auth_ID*-1)))
                    .Select(y => y.TeID)
                    .FirstOrDefaultAsync();

             
                String TeacherName = await _context.Teacher.Where(x => x.TeID == TeID)
                    .Select(y=> y.Name).FirstOrDefaultAsync();
                   

                var LikeRationOfTeacher = await _context.Teacher_Tutorial_Like
                     .Where(x => (x.TID == TID[i].TID && x.AuthID == Auth_ID))
                     .Select(y => new { y.LID }).ToListAsync();

                for (int j = 0; j < LikeRationOfTeacher.Count; j++)
                {
                    var reacts = await _context.Like
                        .Where(x => (x.LID == LikeRationOfTeacher[j].LID && x.AuthID == Auth_ID))
                        .FirstOrDefaultAsync();

                    ratio += reacts.Likes;
                }


                var LikeRationOfStudent = await _context.Student_Tutorial_Like
                   .Where(x => (x.TID == TID[i].TID && x.AuthID == Auth_ID))
                   .Select(y => new { y.LID }).ToListAsync();

                for (int j = 0; j < LikeRationOfStudent.Count; j++)
                {
                    var reacts = await _context.Like
                        .Where(x => (x.LID == LikeRationOfStudent[j].LID && x.AuthID == Auth_ID))
                        .FirstOrDefaultAsync();

                    ratio += reacts.Likes;
                }

                var tutorial_history = new Tutorial_Details
                {
                    TID = TID[i].TID,
                    TeID = TeID,
                    teacher_Name = TeacherName,
                    tutorial_Title = TID[i].Title,
                    tutorial_Description = TID[i].Description,
                    Video_Path = TID[i].Video_Path,
                    Like_Ratio = ratio,
                    HideOrUnHide = TID[i].AuthID,

                };

                tutorial_Details.Add(tutorial_history);


            }

            return Json(new { success = true, data = tutorial_Details });

        }


        [HeaderAuthorization]
        [Route("Admin/HideVideo/{TID}/{adid}")]
        [HttpPut]

        public async Task<ActionResult> HideVideo(int TID,int adid)
        {


            int Auth_ID = Convert.ToInt32(HttpContext.Session.GetString("Subject"));
            int ADID = adid;

            var value = await _context.Admin
                .Where(x => (x.ADID == ADID && x.AuthID == Auth_ID))
                .FirstOrDefaultAsync();

            if (value == null)
            {
                return BadRequest();
            }

            var tutorial = await _context.Tutorial
                .Where(x => (x.TID == TID && x.AuthID == Auth_ID))
                .FirstOrDefaultAsync();

            int x = tutorial.AuthID;
            tutorial.AuthID = x * (-1);

            await _context.SaveChangesAsync();

            var teacher_course_tutorial = await _context.Teacher_Course_Tutorial
                .Where(x => (x.TID == TID && x.AuthID == Auth_ID))
                .FirstOrDefaultAsync();

            teacher_course_tutorial.AuthID = (x * (-1));

            await _context.SaveChangesAsync();

            return Json(new { success = true, data = "Video Hidden Successfully" });

        }

        /// <summary>
        ///  (The Tutorial Video will be unhided on the basis of Tutorial ID)
        /// </summary>
        /// <param name="TID"></param>
        /// <returns></returns>
         
        [HeaderAuthorization]
        [Route("Admin/UnHideVideo/{TID}/{adid}")]
        [HttpPut]

        public async Task<ActionResult> UnHideVideo(int TID , int adid)
        {


            int Auth_ID = Convert.ToInt32(HttpContext.Session.GetString("Subject"));
            int ADID = adid;

            int authID = Auth_ID * (-1);

            var value = await _context.Admin
                .Where(x => (x.ADID == ADID && x.AuthID == Auth_ID))
                .FirstOrDefaultAsync();

            if (value == null)
            {
                return Unauthorized();
            }

            var tutorial = await _context.Tutorial
                .Where(x => (x.TID == TID && x.AuthID == authID))
                .FirstOrDefaultAsync();

            tutorial.AuthID = authID * (-1);
            await _context.SaveChangesAsync();

            var teacher_course_tutorial = await _context.Teacher_Course_Tutorial
                .Where(x => x.TID == TID && x.AuthID == authID)
                .FirstOrDefaultAsync();


            teacher_course_tutorial.AuthID = authID * (-1);

            await _context.SaveChangesAsync();

            return Json(new { success = true, data = "Video UnHided Successfully" });


        }


        [HeaderAuthorization]
        [Route("Admin/LogOut")]
        [HttpGet]
        public async Task<ActionResult> LogOut()
        {
            int Auth_ID = Convert.ToInt32(HttpContext.Session.GetString("Subject"));
            int ADID = Convert.ToInt32(HttpContext.Session.GetString("ADID"));

            var value = await _context.Admin
                .Where(x => (x.ADID == ADID && x.AuthID == Auth_ID))
                .FirstOrDefaultAsync();

            if (value == null)
            {
                return Unauthorized();
            }


            //// Check The Better Proccess
            HttpContext.Session.Remove("ADID");

            await HttpContext.SignOutAsync("Student");
            await HttpContext.SignOutAsync("Provider");
            await HttpContext.SignOutAsync("Admin");
            await HttpContext.SignOutAsync("Teacher");

            return Json(new { success = true, ReturnURL = "/Home/Courses" });


        }

    }

    struct Tutorial_Details
    {
        public int TID { set; get; }

        public int TeID { set; get; }
        public String tutorial_Title { set; get; }

        public String tutorial_Description { set; get; }

        public String Video_Path { set; get; }

        public String teacher_Name { set; get; }

        ///(Like + DisLike)

        public int Like_Ratio { set; get; }

        public int HideOrUnHide { set; get; }
    }
}
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ViewModel
{
  public class TeacherUploadTutorial
    {
       
        [Required]
        public String TeId { set; get; }

        [Required]
        [MaxLength(500)]
        public String Title { set; get; }
        [Required]
        public String Description { set; get; }
        [Required]
        public String Video { set; get; }

        [Required]

        public String VideoType { set; get; }

       

    }
}

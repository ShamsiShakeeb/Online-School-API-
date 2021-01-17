using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ViewModel
{
    public class UserReaction
    {
        [Required]
        public int TID { set; get; }
        [Required]
        public int reaction { set; get; }
        [Required]
        public int uid { set; get; }
    }
}

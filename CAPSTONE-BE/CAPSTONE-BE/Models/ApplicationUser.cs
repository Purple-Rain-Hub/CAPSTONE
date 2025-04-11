using System.ComponentModel.DataAnnotations;
using CAPSTONE_BE.Models.SurveyModels;
using Microsoft.AspNetCore.Identity;

namespace CAPSTONE_BE.Models
{
    public class ApplicationUser : IdentityUser
    {
        [Required]
        [MaxLength(255)]
        public required string FirstName { get; set; }
        [Required]
        [MaxLength(255)]
        public required string LastName { get; set; }
        [Required]
        public required DateOnly BirthDate { get; set; }
        public ICollection<ApplicationUserRole>? ApplicationUserRoles { get; set; }
        public ICollection<SurveySession>? SurveySessions { get; set; }
    }
}

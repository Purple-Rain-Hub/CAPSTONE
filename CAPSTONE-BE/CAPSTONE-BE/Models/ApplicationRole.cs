using Microsoft.AspNetCore.Identity;

namespace CAPSTONE_BE.Models
{
    public class ApplicationRole : IdentityRole
    {
        public ICollection<ApplicationUserRole> ApplicationUserRoles { get; set; }
    }
}

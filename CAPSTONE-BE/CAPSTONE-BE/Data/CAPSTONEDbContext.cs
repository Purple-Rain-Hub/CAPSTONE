using CAPSTONE_BE.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CAPSTONE_BE.Data
{
    public class CAPSTONEDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, string, IdentityUserClaim<string>, ApplicationUserRole, IdentityUserLogin<string>, IdentityRoleClaim<string>, IdentityUserToken<string>>
    {
        public CAPSTONEDbContext(DbContextOptions<CAPSTONEDbContext> options) : base(options) { }

        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<ApplicationRole> ApplicationRoles { get; set; }
        public DbSet<ApplicationUserRole> ApplicationUserRoles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ApplicationUserRole>().HasOne(ur => ur.User).WithMany(u => u.ApplicationUserRoles).HasForeignKey(ur => ur.UserId);

            modelBuilder.Entity<ApplicationUserRole>().HasOne(ur => ur.Role).WithMany(r => r.ApplicationUserRoles).HasForeignKey(ur => ur.RoleId);

            modelBuilder.Entity<ApplicationUserRole>().Property(p => p.Date).HasDefaultValueSql("GETDATE()").IsRequired(true);
        }
    }
}

using CAPSTONE_BE.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CAPSTONE_BE.Models.SurveyModels;

namespace CAPSTONE_BE.Data
{
    public class CAPSTONEDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, string, IdentityUserClaim<string>, ApplicationUserRole, IdentityUserLogin<string>, IdentityRoleClaim<string>, IdentityUserToken<string>>
    {
        public CAPSTONEDbContext(DbContextOptions<CAPSTONEDbContext> options) : base(options) { }

        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<ApplicationRole> ApplicationRoles { get; set; }
        public DbSet<ApplicationUserRole> ApplicationUserRoles { get; set; }

        //Survey Tables
        public DbSet<SurveySession> SurveySessions { get; set; }
        public DbSet<SurveyAnswer> SurveyAnswers { get; set; }
        public DbSet<GameScore> GameScores { get; set; }
        public DbSet<SurveyQuestion> SurveyQuestions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ApplicationUserRole>().HasOne(ur => ur.User).WithMany(u => u.ApplicationUserRoles).HasForeignKey(ur => ur.UserId);

            modelBuilder.Entity<ApplicationUserRole>().HasOne(ur => ur.Role).WithMany(r => r.ApplicationUserRoles).HasForeignKey(ur => ur.RoleId);

            modelBuilder.Entity<ApplicationUserRole>().Property(p => p.Date).HasDefaultValueSql("GETDATE()").IsRequired(true);
        
            //Survey
            modelBuilder.Entity<SurveySession>().HasOne(ss=> ss.User).WithMany(u=> u.SurveySessions).HasForeignKey(ss => ss.UserId);

            modelBuilder.Entity<SurveyAnswer>().HasOne(sa => sa.SurveySession).WithMany(ss => ss.SurveyAnswers).HasForeignKey(sa => sa.SessionId);

            modelBuilder.Entity<GameScore>().HasOne(gs => gs.SurveySession).WithMany(ss => ss.GameScores).HasForeignKey(gs => gs.SessionId);

            modelBuilder.Entity<SurveySession>().Property(ss => ss.SurveyDate).HasDefaultValueSql("GETDATE()").IsRequired(true);
        }
    }
}

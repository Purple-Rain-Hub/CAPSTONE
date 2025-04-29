using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CAPSTONE_BE.Models.SurveyModels
{
    public class SurveySession
    {
        [Key]
        public required Guid Id { get; set; }
        [Required]
        public required string UserEmail { get; set; }
        [ForeignKey("UserEmail")]
        public ApplicationUser User { get; set; }
        [Required]
        public required DateTime SurveyDate { get; set; }
        public ICollection<SurveyAnswer> SurveyAnswers { get; set; }
        public ICollection<GameScore> GameScores { get; set; }
    }
}

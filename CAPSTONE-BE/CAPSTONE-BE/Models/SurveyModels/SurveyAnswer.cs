using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace CAPSTONE_BE.Models.SurveyModels
{
    [PrimaryKey("SessionId", "Question")]
    public class SurveyAnswer
    {
        public required Guid SessionId { get; set; }
        [MaxLength(800)]
        public required string Question { get; set; }
        [MaxLength(500)]
        [Required]
        public required string Answer { get; set; }
        [ForeignKey("SessionId")]
        public SurveySession SurveySession { get; set; }
    }
}

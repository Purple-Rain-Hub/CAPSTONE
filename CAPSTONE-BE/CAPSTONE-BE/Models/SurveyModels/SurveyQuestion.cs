using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace CAPSTONE_BE.Models.SurveyModels
{
    [PrimaryKey("Question", "Answer")]
    public class SurveyQuestion
    {
        [MaxLength(800)]
        public required string Question {  get; set; }
        [MaxLength(500)]
        public required string Answer { get; set; }
        [Required]
        public required long AnswerId { get; set; }
        [Required]
        [Range(0, 100)]
        public required int Points { get; set; }
    }
}

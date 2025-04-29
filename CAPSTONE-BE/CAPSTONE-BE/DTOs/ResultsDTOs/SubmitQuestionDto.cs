using System.ComponentModel.DataAnnotations;

namespace CAPSTONE_BE.DTOs.ResultsDTOs
{
    public class SubmitQuestionDto
    {
        [Required]
        public required string Question { get; set; }
        [Required]
        public required string Answer { get; set; }
        [Required]
        public required long AnswerId { get; set; }
        [Required]
        public required int Points { get; set; }
    }
}

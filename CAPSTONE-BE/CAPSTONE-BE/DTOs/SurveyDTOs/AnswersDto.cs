using System.ComponentModel.DataAnnotations;

namespace CAPSTONE_BE.DTOs.SurveyDTOs
{
    public class AnswerDto
    {
        [Required]
        [MaxLength(500)]
        public required string Answer {  get; set; }
        public long? AnswerId { get; set; }
    }
}

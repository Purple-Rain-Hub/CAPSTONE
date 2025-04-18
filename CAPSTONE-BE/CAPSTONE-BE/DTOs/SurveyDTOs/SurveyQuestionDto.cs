using System.ComponentModel.DataAnnotations;

namespace CAPSTONE_BE.DTOs.SurveyDTOs
{
    public class SurveyQuestionDto
    {
        [Required]
        public required string Question {  get; set; }
        [Required]
        public required List<string> Answers {  get; set; }
        [Required]
        [Range(0, 100)]
        public required int Points { get; set; }
    }
}

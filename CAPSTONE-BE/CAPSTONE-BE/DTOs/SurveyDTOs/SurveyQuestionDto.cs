using System.ComponentModel.DataAnnotations;

namespace CAPSTONE_BE.DTOs.SurveyDTOs
{
    public class SurveyQuestionDto
    {
        [Required]
        public required string Question {  get; set; }
        [Required]
        public required List<string> Answers {  get; set; }
    }
}

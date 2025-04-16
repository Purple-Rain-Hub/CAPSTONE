using System.ComponentModel.DataAnnotations;

namespace CAPSTONE_BE.DTOs.SurveyDTOs
{
    public class CreateSurveyDto
    {
        [Required]
        public required List<SurveyQuestionDto> SurveyQuestions { get; set; }
    }
}

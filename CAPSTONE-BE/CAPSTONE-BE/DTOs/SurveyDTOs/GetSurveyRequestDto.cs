using System.ComponentModel.DataAnnotations;

namespace CAPSTONE_BE.DTOs.SurveyDTOs
{
    public class GetSurveyRequestDto
    {
        public string? Question { get; set; }
        public  List<AnswerDto>? Answers { get; set; }
        public int? Points { get; set; }
    }
}

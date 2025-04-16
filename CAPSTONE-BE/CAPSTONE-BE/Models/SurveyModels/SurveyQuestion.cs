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
    }
}

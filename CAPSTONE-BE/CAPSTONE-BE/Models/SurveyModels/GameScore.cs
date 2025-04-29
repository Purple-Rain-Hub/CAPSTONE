using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace CAPSTONE_BE.Models.SurveyModels
{
    [PrimaryKey("SessionId", "GameId")]
    public class GameScore
    {
        public required Guid SessionId { get; set; }
        public required long GameId { get; set; }
        [Required]
        public required int Points { get; set; }
        [ForeignKey("SessionId")]
        public SurveySession SurveySession { get; set; }
    }
}

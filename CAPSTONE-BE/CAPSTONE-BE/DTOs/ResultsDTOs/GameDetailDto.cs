using System.ComponentModel.DataAnnotations;

namespace CAPSTONE_BE.DTOs.ResultsDTOs
{
    public class GameDetailDto
    {
        [Required]
        public required long Id { get; set; }
        [Required]
        public required string Name { get; set; }
        public string? Summary { get; set; }
        [Required]
        public required DateTimeOffset ReleaseDate { get; set; }
        public string? Cover {  get; set; }
        [Required]
        public required string Url { get; set; }
    }
}

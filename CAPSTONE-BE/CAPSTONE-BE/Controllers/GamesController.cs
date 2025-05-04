using CAPSTONE_BE.Data;
using CAPSTONE_BE.DTOs.ResultsDTOs;
using CAPSTONE_BE.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CAPSTONE_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GamesController : ControllerBase
    {
        private readonly IGDBService _IGDBService;

        public GamesController(IGDBService igdbService)
        {
            _IGDBService = igdbService;
        }

        [HttpGet("new-releases")]
        public async Task<ActionResult<IEnumerable<GameDetailDto>>> GetNewReleases()
        {
            var games = await _IGDBService.GetNewReleasesAsync();
            return Ok(games);
        }

        [HttpGet("most-played")]
        public async Task<ActionResult<IEnumerable<GameDetailDto>>> GetMostPlayed()
        {
            var games = await _IGDBService.GetMostPlayedAsync();
            return Ok(games);
        }
    }
}

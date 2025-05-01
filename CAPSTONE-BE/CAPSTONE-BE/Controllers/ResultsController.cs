using System.Security.Claims;
using CAPSTONE_BE.DTOs.ResultsDTOs;
using CAPSTONE_BE.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CAPSTONE_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResultsController : ControllerBase
    {
        private readonly ResultsService _resultsService;

        public ResultsController(ResultsService resultsService)
        {
            _resultsService = resultsService;
        }

        [HttpPost]
        [Authorize(Roles = "Admin, User")]
        public async Task<IActionResult> HandleSurvey([FromBody] List<SubmitQuestionDto> submitSurvey)
        {
            try
            {
                var sessionId = await _resultsService.SaveUserSurveyAsync(submitSurvey, User.FindFirstValue(ClaimTypes.Email));
                if (sessionId == null)
                {
                    return BadRequest("Impossibile salvare il questionario.");
                }

                var gamesDetails = await _resultsService.GetGamesDetailsAsync(sessionId.Value);

                return Ok(gamesDetails);
            }
            catch
            {
                return StatusCode(500, "Errore interno");
            }
        }
    }
}

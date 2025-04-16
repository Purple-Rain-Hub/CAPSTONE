using CAPSTONE_BE.DTOs.SurveyDTOs;
using CAPSTONE_BE.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CAPSTONE_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SurveyController : ControllerBase
    {
        private readonly SurveyService _surveyService;
        public SurveyController(SurveyService surveyService)
        {
            _surveyService = surveyService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateSurvey([FromBody] CreateSurveyDto createSurvey)
        {
            try
            {
                var success = await _surveyService.CreateSurveyAsync(createSurvey);
                if (success)
                {
                    return Ok(new { message = "Questionario creato con successo" });
                }
                else
                {
                    return BadRequest(new { message = "Qualcosa è andato storto" });

                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetSurvey()
        {
            try
            {
                var survey = await _surveyService.GetSurveyAsync();

                if(survey == null)
                {
                    return null;
                }

                return Ok(survey);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}

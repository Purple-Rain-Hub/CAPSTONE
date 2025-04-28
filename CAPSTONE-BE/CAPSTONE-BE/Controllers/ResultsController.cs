using CAPSTONE_BE.Services;
using Microsoft.AspNetCore.Http;
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

        //[HttpPost]
        //public async Task<IActionResult> PostResults([FromBody] SubmitSurveyDto submitSurvey)
        //{
        //    var success = await _resultsService.SaveUserSurveyAsync(submitSurvey.Answers, User.GetUserId());
        //}
    }
}

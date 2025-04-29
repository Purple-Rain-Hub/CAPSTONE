using CAPSTONE_BE.DTOs.Account;
using CAPSTONE_BE.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CAPSTONE_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly AccountService _accountService;

        public AccountController(AccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDto registerRequest)
        {
            var success = await _accountService.RegisterAsync(registerRequest);
            if (success)
            {
                return Ok(new { message = "Account successfully registered!" });
            }
            else
            {
                return BadRequest(new { message = "Email is already registered or something went wrong." });
            }
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto loginRequest)
        {
            var (success, result) = await _accountService.LoginAsync(loginRequest);

            if (success)
            {
                return Ok(new { token = result });
            }
            else
            {
                return Unauthorized(new { message = result });
            }
        }

    }
}

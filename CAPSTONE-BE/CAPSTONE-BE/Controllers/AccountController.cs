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

        //[Authorize(Roles = "Admin")]
        //[HttpGet]
        //public async Task<IActionResult> GetRoles()
        //{
        //    try
        //    {
        //        var roles = await _accountService.GetRolesAsync();

        //        if (roles == null)
        //        {
        //            return BadRequest(new
        //            {
        //                message = "Something went wrong"
        //            });
        //        }

        //        var count = roles.Count();

        //        var text = count == 1 ? $"{count} role found" : $"{count} roles found";

        //        return Ok(new
        //        GetRoleResponseDto()
        //        {
        //            Message = text,
        //            Roles = roles
        //        });
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, ex.Message);
        //    }
        //}

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

        //[Authorize(Roles = "Admin")]
        //[HttpGet("Users")]
        //public async Task<IActionResult> GetUsers()
        //{
        //    try
        //    {
        //        var users = await _accountService.GetUsersAsync();

        //        if (users == null)
        //        {
        //            return BadRequest(new
        //            {
        //                message = "Something went wrong"
        //            });
        //        }

        //        var count = users.Count();

        //        var text = count == 1 ? $"{count} user found" : $"{count} users found";

        //        return Ok(new
        //        GetUserResponseDto()
        //        {
        //            Message = text,
        //            Users = users
        //        });
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, ex.Message);
        //    }
        //}
    }
}

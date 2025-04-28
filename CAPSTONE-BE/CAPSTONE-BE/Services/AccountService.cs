using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CAPSTONE_BE.DTOs.Account;
using CAPSTONE_BE.Models;
using CAPSTONE_BE.Settings;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace CAPSTONE_BE.Services
{
    public class AccountService
    {
        private readonly Jwt _jwtSettings;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly RoleManager<ApplicationRole> _roleManager;

        public AccountService(IOptions<Jwt> jwtOptions,
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            RoleManager<ApplicationRole> roleManager)
        {
            _jwtSettings = jwtOptions.Value;
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
        }

        //public async Task<List<RolesDto>> GetRolesAsync()
        //{
        //    try
        //    {
        //        var roles = await _roleManager.Roles.ToListAsync();

        //        var rolesRequest = new List<RolesDto>();

        //        foreach (var role in roles)
        //        {
        //            var request = new RolesDto()
        //            {
        //                RoleName = role.Name,
        //            };

        //            rolesRequest.Add(request);
        //        }

        //        return rolesRequest;
        //    }
        //    catch
        //    {
        //        return null;
        //    }
        //}

        public async Task<bool> RegisterAsync(RegisterRequestDto registerRequest)
        {
            try
            {
                var newUser = new ApplicationUser()
                {
                    Email = registerRequest.Email,
                    UserName = registerRequest.Email,
                    FirstName = registerRequest.FirstName,
                    LastName = registerRequest.LastName,
                    BirthDate = registerRequest.BirthDate
                };

                var result = await _userManager.CreateAsync(newUser, registerRequest.Password);

                if (!result.Succeeded)
                {
                    return false;
                }

                await _userManager.AddToRoleAsync(newUser, "User");

                return true;
            }
            catch
            {
                return false;
            }
        }

            public async Task<(bool, string)> LoginAsync(LoginRequestDto loginRequest)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(loginRequest.Email);

                if (user == null)
                {
                    return (false, "Invalid email or password");
                }

                var result = await _signInManager.PasswordSignInAsync(user, loginRequest.Password, false, false);

                if (!result.Succeeded)
                {
                    return (false, "Invalid email or password");
                }

                var Roles = await _signInManager.UserManager.GetRolesAsync(user);

                List<Claim> claims = new List<Claim>();

                claims.Add(new Claim(ClaimTypes.Email, user.Email));
                claims.Add(new Claim(ClaimTypes.Name, $"{user.FirstName} {user.LastName}"));
                foreach (var role in Roles)
                {
                    claims.Add(new Claim(ClaimTypes.Role, role));
                }

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecurityKey));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var expiry = DateTime.Now.AddMinutes(_jwtSettings.ExpiresInMinutes);
                var token = new JwtSecurityToken(_jwtSettings.Issuer, _jwtSettings.Audience, claims, expires: expiry, signingCredentials: creds);
                string tokenString = new JwtSecurityTokenHandler().WriteToken(token);

                return (true, tokenString);
            }
            catch
            {
                return (false, "An error occurred while processing the request");
            }
        }

        //public async Task<List<UsersDto>> GetUsersAsync()
        //{
        //    try
        //    {
        //        var users = await _userManager.Users.Include(u => u.ApplicationUserRoles).ThenInclude(a => a.Role).ToListAsync();

        //        var usersRequest = new List<UsersDto>();

        //        foreach (var user in users)
        //        {
        //            var request = new UsersDto()
        //            {
        //                Id = user.Id,
        //                FirstName = user.FirstName,
        //                LastName = user.LastName,
        //                Email = user.Email!,
        //                Role = user.ApplicationUserRoles.FirstOrDefault().Role.Name
        //            };

        //            usersRequest.Add(request);
        //        }

        //        return usersRequest;
        //    }
        //    catch
        //    {
        //        return null;
        //    }

        //}
    }
}

using CAPSTONE_BE.Data;
using CAPSTONE_BE.DTOs.SurveyDTOs;
using CAPSTONE_BE.Models.SurveyModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CAPSTONE_BE.Services
{
    public class SurveyService
    {
        private readonly CAPSTONEDbContext _context;
        public SurveyService(CAPSTONEDbContext context)
        {
            _context = context;
        }

        public async Task<bool> SaveAsync()
        {
            try
            {
                return await _context.SaveChangesAsync() > 0;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> CreateSurveyAsync(CreateSurveyDto createSurvey)
        {
            try
            {
                await _context.SurveyQuestions.ExecuteDeleteAsync();

                foreach (var question in createSurvey.SurveyQuestions)
                {
                    foreach (var answer in question.Answers)
                    {
                        var survey = new SurveyQuestion()
                        {
                            Question = question.Question,
                            Answer = answer,
                            Points = question.Points,
                        };

                        _context.SurveyQuestions.Add(survey);
                    }
                }
                return await SaveAsync();
            }
            catch
            {
                return false;
            }
        }

        public async Task<List<GetSurveyRequestDto>> GetSurveyAsync()
        {
            try
            {
                var surveyResults = _context.SurveyQuestions
                    .GroupBy(s => s.Question)
                    .Select(g => new GetSurveyRequestDto
                     {
                         Question = g.Key,
                         Answers = g.Select(x => x.Answer).ToList(),
                         Points = g.FirstOrDefault().Points
                     })
                    .ToList();

                return surveyResults;
            }
            catch
            {
                return null;
            }
        }
    }
}

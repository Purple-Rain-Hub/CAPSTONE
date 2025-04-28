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
        private readonly IGDBService _IGDBService;

        public SurveyService(CAPSTONEDbContext context, IGDBService IGDBService)
        {
            _context = context;
            _IGDBService = IGDBService;
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
                        //servizio per ottenere AnswerId
                        long? Id = await _IGDBService.GetAnswerIdAsync(answer);
                        if(Id == null)
                        {
                            return false;
                        }

                        var survey = new SurveyQuestion()
                        {
                            Question = question.Question,
                            Answer = answer.Answer,
                            AnswerId = Id.Value,
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
                var surveyResults = await _context.SurveyQuestions
                    .GroupBy(s => s.Question)
                    .Select(g => new GetSurveyRequestDto
                    {
                        Question = g.Key,
                        Answers = g
                            .Select(x => new AnswerDto
                                {
                                 Answer = x.Answer,
                                 AnswerId = x.AnswerId,
                                })
                            .ToList(),
                        Points = g.First().Points
                    })
                    .ToListAsync();

                return surveyResults;
            }
            catch
            {
                return null;
            }
        }
    }
}

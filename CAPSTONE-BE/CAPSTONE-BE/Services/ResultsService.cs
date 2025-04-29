using CAPSTONE_BE.Data;
using CAPSTONE_BE.DTOs.ResultsDTOs;
using CAPSTONE_BE.Models.SurveyModels;
using Microsoft.EntityFrameworkCore;

namespace CAPSTONE_BE.Services
{
    public class ResultsService
    {
        private readonly CAPSTONEDbContext _context;
        private readonly IGDBService _IGDBService;

        public ResultsService(CAPSTONEDbContext context, IGDBService igdbService)
        {
            _context = context;
            _IGDBService = igdbService;
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

        public async Task<Guid?> SaveUserSurveyAsync(List<SubmitQuestionDto> submitSurvey, string userEmail)
        {
            try
            {
                //creo nuova sessione
                var session = new SurveySession
                {
                    UserEmail = userEmail,
                    SurveyDate = DateTime.Now,
                    Id = new Guid()
                };

                _context.SurveySessions.Add(session);


                foreach (var question in submitSurvey)
                {
                    //creo record SurveyAnswer

                    var surveylog = new SurveyAnswer
                    {
                        SessionId = session.Id,
                        Question = question.Question,
                        Answer = question.Answer,
                    };

                    _context.SurveyAnswers.Add(surveylog);


                    //per ogni AnswerId ricavo 5 GamesId

                    var gamesId = await _IGDBService.GetGamesIdAsync(question.AnswerId);
                    if (gamesId == null)
                    {
                        return null;
                    }

                    //ciclo i GamesId e salvo in GameScores

                    foreach (var gameId in gamesId)
                    {
                        var existingGameId = await _context.GameScores.FindAsync(session.Id, gameId);
                        if (existingGameId != null)
                        {
                            existingGameId.Points += question.Points;
                        }
                        else
                        {
                            var newGameId = new GameScore
                            {
                                SessionId = session.Id,
                                GameId = gameId!.Value,
                                Points = question.Points,
                            };
                            _context.GameScores.Add(newGameId);
                        }
                    }

                }

                var save = await SaveAsync();
                if (save)
                {
                    return session.Id;
                }

                return null;
            }
            catch
            {
                return null;
            }

        }

        public async Task<List<GameDetailDto>> GetGamesDetailsAsync(Guid? sessionId)
        {
            try
            {
                //prendere top GameId da GameScores
                var topGamesId = await _context.GameScores.Where(gs => gs.SessionId == sessionId).OrderByDescending(gs => gs.Points).Take(5).Select(gs => gs.GameId).ToListAsync();
                if(topGamesId == null)
                {
                    return null;
                }

                //prendo i dettagli dei GameId
                var gamesDetails = await _IGDBService.GetGamesDetailsIGDB();

                return gamesDetails;
            }
            catch
            {
                return null;
            }
        }
    }
}

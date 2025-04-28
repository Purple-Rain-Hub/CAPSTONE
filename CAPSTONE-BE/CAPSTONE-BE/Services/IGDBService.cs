using CAPSTONE_BE.DTOs.SurveyDTOs;
using IGDB;
using IGDB.Models;

namespace CAPSTONE_BE.Services
{
    public class IGDBService
    {
        private readonly IGDBClient _igdb;

        public IGDBService(IGDBClient igdb)
        {
            _igdb = igdb;
        }

        public async Task<long?> GetAnswerIdAsync(AnswerDto answer)
        {
            var query = $@"fields id; where slug ~ *""{answer.Answer}""*; limit 1;";

            try
            {
                var results = await _igdb.QueryAsync<Genre>(IGDBClient.Endpoints.Genres, query);

                var answerId = results.FirstOrDefault();
                if(answerId.Id == 0)
                {
                    return null;
                }

                return answerId.Id;
            }
            catch
            {
                return null;
            }
        }
    }
}

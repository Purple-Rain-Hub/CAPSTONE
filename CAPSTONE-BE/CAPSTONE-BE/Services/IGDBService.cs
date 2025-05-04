using System.Collections.Generic;
using CAPSTONE_BE.DTOs.ResultsDTOs;
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

        public async Task<List<long?>> GetGamesIdAsync(long answerId)
        {
            var query = $@"fields id; where genres = ({answerId}); sort total_rating desc; limit 5;";

            try
            {
                var gamesId = await _igdb.QueryAsync<Game>(IGDBClient.Endpoints.Games, query);

                return gamesId.Where(g => g.Id != 0).Select(g => g.Id).ToList();
            }
            catch
            {
                return null;
            }
        }

        public async Task<List<GameDetailDto>> GetGamesDetailsIGDB(List<long> topGamesId)
        {
            var query = $@"fields id,name,cover.url,summary,first_release_date; where id = ({string.Join(",", topGamesId)});";

            try
            {
                var games = await _igdb.QueryAsync<Game>(IGDBClient.Endpoints.Games, query);
                if (games == null)
                {
                    return null;
                }

                return games.Select(g => new GameDetailDto
                {
                    Id = g.Id!.Value,
                    Name = g.Name,
                    Cover = g.Cover?.Value.Url,
                    Summary = g.Summary,
                    ReleaseDate = g.FirstReleaseDate!.Value
                }).ToList();
            }
            catch
            {
                return null;
            }
        }

        public async Task<List<GameDetailDto>> GetNewReleasesAsync()
        {
            var thirtyDaysAgo = DateTimeOffset.UtcNow.AddDays(-30).ToUnixTimeSeconds();
            var query = $@"fields id,name,cover.url,summary,first_release_date; where first_release_date >= {thirtyDaysAgo}; sort first_release_date desc; limit 16;
    ";

            var games = await _igdb.QueryAsync<Game>(IGDBClient.Endpoints.Games, query);
            if (games == null)
            {
                return null;
            }
            return games.Select(g => new GameDetailDto
            {
                Id = g.Id.Value,
                Name = g.Name,
                Cover = g.Cover?.Value?.Url,
                Summary = g.Summary,
                ReleaseDate = g.FirstReleaseDate ?? DateTimeOffset.MinValue
            }).ToList();
        }

        public async Task<List<GameDetailDto>> GetMostPlayedAsync()
        {
            var query = $@"fields id,name,cover.url,summary,first_release_date; sort popularity desc; limit 16;";

            var games = await _igdb.QueryAsync<Game>(IGDBClient.Endpoints.Games, query);
            if (games == null)
            {
                return null;
            }
            return games.Select(g => new GameDetailDto
            {
                Id = g.Id.Value,
                Name = g.Name,
                Cover = g.Cover?.Value?.Url,
                Summary = g.Summary,
                ReleaseDate = g.FirstReleaseDate ?? DateTimeOffset.MinValue
            }).ToList();
        }
    }
}

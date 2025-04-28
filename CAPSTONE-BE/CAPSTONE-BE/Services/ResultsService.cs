using CAPSTONE_BE.Data;

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


    }
}

using Newtonsoft.Json;

namespace EldudkaAPI
{
    public class CSService
    {
        private readonly IConfiguration _configuration;

        public CSService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<IEnumerable<CSProduct>> GetAllProducts()
        {
            var httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Add("Cookie", _configuration["Cookie"]);

            var response = await httpClient.GetStringAsync(
                "https://web.cloudshop.ru/proxy/?path=%2Fdata%2F5be45da00bd70c2cb227bf2a%2Fcatalog&api=v3&timezone=10800"
            );

            return JsonConvert.DeserializeObject<CSProductsResponse>(response).Data;
        }
    }
}

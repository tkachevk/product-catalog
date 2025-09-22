using Newtonsoft.Json;

public class CSProductsResponse
{
    [JsonProperty("total")]
    public int? Total { get; set; }

    [JsonProperty("data")]
    public IEnumerable<CSProduct>? Data { get; set; }
}

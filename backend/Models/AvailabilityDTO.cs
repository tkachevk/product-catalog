using Newtonsoft.Json;

public class AvailabilityDTO
{
    [JsonProperty("shop")]
    public ShopDTO Shop { get; set; }

    [JsonProperty("count")]
    public int Count { get; set; }
}

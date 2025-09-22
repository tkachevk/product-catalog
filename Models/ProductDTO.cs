using Newtonsoft.Json;

public class ProductDTO
{
    [JsonProperty("uuid")]
    public Guid UUID { get; set; }

    [JsonProperty("name")]
    public string Name { get; set; } = String.Empty;

    [JsonProperty("images")]
    public IEnumerable<string> Images { get; set; } = new List<string>();

    [JsonProperty("description")]
    public string Description { get; set; } = String.Empty;

    [JsonProperty("price")]
    public int Price { get; set; }

    [JsonProperty("availability")]
    public IEnumerable<AvailabilityDTO> Availability { get; set; }
}

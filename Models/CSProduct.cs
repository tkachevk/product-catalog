using Newtonsoft.Json;

public class CSProduct
{
    [JsonProperty("uuid")]
    public Guid UUID { get; set; }

    [JsonProperty("name")]
    public string Name { get; set; } = String.Empty;

    [JsonProperty("pic")]
    public IEnumerable<string> Pic { get; set; } = new List<string>();

    [JsonProperty("description")]
    public string Description { get; set; } = String.Empty;

    [JsonProperty("price")]
    public int Price { get; set; }

    [JsonProperty("stock")]
    public CSStock Stock { get; set; } = new CSStock();
}

using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

[ApiController]
[Route("api/weather")]
public class WeatherController : ControllerBase
{
    private readonly HttpClient _httpClient;

    public WeatherController(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    [HttpGet("{city}")]
    public async Task<IActionResult> GetWeather(string city)
    {
        string? apiKey = "b0dc2002600e43989ee14134252901";
        if (string.IsNullOrEmpty(apiKey))
        {
            return BadRequest("API Key is missing.");
        }
        string url = $"https://api.weatherapi.com/v1/current.json?key={apiKey}&q={city}&aqi=no";

        var response = await _httpClient.GetAsync(url);

        if (!response.IsSuccessStatusCode)
        {
            return BadRequest("Failed to fetch weather data");
        }

        var weatherData = await response.Content.ReadAsStringAsync();
        return Ok(weatherData);
    }
}
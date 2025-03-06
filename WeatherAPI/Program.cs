var builder = WebApplication.CreateBuilder(args);
var corsPolicy = "_allowFrontend";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: corsPolicy,
        policy =>
        {
            policy.WithOrigins("*") // Permite chamadas do frontend Next.js
                  .AllowAnyMethod()  // Permite todos os métodos (GET, POST, etc.)
                  .AllowAnyHeader(); // Permite todos os headers
        });
});
builder.Services.AddControllers();
builder.Services.AddHttpClient<WeatherController>();

var app = builder.Build();

app.UseHttpsRedirection();
app.UseCors(corsPolicy);
app.UseAuthorization();
app.MapControllers();


app.Run();

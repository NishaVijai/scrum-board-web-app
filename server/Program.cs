using Scrum_Board_Backend.Data;
using Scrum_Board_Backend.Services;

var builder = WebApplication.CreateBuilder(args);
//Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173",
                            "https://scrum-board-web-app.netlify.app")
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});


// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ScrumBoardContext>();
using (var context = new ScrumBoardContext())
{
    context.Database.EnsureCreated();
}

//Register services
var services = builder.Services;

services.AddTransient<IScrumBoardContext, ScrumBoardContext>();
services.AddTransient<IScrumBoardService, ScrumBoardService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

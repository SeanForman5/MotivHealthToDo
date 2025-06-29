using Microsoft.EntityFrameworkCore;
using MotivHealthCore.DataAccess.Contexts;
using MotivHealthCore.DataAccess.Interfaces;
using MotivHealthCore.Interfaces;
using MotivHealthCore.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddScoped<IToDoService, ToDoService>();
builder.Services.AddScoped<IToDoRepository, ToDoRepository>();

builder.Services.AddDbContext<ToDoContext>(opt =>
    opt.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Services.AddControllers();


builder.Services.AddCors(options => {
    options.AddPolicy("AllowAll", policy => {
        policy
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});


var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
app.UseCors("AllowAll");
using (var scope = app.Services.CreateScope()) {
    var db = scope.ServiceProvider.GetRequiredService<ToDoContext>();
    db.Database.Migrate();
}
app.Run();

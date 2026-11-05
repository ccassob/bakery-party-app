using BakeryParty.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace BakeryParty.Api.Data;

public static class DbSeeder
{
    // Crea el administrador inicial desde configuración (Admin:Email / Admin:Password) solo si no hay usuarios.
    public static async Task SeedAdminAsync(BakeryPartyDbContext db, IConfiguration config, ILogger logger)
    {
        if (await db.Users.AnyAsync()) return;

        var email = config["Admin:Email"];
        var password = config["Admin:Password"];
        if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(password))
        {
            logger.LogWarning("No hay usuarios y Admin:Email / Admin:Password no están configurados; nadie podrá iniciar sesión.");
            return;
        }

        db.Users.Add(new User { Email = email.Trim(), PasswordHash = BCrypt.Net.BCrypt.HashPassword(password) });
        await db.SaveChangesAsync();
        logger.LogInformation("Usuario administrador creado: {Email}", email);
    }

    // Pedidos de ejemplo, solo para desarrollo y solo si la tabla está vacía.
    public static async Task SeedSampleOrdersAsync(BakeryPartyDbContext db)
    {
        if (await db.TopperOrders.AnyAsync()) return;

        var today = DateOnly.FromDateTime(DateTime.Today);
        db.TopperOrders.AddRange(
            new TopperOrder { Description = "Baby Shower Rosa — Bienvenido", ClientName = "Isabella Navarro", CreatedAt = today, DeliveryDate = today, Status = TopperOrderStatus.EnProgreso, Price = 390, HasDelivery = true, DeliveryCost = 120, IsPaid = true },
            new TopperOrder { Description = "Galaxia & Planetas — Sebastián", ClientName = "Diego Ramirez", CreatedAt = today, DeliveryDate = today.AddDays(1), Status = TopperOrderStatus.PorHacer, Price = 275, IsCredit = true, CreditExpiration = today.AddDays(12) },
            new TopperOrder { Description = "Disney Princesas", ClientName = "Sofia Herrera", CreatedAt = today, DeliveryDate = today.AddDays(2), Status = TopperOrderStatus.PorHacer, Price = 320, HasDelivery = true, DeliveryCost = 100, IsPaid = true },
            new TopperOrder { Description = "Dinosaurios Jurassic", ClientName = "Andres Castillo", CreatedAt = today, DeliveryDate = today.AddDays(3), Status = TopperOrderStatus.PorHacer, Price = 260 });
        await db.SaveChangesAsync();
    }
}

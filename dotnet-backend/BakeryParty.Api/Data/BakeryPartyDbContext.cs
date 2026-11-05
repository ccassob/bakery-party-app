using BakeryParty.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace BakeryParty.Api.Data;

public class BakeryPartyDbContext(DbContextOptions<BakeryPartyDbContext> options) : DbContext(options)
{
    public DbSet<TopperOrder> TopperOrders => Set<TopperOrder>();
    public DbSet<User> Users => Set<User>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BakeryParty.Api.Migrations
{
    /// <inheritdoc />
    public partial class RemoveSeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Intencionalmente vacía: los datos semilla (HasData) se quitaron de las migraciones
            // InitialCreate y AddUsers para bases nuevas; las filas ya existentes se conservan.
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BakeryParty.Api.Migrations
{
    /// <inheritdoc />
    public partial class TopperNameToDescriptionOptionalPrice : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Rename (not drop + add) so existing names are kept as descriptions.
            migrationBuilder.RenameColumn(
                name: "TopperName",
                table: "TopperOrders",
                newName: "Description");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "TopperOrders",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(200)",
                oldMaxLength: 200);

            migrationBuilder.AlterColumn<decimal>(
                name: "Price",
                table: "TopperOrders",
                type: "decimal(10,2)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(10,2)");

            migrationBuilder.UpdateData(
                table: "TopperOrders",
                keyColumn: "Id",
                keyValue: 1,
                column: "Description",
                value: "Baby Shower Rosa — Bienvenido");

            migrationBuilder.UpdateData(
                table: "TopperOrders",
                keyColumn: "Id",
                keyValue: 2,
                column: "Description",
                value: "Galaxia & Planetas — Sebastián");

            migrationBuilder.UpdateData(
                table: "TopperOrders",
                keyColumn: "Id",
                keyValue: 3,
                column: "Description",
                value: "Disney Princesas");

            migrationBuilder.UpdateData(
                table: "TopperOrders",
                keyColumn: "Id",
                keyValue: 4,
                column: "Description",
                value: "Dinosaurios Jurassic");

            migrationBuilder.UpdateData(
                table: "TopperOrders",
                keyColumn: "Id",
                keyValue: 5,
                column: "Description",
                value: "Flores & Mariposas");

            migrationBuilder.UpdateData(
                table: "TopperOrders",
                keyColumn: "Id",
                keyValue: 6,
                column: "Description",
                value: "Real Madrid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "TopperOrders",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(1000)",
                oldMaxLength: 1000);

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "TopperOrders",
                newName: "TopperName");

            migrationBuilder.AlterColumn<decimal>(
                name: "Price",
                table: "TopperOrders",
                type: "decimal(10,2)",
                nullable: false,
                defaultValue: 0m,
                oldClrType: typeof(decimal),
                oldType: "decimal(10,2)",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "TopperOrders",
                keyColumn: "Id",
                keyValue: 1,
                column: "TopperName",
                value: "Baby Shower Rosa — Bienvenido");

            migrationBuilder.UpdateData(
                table: "TopperOrders",
                keyColumn: "Id",
                keyValue: 2,
                column: "TopperName",
                value: "Galaxia & Planetas — Sebastián");

            migrationBuilder.UpdateData(
                table: "TopperOrders",
                keyColumn: "Id",
                keyValue: 3,
                column: "TopperName",
                value: "Disney Princesas");

            migrationBuilder.UpdateData(
                table: "TopperOrders",
                keyColumn: "Id",
                keyValue: 4,
                column: "TopperName",
                value: "Dinosaurios Jurassic");

            migrationBuilder.UpdateData(
                table: "TopperOrders",
                keyColumn: "Id",
                keyValue: 5,
                column: "TopperName",
                value: "Flores & Mariposas");

            migrationBuilder.UpdateData(
                table: "TopperOrders",
                keyColumn: "Id",
                keyValue: 6,
                column: "TopperName",
                value: "Real Madrid");
        }
    }
}

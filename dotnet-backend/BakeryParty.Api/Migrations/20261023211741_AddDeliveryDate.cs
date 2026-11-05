using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BakeryParty.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddDeliveryDate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateOnly>(
                name: "DeliveryDate",
                table: "TopperOrders",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            // Existing orders (seeded or not) start with their creation date as delivery date.
            migrationBuilder.Sql("UPDATE TopperOrders SET DeliveryDate = CreatedAt");

            migrationBuilder.UpdateData(
                table: "TopperOrders",
                keyColumn: "Id",
                keyValue: 1,
                column: "DeliveryDate",
                value: new DateOnly(2026, 6, 17));

            migrationBuilder.UpdateData(
                table: "TopperOrders",
                keyColumn: "Id",
                keyValue: 2,
                column: "DeliveryDate",
                value: new DateOnly(2026, 6, 16));

            migrationBuilder.UpdateData(
                table: "TopperOrders",
                keyColumn: "Id",
                keyValue: 3,
                column: "DeliveryDate",
                value: new DateOnly(2026, 6, 14));

            migrationBuilder.UpdateData(
                table: "TopperOrders",
                keyColumn: "Id",
                keyValue: 4,
                column: "DeliveryDate",
                value: new DateOnly(2026, 6, 13));

            migrationBuilder.UpdateData(
                table: "TopperOrders",
                keyColumn: "Id",
                keyValue: 5,
                column: "DeliveryDate",
                value: new DateOnly(2026, 6, 12));

            migrationBuilder.UpdateData(
                table: "TopperOrders",
                keyColumn: "Id",
                keyValue: 6,
                column: "DeliveryDate",
                value: new DateOnly(2026, 6, 10));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeliveryDate",
                table: "TopperOrders");
        }
    }
}

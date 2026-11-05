using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BakeryParty.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddAudioFileUrl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AudioFileUrl",
                table: "AudioCaptures",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AudioCaptures",
                keyColumn: "Id",
                keyValue: 1,
                column: "AudioFileUrl",
                value: null);

            migrationBuilder.UpdateData(
                table: "AudioCaptures",
                keyColumn: "Id",
                keyValue: 2,
                column: "AudioFileUrl",
                value: null);

            migrationBuilder.UpdateData(
                table: "AudioCaptures",
                keyColumn: "Id",
                keyValue: 3,
                column: "AudioFileUrl",
                value: null);

            migrationBuilder.UpdateData(
                table: "AudioCaptures",
                keyColumn: "Id",
                keyValue: 4,
                column: "AudioFileUrl",
                value: null);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AudioFileUrl",
                table: "AudioCaptures");
        }
    }
}

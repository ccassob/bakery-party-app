using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BakeryParty.Api.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AudioCaptures",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ClientName = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    CapturedAt = table.Column<DateOnly>(type: "date", nullable: false),
                    TranscriptPreview = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    FullTranscript = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DetectedTheme = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AudioCaptures", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TopperOrders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TopperName = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    ClientName = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    CreatedAt = table.Column<DateOnly>(type: "date", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Price = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    HasDelivery = table.Column<bool>(type: "bit", nullable: false),
                    DeliveryCost = table.Column<decimal>(type: "decimal(10,2)", nullable: true),
                    IsPaid = table.Column<bool>(type: "bit", nullable: false),
                    IsCredit = table.Column<bool>(type: "bit", nullable: false),
                    CreditExpiration = table.Column<DateOnly>(type: "date", nullable: true),
                    FromCaptureId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TopperOrders", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "AudioCaptures",
                columns: new[] { "Id", "CapturedAt", "ClientName", "DetectedTheme", "FullTranscript", "Status", "TranscriptPreview" },
                values: new object[,]
                {
                    { 1, new DateOnly(2026, 6, 19), "Maria Rodriguez", "Unicornio Arcoíris", "Hola, quiero un topper para el pastel de mi hija. Cumple cinco años el próximo sábado.\nLe encantan los unicornios — lo quiero en colores pastel, rosa, lila y celeste.\nEl pastel será de tres pisos. El topper debe llevar el nombre \"Valeria\" en letras grandes\ny brillantes. Sería perfecto si pudieran agregarle estrellitas alrededor del nombre.\nTambién necesito que incluya el número cinco. Lo necesito para el viernes por la tarde — ¿pueden hacer entrega?\nVivo en el barrio Las Flores. Gracias.", "Pendiente", "Quiero un topper de unicornio para mi hija Valeria, cumple cinco años…" },
                    { 2, new DateOnly(2026, 6, 18), "Carlos Mendez", "Superhéroes Marvel", "Buenos días, necesito un topper para el pastel de cumpleaños de mi hijo.\nEs fanático de Marvel, especialmente de Spider-Man e Iron Man.\nSu nombre es Mateo y cumple ocho años. Quiero que los colores sean rojo y azul.\nNo necesito delivery — lo recojo yo.", "Pendiente", "El topper es temática Marvel, mi hijo es fanático de Spider-Man…" },
                    { 3, new DateOnly(2026, 6, 17), "Isabella Navarro", "Baby Shower — Rosa", "Hola, buenas tardes. Estoy organizando un baby shower para mi cuñada.\nTodavía no saben el nombre del bebé pero queremos que el topper diga \"Bienvenido al Mundo\".\nLos colores deben ser rosa blush y dorado. Nos gustaría una cigüeña o una estrella.\nEl evento es el 18 de junio. Necesitamos entrega a domicilio — estamos en la Zona 10.", "Procesado", "Es para un baby shower, tonos rosa y dorado, el nombre aún no está decidido…" },
                    { 4, new DateOnly(2026, 6, 16), "Diego Ramirez", "Espacio & Galaxias", "Quiero un topper temático del espacio exterior. Mi hijo cumple quince años\ny es un gran fanático de la astronomía. Quiero planetas, estrellas y cohetes.\nSu nombre es Sebastián. Los colores oscuros están bien — prefiere azul marino y morado.\nLo necesito para el 20 de junio.", "Procesado", "Topper de galaxia y planetas para un quinceañero…" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AudioCaptures");

            migrationBuilder.DropTable(
                name: "TopperOrders");
        }
    }
}

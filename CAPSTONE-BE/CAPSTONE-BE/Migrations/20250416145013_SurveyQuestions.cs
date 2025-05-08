using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CAPSTONE_BE.Migrations
{
    /// <inheritdoc />
    public partial class SurveyQuestions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SurveyQuestions",
                columns: table => new
                {
                    Question = table.Column<string>(type: "nvarchar(800)", maxLength: 800, nullable: false),
                    Answer = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SurveyQuestions", x => new { x.Question, x.Answer });
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SurveyQuestions");
        }
    }
}

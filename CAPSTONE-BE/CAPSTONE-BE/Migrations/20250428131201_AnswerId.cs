using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CAPSTONE_BE.Migrations
{
    /// <inheritdoc />
    public partial class AnswerId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AnswerId",
                table: "SurveyQuestions",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AnswerId",
                table: "SurveyQuestions");
        }
    }
}

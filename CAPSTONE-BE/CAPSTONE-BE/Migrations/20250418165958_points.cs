using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CAPSTONE_BE.Migrations
{
    /// <inheritdoc />
    public partial class points : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Points",
                table: "SurveyQuestions",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Points",
                table: "SurveyQuestions");
        }
    }
}

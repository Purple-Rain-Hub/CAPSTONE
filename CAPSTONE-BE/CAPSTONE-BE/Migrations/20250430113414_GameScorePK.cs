using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CAPSTONE_BE.Migrations
{
    /// <inheritdoc />
    public partial class GameScorePK : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_GameScores",
                table: "GameScores");

            migrationBuilder.AddPrimaryKey(
                name: "PK_GameScores",
                table: "GameScores",
                columns: new[] { "SessionId", "GameId" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_GameScores",
                table: "GameScores");

            migrationBuilder.AddPrimaryKey(
                name: "PK_GameScores",
                table: "GameScores",
                column: "SessionId");
        }
    }
}

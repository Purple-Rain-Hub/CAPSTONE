using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CAPSTONE_BE.Migrations
{
    /// <inheritdoc />
    public partial class GameId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SurveySessions_AspNetUsers_UserId",
                table: "SurveySessions");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "SurveySessions",
                newName: "UserEmail");

            migrationBuilder.RenameIndex(
                name: "IX_SurveySessions_UserId",
                table: "SurveySessions",
                newName: "IX_SurveySessions_UserEmail");

            migrationBuilder.AddPrimaryKey(
                name: "PK_GameScores",
                table: "GameScores",
                column: "SessionId");

            migrationBuilder.AddForeignKey(
                name: "FK_SurveySessions_AspNetUsers_UserEmail",
                table: "SurveySessions",
                column: "UserEmail",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SurveySessions_AspNetUsers_UserEmail",
                table: "SurveySessions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_GameScores",
                table: "GameScores");

            migrationBuilder.RenameColumn(
                name: "UserEmail",
                table: "SurveySessions",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_SurveySessions_UserEmail",
                table: "SurveySessions",
                newName: "IX_SurveySessions_UserId");

            migrationBuilder.AlterColumn<Guid>(
                name: "GameId",
                table: "GameScores",
                type: "uniqueidentifier",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AddPrimaryKey(
                name: "PK_GameScores",
                table: "GameScores",
                columns: new[] { "SessionId", "GameId" });

            migrationBuilder.AddForeignKey(
                name: "FK_SurveySessions_AspNetUsers_UserId",
                table: "SurveySessions",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

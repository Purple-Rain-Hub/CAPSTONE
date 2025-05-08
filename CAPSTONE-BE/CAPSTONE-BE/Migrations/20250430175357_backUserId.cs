using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CAPSTONE_BE.Migrations
{
    /// <inheritdoc />
    public partial class backUserId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SurveySessions_AspNetUsers_UserEmail",
                table: "SurveySessions");

            migrationBuilder.RenameColumn(
                name: "UserEmail",
                table: "SurveySessions",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_SurveySessions_UserEmail",
                table: "SurveySessions",
                newName: "IX_SurveySessions_UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_SurveySessions_AspNetUsers_UserId",
                table: "SurveySessions",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddForeignKey(
                name: "FK_SurveySessions_AspNetUsers_UserEmail",
                table: "SurveySessions",
                column: "UserEmail",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

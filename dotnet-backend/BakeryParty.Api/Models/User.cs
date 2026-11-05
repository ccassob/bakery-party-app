using System.ComponentModel.DataAnnotations;

namespace BakeryParty.Api.Models;

public class User
{
    public int Id { get; set; }
    [MaxLength(200)] public string Email { get; set; } = "";
    [MaxLength(200)] public string PasswordHash { get; set; } = "";
}

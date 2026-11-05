using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BakeryParty.Api.Models;

public class TopperOrder
{
    public int Id { get; set; }
    [MaxLength(1000)] public string Description { get; set; } = "";
    [MaxLength(200)] public string ClientName { get; set; } = "";
    public DateOnly CreatedAt { get; set; } = DateOnly.FromDateTime(DateTime.Today);
    public DateOnly DeliveryDate { get; set; }
    [MaxLength(50)] public string Status { get; set; } = TopperOrderStatus.PorHacer;
    [Column(TypeName = "decimal(10,2)")] public decimal? Price { get; set; }
    public bool HasDelivery { get; set; }
    [Column(TypeName = "decimal(10,2)")] public decimal? DeliveryCost { get; set; }
    public bool IsPaid { get; set; }
    public bool IsCredit { get; set; }
    public DateOnly? CreditExpiration { get; set; }
}

public static class TopperOrderStatus
{
    public const string PorHacer = "Por Hacer";
    public const string EnProgreso = "En Progreso";
    public const string Entregado = "Entregado";
    public const string Pagado = "Pagado";
    public const string ACredito = "A Crédito";
    public const string Completado = "Completado";
}

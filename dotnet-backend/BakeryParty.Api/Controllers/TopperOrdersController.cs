using BakeryParty.Api.Data;
using BakeryParty.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BakeryParty.Api.Controllers;

[ApiController]
[Authorize]
[Route("api/topper-orders")]
public class TopperOrdersController(BakeryPartyDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] string? clientName, [FromQuery] string? status)
    {
        var query = db.TopperOrders.AsQueryable();
        if (!string.IsNullOrWhiteSpace(clientName))
            query = query.Where(o => o.ClientName.Contains(clientName));
        if (!string.IsNullOrWhiteSpace(status))
            query = query.Where(o => o.Status == status);
        return Ok(await query.OrderBy(o => o.DeliveryDate).ToListAsync());
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var order = await db.TopperOrders.FindAsync(id);
        return order is null ? NotFound() : Ok(order);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] TopperOrder order)
    {
        if (order.DeliveryDate == default)
            return BadRequest("DeliveryDate is required.");
        order.Id = 0;
        order.CreatedAt = DateOnly.FromDateTime(DateTime.Today);
        db.TopperOrders.Add(order);
        await db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = order.Id }, order);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] TopperOrder updated)
    {
        var order = await db.TopperOrders.FindAsync(id);
        if (order is null) return NotFound();
        if (updated.DeliveryDate == default)
            return BadRequest("DeliveryDate is required.");
        order.Description = updated.Description;
        order.DeliveryDate = updated.DeliveryDate;
        order.ClientName = updated.ClientName;
        order.Status = updated.Status;
        order.Price = updated.Price;
        order.HasDelivery = updated.HasDelivery;
        order.DeliveryCost = updated.DeliveryCost;
        order.IsPaid = updated.IsPaid;
        order.IsCredit = updated.IsCredit;
        order.CreditExpiration = updated.CreditExpiration;
        await db.SaveChangesAsync();
        return Ok(order);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var order = await db.TopperOrders.FindAsync(id);
        if (order is null) return NotFound();
        db.TopperOrders.Remove(order);
        await db.SaveChangesAsync();
        return NoContent();
    }
}

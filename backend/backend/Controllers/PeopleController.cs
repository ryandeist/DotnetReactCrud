using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PeopleController : ControllerBase
{
    private readonly AppDbContext _context;

    public PeopleController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost] // POST /api/people
    public async Task<IActionResult> AddPerson(Person person)
    {
        try
        {
            _context.People.Add(person);
            await _context.SaveChangesAsync();
            return Ok(person); // return 200 status code with the created person object in the response body.

        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message); // return 500 status code with the error message in the response body.
        }
    }

    [HttpGet] // GET /api/people
    public async Task<IActionResult> GetPeople()
    {
        try
        {
            var people = await _context.People.ToListAsync();
            return Ok(people); // return 200 status code with the list of people in the response body.
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message); // return 500 status code with the error message in the response body.
        }
    }
}

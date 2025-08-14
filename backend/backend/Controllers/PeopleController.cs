using backend.Models;
using Microsoft.AspNetCore.Http.HttpResults;
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
            return CreatedAtRoute("GetPerson", new { id = person.PersonId }, person); // return 201 status + the location of the resource code with the created person object in the response body.

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

    [HttpGet("{id:int}", Name = "GetPerson")] // GET /api/people/{id}
    public async Task<IActionResult> GetPerson(int id)
    {
        try
        {
            var person = await _context.People.FindAsync(id);

            if (person is null)
            {
                return NotFound(); // return 404 status code if the person with the given id is not found.
            }
            return Ok(person); // return 200 status code with the list of people in the response body.
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message); // return 500 status code with the error message in the response body.
        }
    }

    [HttpPut("{id:int}")] // PUT /api/people/{id}
    public async Task<IActionResult> UpdatePerson(int id,[FromBody] Person person)
    {
        try
        {
            if (id != person.PersonId)
            {
                return BadRequest("Person ID mismatch"); // return 400 status code if the id in the URL does not match the id in the person object.
            }

            if (!await _context.People.AnyAsync(person => person.PersonId == id))
            {
                return NotFound(); // return 404 status code if the person with the given id is not found.
            }

            _context.People.Update(person);
            await _context.SaveChangesAsync();
            return NoContent(); // return 204 status code with no content in the response body.
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message); // return 500 status code with the error message in the response body.
        }
    }
}

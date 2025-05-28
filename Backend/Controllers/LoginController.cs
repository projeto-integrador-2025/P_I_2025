using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MonitoramentoAPI.Data;
using MonitoramentoAPI.Models;
using MonitoramentoAPI.Models.DTO;
using MonitoramentoAPI.Models.DTO.Create;

namespace MonitoramentoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly MonitoringContext _context;

        public LoginController(MonitoringContext context)
        {
            _context = context;
        }

        // GET: api/Login
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LoginDTO>>> GetLoginDTO()
        {
            var logins = await _context.Login.ToListAsync();

            // Converte para DTO
            var loginDtos = logins.Select(login => new LoginDTO
            {
                Id = login.Id,
                Nome = login.Nome,
                Email = login.Email,
                Senha = login.Senha
            });

            return Ok(loginDtos);
        }

        // GET: api/Login/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LoginDTO>> GetLoginDTO(int id)
        {
            var login = await _context.Login.FindAsync(id);

            if (login == null)
                return NotFound();

            var loginDto = new LoginDTO
            {
                Id = login.Id,
                Nome = login.Nome,
                Email = login.Email,
                Senha = login.Senha
            };

            return Ok(loginDto);
        }

        // PUT: api/Login/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLoginDTO(int id, CreateLoginDTO loginDTO)
        {
            var login = await _context.Login.FindAsync(id);
            if (login == null)
                return NotFound();

            login.Nome = loginDTO.Nome;
            login.Email = loginDTO.Email;
            login.Senha = loginDTO.Senha;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LoginExists(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // POST: api/Login
        [HttpPost]
        public async Task<ActionResult<LoginDTO>> PostLoginDTO(CreateLoginDTO loginDTO)
        {
            var login = new Login
            {
                Nome = loginDTO.Nome,
                Email = loginDTO.Email,
                Senha = loginDTO.Senha
            };

            _context.Login.Add(login);
            await _context.SaveChangesAsync();

            var resultDto = new LoginDTO
            {
                Id = login.Id,
                Nome = login.Nome,
                Email = loginDTO.Email,
                Senha = login.Senha
            };

            return CreatedAtAction(nameof(GetLoginDTO), new { id = resultDto.Id }, resultDto);
        }

        // DELETE: api/Login/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLoginDTO(int id)
        {
            var login = await _context.Login.FindAsync(id);
            if (login == null)
                return NotFound();

            _context.Login.Remove(login);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LoginExists(int id)
        {
            return _context.Login.Any(e => e.Id == id);
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
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
    public class CicloController : ControllerBase
    {
        private readonly MonitoringContext _context;

        public CicloController(MonitoringContext context)
        {
            _context = context;
        }

        // GET: api/Ciclos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CicloDTO>>> GetCiclos()
        {
            var ciclos = await _context.Ciclos.ToListAsync();
            return ciclos.Select(c => MapToDTO(c)).ToList();
        }

        // GET: api/Ciclos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CicloDTO>> GetCiclo(int id)
        {
            var ciclo = await _context.Ciclos.FindAsync(id);

            if (ciclo == null)
            {
                return NotFound();
            }

            return MapToDTO(ciclo);
        }

        // PUT: api/Ciclos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCiclo(int id, CicloDTO cicloDTO)
        {
            if (id != cicloDTO.IdCiclo)
            {
                return BadRequest("ID na URL não corresponde ao ID do ciclo.");
            }

            var ciclo = await _context.Ciclos.FindAsync(id);
            if (ciclo == null)
            {
                return NotFound();
            }

            // Mapeia DTO para o modelo existente
            ciclo.IdPeca = cicloDTO.IdPeca;
            ciclo.IdEstacao = cicloDTO.IdEstacao;
            ciclo.TempoInicial = cicloDTO.TempoInicial;
            ciclo.TimestampCiclo = cicloDTO.TimestampCiclo;

            _context.Entry(ciclo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CicloExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Ciclos
        [HttpPost]
        public async Task<ActionResult<CicloDTO>> PostCiclo(CreateCicloDTO createCicloDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var ciclo = new Ciclo
            {
                IdPeca = createCicloDTO.IdPeca,
                IdEstacao = createCicloDTO.IdEstacao,
                TempoInicial = createCicloDTO.TempoInicial,
                TimestampCiclo = createCicloDTO.TimestampCiclo
            };

            _context.Ciclos.Add(ciclo);
            await _context.SaveChangesAsync();

            var cicloDTO = MapToDTO(ciclo);
            return CreatedAtAction("GetCiclo", new { id = ciclo.IdCiclo }, cicloDTO);
        }

        // DELETE: api/Ciclos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCiclo(int id)
        {
            var ciclo = await _context.Ciclos.FindAsync(id);
            if (ciclo == null)
            {
                return NotFound();
            }

            _context.Ciclos.Remove(ciclo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CicloExists(int id)
        {
            return _context.Ciclos.Any(e => e.IdCiclo == id);
        }

        // Método auxiliar para mapear Ciclo -> CicloDTO
        private static CicloDTO MapToDTO(Ciclo ciclo)
        {
            return new CicloDTO
            {
                IdCiclo = ciclo.IdCiclo,
                IdPeca = ciclo.IdPeca,
                IdEstacao = ciclo.IdEstacao,
                TempoInicial = ciclo.TempoInicial,
                TimestampCiclo = ciclo.TimestampCiclo
            };
        }
    }
}
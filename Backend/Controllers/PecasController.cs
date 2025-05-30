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
    public class PecaController : ControllerBase
    {
        private readonly MonitoringContext _context;

        public PecaController(MonitoringContext context)
        {
            _context = context;
        }

        // GET: api/Peca
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PecaDTO>>> GetPecas()
        {
            var pecas = await _context.Pecas.ToListAsync();
            return pecas.Select(p => MapToDTO(p)).ToList();
        }

        // GET: api/Peca/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PecaDTO>> GetPeca(int id)
        {
            var peca = await _context.Pecas.FindAsync(id);

            if (peca == null)
            {
                return NotFound();
            }

            return MapToDTO(peca);
        }

        // PUT: api/Peca/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPeca(int id, PecaDTO pecaDTO)
        {
            if (id != pecaDTO.IdPeca)
            {
                return BadRequest("ID na URL não corresponde ao ID da peça.");
            }

            var peca = await _context.Pecas.FindAsync(id);
            if (peca == null)
            {
                return NotFound();
            }

            // Atualiza apenas o campo permitido
            peca.TipoMaterial = pecaDTO.TipoMaterial;

            _context.Entry(peca).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PecaExists(id))
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

        // POST: api/Peca
        [HttpPost]
        public async Task<ActionResult<PecaDTO>> PostPeca(CreatePecaDTO createDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var peca = new Peca
            {
                TipoMaterial = createDTO.TipoMaterial
            };

            _context.Pecas.Add(peca);
            await _context.SaveChangesAsync();

            var pecaDTO = MapToDTO(peca);
            return CreatedAtAction("GetPeca", new { id = peca.IdPeca }, pecaDTO);
        }

        // DELETE: api/Peca/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePeca(int id)
        {
            var peca = await _context.Pecas.FindAsync(id);
            if (peca == null)
            {
                return NotFound();
            }

            _context.Pecas.Remove(peca);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PecaExists(int id)
        {
            return _context.Pecas.Any(e => e.IdPeca == id);
        }

        // Método auxiliar para mapear Peca -> PecaDTO
        private static PecaDTO MapToDTO(Peca peca)
        {
            return new PecaDTO
            {
                IdPeca = peca.IdPeca,
                TipoMaterial = peca.TipoMaterial
            };
        }
    }
}
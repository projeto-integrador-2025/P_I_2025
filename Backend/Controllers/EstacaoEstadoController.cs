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
    public class EstacaoEstadoController : ControllerBase
    {
        private readonly MonitoringContext _context;

        public EstacaoEstadoController(MonitoringContext context)
        {
            _context = context;
        }

        // GET: api/EstacaoEstado
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EstacaoEstadoDTO>>> GetEstacoesEstados()
        {
            var estados = await _context.EstacoesEstados.ToListAsync();
            return estados.Select(e => MapToDTO(e)).ToList();
        }

        // GET: api/EstacaoEstado/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EstacaoEstadoDTO>> GetEstacaoEstado(int id)
        {
            var estado = await _context.EstacoesEstados.FindAsync(id);

            if (estado == null)
            {
                return NotFound();
            }

            return MapToDTO(estado);
        }

        // PUT: api/EstacaoEstado/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEstacaoEstado(int id, EstacaoEstadoDTO estadoDTO)
        {
            if (id != estadoDTO.IdEstado)
            {
                return BadRequest("ID na URL não corresponde ao ID do estado.");
            }

            var estado = await _context.EstacoesEstados.FindAsync(id);
            if (estado == null)
            {
                return NotFound();
            }

            // Mapeia DTO para o modelo existente
            estado.IdEstacao = estadoDTO.IdEstacao;
            estado.Estado = estadoDTO.Estado;
            estado.TimestampEstado = estadoDTO.TimestampEstado;

            _context.Entry(estado).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EstacaoEstadoExists(id))
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

        // POST: api/EstacaoEstado
        [HttpPost]
        public async Task<ActionResult<EstacaoEstadoDTO>> PostEstacaoEstado(CreateEstacaoEstadoDTO createDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var estado = new EstacaoEstado
            {
                IdEstacao = createDTO.IdEstacao,
                Estado = createDTO.Estado,
                TimestampEstado = createDTO.TimestampEstado
            };

            _context.EstacoesEstados.Add(estado);
            await _context.SaveChangesAsync();

            var estadoDTO = MapToDTO(estado);
            return CreatedAtAction("GetEstacaoEstado", new { id = estado.IdEstado }, estadoDTO);
        }

        // DELETE: api/EstacaoEstado/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEstacaoEstado(int id)
        {
            var estado = await _context.EstacoesEstados.FindAsync(id);
            if (estado == null)
            {
                return NotFound();
            }

            _context.EstacoesEstados.Remove(estado);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EstacaoEstadoExists(int id)
        {
            return _context.EstacoesEstados.Any(e => e.IdEstado == id);
        }

        // Método auxiliar para mapear EstacaoEstado -> EstacaoEstadoDTO
        private static EstacaoEstadoDTO MapToDTO(EstacaoEstado estado)
        {
            return new EstacaoEstadoDTO
            {
                IdEstado = estado.IdEstado,
                IdEstacao = estado.IdEstacao,
                Estado = estado.Estado,
                TimestampEstado = estado.TimestampEstado
            };
        }
    }
}
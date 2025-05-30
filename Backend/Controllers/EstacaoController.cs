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
    public class EstacaoController : ControllerBase
    {
        private readonly MonitoringContext _context;

        public EstacaoController(MonitoringContext context)
        {
            _context = context;
        }

        // GET: api/Estacao
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EstacaoDTO>>> GetEstacoes()
        {
            var estacoes = await _context.Estacoes.ToListAsync();
            return estacoes.Select(e => MapToDTO(e)).ToList();
        }

        // GET: api/Estacao/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EstacaoDTO>> GetEstacao(int id)
        {
            var estacao = await _context.Estacoes.FindAsync(id);

            if (estacao == null)
            {
                return NotFound();
            }

            return MapToDTO(estacao);
        }

        // PUT: api/Estacao/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEstacao(int id, EstacaoDTO estacaoDTO)
        {
            if (id != estacaoDTO.IdEstacao)
            {
                return BadRequest("ID na URL não corresponde ao ID da estação.");
            }

            var estacao = await _context.Estacoes.FindAsync(id);
            if (estacao == null)
            {
                return NotFound();
            }

            // Mapeia DTO para o modelo existente
            estacao.Descricao = estacaoDTO.Descricao;

            _context.Entry(estacao).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EstacaoExists(id))
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

        // POST: api/Estacao
        [HttpPost]
        public async Task<ActionResult<EstacaoDTO>> PostEstacao(CreateEstacaoDTO createDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var estacao = new Estacao
            {
                Descricao = createDTO.Descricao
            };

            _context.Estacoes.Add(estacao);
            await _context.SaveChangesAsync();

            var estacaoDTO = MapToDTO(estacao);
            return CreatedAtAction("GetEstacao", new { id = estacao.IdEstacao }, estacaoDTO);
        }

        // DELETE: api/Estacao/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEstacao(int id)
        {
            var estacao = await _context.Estacoes.FindAsync(id);
            if (estacao == null)
            {
                return NotFound();
            }

            _context.Estacoes.Remove(estacao);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EstacaoExists(int id)
        {
            return _context.Estacoes.Any(e => e.IdEstacao == id);
        }

        // Método auxiliar para mapear Estacao -> EstacaoDTO
        private static EstacaoDTO MapToDTO(Estacao estacao)
        {
            return new EstacaoDTO
            {
                IdEstacao = estacao.IdEstacao,
                Descricao = estacao.Descricao
            };
        }
    }
}
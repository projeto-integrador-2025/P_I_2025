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
    public class DeteccaoSensorController : ControllerBase
    {
        private readonly MonitoringContext _context;

        public DeteccaoSensorController(MonitoringContext context)
        {
            _context = context;
        }

        // GET: api/DeteccaoSensor
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DeteccaoSensorDTO>>> GetDeteccoesSensor()
        {
            var deteccoes = await _context.DeteccoesSensor.ToListAsync();
            return deteccoes.Select(d => MapToDTO(d)).ToList();
        }

        // GET: api/DeteccaoSensor/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DeteccaoSensorDTO>> GetDeteccaoSensor(int id)
        {
            var deteccao = await _context.DeteccoesSensor.FindAsync(id);

            if (deteccao == null)
            {
                return NotFound();
            }

            return MapToDTO(deteccao);
        }

        // PUT: api/DeteccaoSensor/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDeteccaoSensor(int id, DeteccaoSensorDTO deteccaoDTO)
        {
            if (id != deteccaoDTO.IdDeteccao)
            {
                return BadRequest("ID na URL não corresponde ao ID da detecção.");
            }

            var deteccao = await _context.DeteccoesSensor.FindAsync(id);
            if (deteccao == null)
            {
                return NotFound();
            }

            // Mapeia DTO para o modelo existente
            deteccao.IdSensor = deteccaoDTO.IdSensor;
            deteccao.TimestampDeteccao = deteccaoDTO.TimestampDeteccao;

            _context.Entry(deteccao).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DeteccaoExists(id))
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

        // POST: api/DeteccaoSensor
        [HttpPost]
        public async Task<ActionResult<DeteccaoSensorDTO>> PostDeteccaoSensor(CreateDeteccaoSensorDTO createDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var deteccao = new DeteccaoSensor
            {
                IdSensor = createDTO.IdSensor,
                TimestampDeteccao = createDTO.TimestampDeteccao
            };

            _context.DeteccoesSensor.Add(deteccao);
            await _context.SaveChangesAsync();

            var deteccaoDTO = MapToDTO(deteccao);
            return CreatedAtAction("GetDeteccaoSensor", new { id = deteccao.IdDeteccao }, deteccaoDTO);
        }

        // DELETE: api/DeteccaoSensor/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDeteccaoSensor(int id)
        {
            var deteccao = await _context.DeteccoesSensor.FindAsync(id);
            if (deteccao == null)
            {
                return NotFound();
            }

            _context.DeteccoesSensor.Remove(deteccao);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DeteccaoExists(int id)
        {
            return _context.DeteccoesSensor.Any(e => e.IdDeteccao == id);
        }

        // Método auxiliar para mapear DeteccaoSensor -> DeteccaoSensorDTO
        private static DeteccaoSensorDTO MapToDTO(DeteccaoSensor deteccao)
        {
            return new DeteccaoSensorDTO
            {
                IdDeteccao = deteccao.IdDeteccao,
                IdSensor = deteccao.IdSensor,
                TimestampDeteccao = deteccao.TimestampDeteccao
            };
        }
    }
}
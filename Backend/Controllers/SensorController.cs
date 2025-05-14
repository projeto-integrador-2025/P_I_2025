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
    public class SensorController : ControllerBase
    {
        private readonly MonitoringContext _context;

        public SensorController(MonitoringContext context)
        {
            _context = context;
        }

        // GET: api/Sensor
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SensorDTO>>> GetSensores()
        {
            var sensores = await _context.Sensores.ToListAsync();
            return sensores.Select(s => MapToDTO(s)).ToList();
        }

        // GET: api/Sensor/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SensorDTO>> GetSensor(int id)
        {
            var sensor = await _context.Sensores.FindAsync(id);

            if (sensor == null)
            {
                return NotFound();
            }

            return MapToDTO(sensor);
        }

        // PUT: api/Sensor/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSensor(int id, SensorDTO sensorDTO)
        {
            if (id != sensorDTO.IdSensor)
            {
                return BadRequest("ID na URL não corresponde ao ID do sensor.");
            }

            var sensor = await _context.Sensores.FindAsync(id);
            if (sensor == null)
            {
                return NotFound();
            }

            // Atualiza os campos permitidos
            sensor.TipoSensor = sensorDTO.TipoSensor;
            sensor.IdEstacao = sensorDTO.IdEstacao;
            sensor.Descricao = sensorDTO.Descricao;

            _context.Entry(sensor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SensorExists(id))
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

        // POST: api/Sensor
        [HttpPost]
        public async Task<ActionResult<SensorDTO>> PostSensor(CreateSensorDTO createDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var sensor = new Sensor
            {
                TipoSensor = createDTO.TipoSensor,
                IdEstacao = createDTO.IdEstacao,
                Descricao = createDTO.Descricao
            };

            _context.Sensores.Add(sensor);
            await _context.SaveChangesAsync();

            var sensorDTO = MapToDTO(sensor);
            return CreatedAtAction("GetSensor", new { id = sensor.IdSensor }, sensorDTO);
        }

        // DELETE: api/Sensor/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSensor(int id)
        {
            var sensor = await _context.Sensores.FindAsync(id);
            if (sensor == null)
            {
                return NotFound();
            }

            _context.Sensores.Remove(sensor);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SensorExists(int id)
        {
            return _context.Sensores.Any(e => e.IdSensor == id);
        }

        // Método auxiliar para mapear Sensor -> SensorDTO
        private static SensorDTO MapToDTO(Sensor sensor)
        {
            return new SensorDTO
            {
                IdSensor = sensor.IdSensor,
                TipoSensor = sensor.TipoSensor,
                IdEstacao = sensor.IdEstacao,
                Descricao = sensor.Descricao
            };
        }
    }
}
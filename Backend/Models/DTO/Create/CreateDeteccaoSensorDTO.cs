using System.ComponentModel.DataAnnotations;

namespace MonitoramentoAPI.Models.DTO.Create
{
    public class CreateDeteccaoSensorDTO
    {
        public int? IdSensor { get; set; }

        [Required]
        public DateTime TimestampDeteccao { get; set; }
    }
}

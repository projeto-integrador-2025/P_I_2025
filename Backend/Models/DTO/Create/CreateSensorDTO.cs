using System.ComponentModel.DataAnnotations;

namespace MonitoramentoAPI.Models.DTO.Create
{
    public class CreateSensorDTO
    {
        [Required]
        [StringLength(50)]
        public string TipoSensor { get; set; }

        public int? IdEstacao { get; set; }

        [StringLength(255)]
        public string? Descricao { get; set; }
    }
}

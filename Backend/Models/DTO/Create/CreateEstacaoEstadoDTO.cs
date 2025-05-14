using System.ComponentModel.DataAnnotations;

namespace MonitoramentoAPI.Models.DTO.Create
{
    public class CreateEstacaoEstadoDTO
    {
        public int? IdEstacao { get; set; }

        [Required]
        public bool Estado { get; set; }

        [Required]
        public DateTime TimestampEstado { get; set; }
    }
}

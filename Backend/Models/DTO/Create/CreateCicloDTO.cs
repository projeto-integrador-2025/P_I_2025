using System.ComponentModel.DataAnnotations;

namespace MonitoramentoAPI.Models.DTO.Create
{
    public class CreateCicloDTO
    {
        public int? IdPeca { get; set; }

        public int? IdEstacao { get; set; }

        [Required]
        public DateTime TempoInicial { get; set; }

        [Required]
        public DateTime TimestampCiclo { get; set; }
    }
}

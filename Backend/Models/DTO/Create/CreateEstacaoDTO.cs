using System.ComponentModel.DataAnnotations;

namespace MonitoramentoAPI.Models.DTO.Create
{
    public class CreateEstacaoDTO
    {
        [Required]
        [StringLength(100)]
        public string Descricao { get; set; } = null!;
    }
}

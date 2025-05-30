using System.ComponentModel.DataAnnotations;

namespace MonitoramentoAPI.Models.DTO.Create
{
    public class CreatePecaDTO
    {
        [Required]
        [StringLength(50)]
        public string TipoMaterial { get; set; } = null!;
    }
}

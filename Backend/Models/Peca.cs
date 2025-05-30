using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace MonitoramentoAPI.Models;

[Table("peca")]
public partial class Peca
{
    [Key]
    [Column("id_peca")]
    public int IdPeca { get; set; }

    [Column("tipo_material")]
    [StringLength(50)]
    public string TipoMaterial { get; set; } = null!;

    [InverseProperty("IdPecaNavigation")]
    public virtual ICollection<Ciclo> Ciclos { get; set; } = new List<Ciclo>();
}

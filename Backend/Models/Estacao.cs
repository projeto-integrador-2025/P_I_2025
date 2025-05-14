using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace MonitoramentoAPI.Models;

[Table("estacao")]
public partial class Estacao
{
    [Key]
    [Column("id_estacao")]
    public int IdEstacao { get; set; }

    [Column("descricao")]
    [StringLength(100)]
    public string Descricao { get; set; } = null!;

    [InverseProperty("IdEstacaoNavigation")]
    public virtual ICollection<Ciclo> Ciclos { get; set; } = new List<Ciclo>();

    [InverseProperty("IdEstacaoNavigation")]
    public virtual ICollection<EstacaoEstado> EstacaoEstados { get; set; } = new List<EstacaoEstado>();

    [InverseProperty("IdEstacaoNavigation")]
    public virtual ICollection<Sensor> Sensors { get; set; } = new List<Sensor>();
}

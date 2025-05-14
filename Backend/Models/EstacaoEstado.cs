using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace MonitoramentoAPI.Models;

[Table("estacao_estado")]
public partial class EstacaoEstado
{
    [Key]
    [Column("id_estado")]
    public int IdEstado { get; set; }

    [Column("id_estacao")]
    public int? IdEstacao { get; set; }

    [Column("estado")]
    public bool Estado { get; set; }

    [Column("timestamp_estado", TypeName = "timestamp without time zone")]
    public DateTime TimestampEstado { get; set; }

    [ForeignKey("IdEstacao")]
    [InverseProperty("EstacaoEstados")]
    public virtual Estacao? IdEstacaoNavigation { get; set; }
}

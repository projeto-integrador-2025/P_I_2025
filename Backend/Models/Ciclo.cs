using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace MonitoramentoAPI.Models;

[Table("ciclo")]
public partial class Ciclo
{
    [Key]
    [Column("id_ciclo")]
    public int IdCiclo { get; set; }

    [Column("id_peca")]
    public int? IdPeca { get; set; }

    [Column("id_estacao")]
    public int? IdEstacao { get; set; }

    [Column("tempo_inicial", TypeName = "timestamp without time zone")]
    public DateTime TempoInicial { get; set; }

    [Column("timestamp_ciclo", TypeName = "timestamp without time zone")]
    public DateTime TimestampCiclo { get; set; }

    [ForeignKey("IdEstacao")]
    [InverseProperty("Ciclos")]
    public virtual Estacao? IdEstacaoNavigation { get; set; }

    [ForeignKey("IdPeca")]
    [InverseProperty("Ciclos")]
    public virtual Peca? IdPecaNavigation { get; set; }
}

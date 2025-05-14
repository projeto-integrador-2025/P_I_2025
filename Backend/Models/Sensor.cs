using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace MonitoramentoAPI.Models;

[Table("sensor")]
public partial class Sensor
{
    [Key]
    [Column("id_sensor")]
    public int IdSensor { get; set; }

    [Column("tipo_sensor")]
    [StringLength(50)]
    public string? TipoSensor { get; set; }

    [Column("id_estacao")]
    public int? IdEstacao { get; set; }

    [Column("descricao")]
    [StringLength(255)]
    public string? Descricao { get; set; }

    [InverseProperty("IdSensorNavigation")]
    public virtual ICollection<DeteccaoSensor> DeteccaoSensors { get; set; } = new List<DeteccaoSensor>();

    [ForeignKey("IdEstacao")]
    [InverseProperty("Sensors")]
    public virtual Estacao? IdEstacaoNavigation { get; set; }
}

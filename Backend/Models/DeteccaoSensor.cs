using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace MonitoramentoAPI.Models;

[Table("deteccao_sensor")]
public partial class DeteccaoSensor
{
    [Key]
    [Column("id_deteccao")]
    public int IdDeteccao { get; set; }

    [Column("id_sensor")]
    public int? IdSensor { get; set; }

    [Column("timestamp_deteccao", TypeName = "timestamp without time zone")]
    public DateTime TimestampDeteccao { get; set; }

    [ForeignKey("IdSensor")]
    [InverseProperty("DeteccaoSensors")]
    public virtual Sensor? IdSensorNavigation { get; set; }
}

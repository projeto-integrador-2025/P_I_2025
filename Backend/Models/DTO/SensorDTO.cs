namespace MonitoramentoAPI.Models.DTO
{
    public class SensorDTO
    {
        public int IdSensor { get; set; }
        public string? TipoSensor { get; set; }
        public int? IdEstacao { get; set; }
        public string? Descricao { get; set; }
    }
}

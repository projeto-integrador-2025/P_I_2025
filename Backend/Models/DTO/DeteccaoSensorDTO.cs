namespace MonitoramentoAPI.Models.DTO
{
    public class DeteccaoSensorDTO
    {
        public int IdDeteccao { get; set; }
        public int? IdSensor { get; set; }
        public DateTime TimestampDeteccao { get; set; }
    }
}

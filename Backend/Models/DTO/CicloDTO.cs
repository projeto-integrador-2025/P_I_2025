namespace MonitoramentoAPI.Models.DTO
{
    public class CicloDTO
    {
        public int IdCiclo { get; set; }
        public int? IdPeca { get; set; }
        public int? IdEstacao { get; set; }
        public DateTime TempoInicial { get; set; }
        public DateTime TimestampCiclo { get; set; }
    }
}

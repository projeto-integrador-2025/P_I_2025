namespace MonitoramentoAPI.Models.DTO
{
    public class EstacaoEstadoDTO
    {
        public int IdEstado { get; set; }
        public int? IdEstacao { get; set; }
        public bool Estado { get; set; }
        public DateTime TimestampEstado { get; set; }
    }
}

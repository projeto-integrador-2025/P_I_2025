namespace MonitoramentoAPI.Models.DTO

{
    public class LoginDTO
    {
        public int Id { get; set; }  
        public string Nome { get; set; } = null!;      
        public string Senha { get; set; } = null!;
    }
}

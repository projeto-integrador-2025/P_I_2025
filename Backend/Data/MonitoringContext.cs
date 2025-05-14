using Microsoft.EntityFrameworkCore;
using MonitoramentoAPI.Models;

namespace MonitoramentoAPI.Data;

public partial class MonitoringContext : DbContext
{
    public MonitoringContext(DbContextOptions<MonitoringContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Ciclo> Ciclos { get; set; }
    public virtual DbSet<DeteccaoSensor> DeteccoesSensor { get; set; }
    public virtual DbSet<Estacao> Estacoes { get; set; }
    public virtual DbSet<EstacaoEstado> EstacoesEstados { get; set; }
    public virtual DbSet<Peca> Pecas { get; set; }
    public virtual DbSet<Sensor> Sensores { get; set; }
    public virtual DbSet<Login> Login { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
       modelBuilder.Entity<Ciclo>(entity =>
{
    entity.HasKey(e => e.IdCiclo).HasName("ciclo_pkey");

    entity.Property(e => e.TempoInicial)
        .HasColumnType("timestamp with time zone")
        .HasDefaultValueSql("CURRENT_TIMESTAMP");

    entity.Property(e => e.TimestampCiclo)
        .HasColumnType("timestamp with time zone")
        .HasDefaultValueSql("CURRENT_TIMESTAMP");

    entity.HasOne(d => d.IdEstacaoNavigation)
        .WithMany(p => p.Ciclos)
        .HasConstraintName("ciclo_id_estacao_fkey");

    entity.HasOne(d => d.IdPecaNavigation)
        .WithMany(p => p.Ciclos)
        .HasConstraintName("ciclo_id_peca_fkey");
});


        modelBuilder.Entity<DeteccaoSensor>(entity =>
{
    entity.HasKey(e => e.IdDeteccao).HasName("deteccao_sensor_pkey");

    entity.Property(e => e.TimestampDeteccao)
        .HasColumnType("timestamp with time zone")
        .HasDefaultValueSql("CURRENT_TIMESTAMP");

    entity.HasOne(d => d.IdSensorNavigation)
        .WithMany(p => p.DeteccaoSensors)
        .HasConstraintName("deteccao_sensor_id_sensor_fkey");
});


        modelBuilder.Entity<Estacao>(entity =>
        {
            entity.HasKey(e => e.IdEstacao).HasName("estacao_pkey");
        });

       modelBuilder.Entity<EstacaoEstado>(entity =>
{
    entity.HasKey(e => e.IdEstado).HasName("estacao_estado_pkey");

    entity.Property(e => e.TimestampEstado)
        .HasColumnType("timestamp with time zone")
        .HasDefaultValueSql("CURRENT_TIMESTAMP");

    entity.HasOne(d => d.IdEstacaoNavigation)
        .WithMany(p => p.EstacaoEstados)
        .HasConstraintName("estacao_estado_id_estacao_fkey");
});

        modelBuilder.Entity<Peca>(entity =>
        {
            entity.HasKey(e => e.IdPeca).HasName("peca_pkey");
        });

        modelBuilder.Entity<Sensor>(entity =>
        {
            entity.HasKey(e => e.IdSensor).HasName("sensor_pkey");

            entity.HasOne(d => d.IdEstacaoNavigation).WithMany(p => p.Sensors).HasConstraintName("sensor_id_estacao_fkey");
        });

        modelBuilder.Entity<Login>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("login_pkey");
            entity.ToTable("login");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Nome).HasColumnName("nome").HasMaxLength(100).IsRequired();
            entity.Property(e => e.Senha).HasColumnName("senha").HasMaxLength(255).IsRequired();
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
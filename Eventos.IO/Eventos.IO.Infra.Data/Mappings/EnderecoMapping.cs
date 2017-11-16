using Eventos.IO.Domain.Eventos;
using Eventos.IO.Infra.Data.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Eventos.IO.Infra.Data.Mappings
{
    public class EnderecoMapping : EntityTypeConfiguration<Endereco>
    {
        public override void Map(EntityTypeBuilder<Endereco> builder)
        {
            builder.Property(e => e.Logradouro).HasColumnType("varchar(150)").IsRequired();
            builder.Property(e => e.Numero).HasColumnType("varchar(20)").IsRequired();
            builder.Property(e => e.Bairro).HasColumnType("varchar(50)").IsRequired();
            builder.Property(e => e.CEP).HasColumnType("varchar(8)").IsRequired();
            builder.Property(e => e.Complemento).HasColumnType("varchar(100)");
            builder.Property(e => e.Cidade).HasColumnType("varchar(100)").IsRequired();
            builder.Property(e => e.Estado).HasColumnType("varchar(100)").IsRequired();

            builder.HasOne(e => e.Evento).WithOne(c => c.Endereco).HasForeignKey<Endereco>(e => e.EventoId).IsRequired(false);
            builder.Ignore(e => e.ValidationResult);
            builder.Ignore(e => e.CascadeMode);

            builder.ToTable("Enderecos");
        }
    }
}

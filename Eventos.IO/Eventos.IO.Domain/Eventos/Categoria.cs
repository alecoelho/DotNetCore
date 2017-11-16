using System;
using Eventos.IO.Domain.Core.Models;
using System.Collections.Generic;

namespace Eventos.IO.Domain.Eventos
{
    public class Categoria : Entity<Categoria>
    {
        public Categoria(Guid id)
        {
            Id = id;
        }

        protected Categoria()
        {

        }
        
        public string Nome { get; private set; }
        public virtual ICollection<Evento> Eventos { get; set; }

        public override bool isValid()
        {
            return true;
        }
    }
}
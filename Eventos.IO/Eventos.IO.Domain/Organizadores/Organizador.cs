using System;
using Eventos.IO.Domain.Core.Models;
using Eventos.IO.Domain.Eventos;
using System.Collections.Generic;

namespace Eventos.IO.Domain.Organizadores
{
    public class Organizador : Entity<Organizador>
    {
        protected Organizador()
        {
        }

        public Organizador(Guid id, string nome, string cpf, string email)
        {
            Id = id;
            Nome = nome;
            CPF = cpf;
            Email = email;
        }

        public string Nome { get; set; }
        public string CPF { get; set; }
        public string Email { get; set; }
        public ICollection<Evento> Eventos { get; set; }

        public override bool isValid()
        {
            return true;
        }
    }
}
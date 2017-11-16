﻿using Eventos.IO.Domain.Core.Bus;
using Eventos.IO.Domain.Core.Notifications;
using Eventos.IO.Domain.Interfaces;
using FluentValidation.Results;
using System;

namespace Eventos.IO.Domain.CommandHandlers
{
    public abstract class CommandHandler
    {
        private readonly IUnitOfWork _uow;
        private readonly IBus _bus;
        private readonly IDomainNotificationHandler<DomainNotification> _notifications;
        private IUnitOfWork uow;
        private IBus bus;

        public CommandHandler(IUnitOfWork uow, IBus bus, IDomainNotificationHandler<DomainNotification> notifications)
        {
            _uow = uow;
            _bus = bus;
            _notifications = notifications;
        }

        protected void NotificarValidacoesErro(ValidationResult validationResult)
        {
            foreach (var error in validationResult.Errors)
                _bus.RaiseEvent(new DomainNotification(error.PropertyName, error.ErrorMessage));
        }

        protected bool Commit()
        {
            if (_notifications.HasNotifications()) return false;

            var commandResponde = _uow.Commit();
            if (commandResponde.Success) return true;

            _bus.RaiseEvent(new DomainNotification("Commit", "Ocorreu um erro ao salvar os dados no banco"));
            return false;
        }
    }
}

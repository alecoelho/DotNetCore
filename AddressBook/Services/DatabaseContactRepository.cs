using System;
using System.Collections.Generic;
using AddressBook.Models;
using AddressBook.Data;
using System.Linq;

namespace AddressBook.Services
{
    public class DatabaseContactRepository : IContactRepository
    {
        private readonly ApplicationDbContext _dbContext;
        public DatabaseContactRepository(ApplicationDbContext dbContext)
        {
                _dbContext = dbContext;
        }
        public void AddContact(Contact contact)
        {
            _dbContext.Contacts.Add(contact);
            _dbContext.SaveChanges();
        }

        public void DeleteContact(int id)
        {
            var contact = _dbContext.Contacts.FirstOrDefault(c => c.Id == id);
            _dbContext.Contacts.Remove(contact);
            _dbContext.SaveChanges();
        }

        public IEnumerable<Contact> GetAllContacts()
        {
            return _dbContext.Contacts;
        }

        public Contact GetContact(int id)
        {
            return _dbContext.Contacts.FirstOrDefault(c => c.Id == id);
        }

        public void UpdateContact(Contact contact)
        {
            _dbContext.Contacts.Update(contact);
            _dbContext.SaveChanges();
        }
    }
}
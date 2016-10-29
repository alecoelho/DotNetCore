using System;
using System.Collections.Generic;
using AddressBook.Models;
using System.Linq;

namespace AddressBook.Services
{
    public class InMemoryContactRepository : IContactRepository
    {
        private List<Contact> _contacts = new List<Contact>
        {
            new Contact { Id = 1, FirstName = "Jonas", LastName = "Kjellin", PhoneNumber = "123123123", EmailAddress = "jonas@jonas.com" },
            new Contact { Id = 2, FirstName = "John", LastName = "Doe", PhoneNumber = "234234234", EmailAddress = "john@doe.com" },
            new Contact { Id = 3, FirstName = "Jane", LastName = "Doe", PhoneNumber = "345345345", EmailAddress = "jane@doe.com" }
        };

        public void AddContact(Contact contact)
        {
            contact.Id = _contacts.Max(c => c.Id) + 1;
            _contacts.Add(contact);
        }

        public void DeleteContact(int id)
        {
            var contact = _contacts.Find(c => c.Id == id);
            _contacts.Remove(contact);
        }

        public IEnumerable<Contact> GetAllContacts()
        {
            return _contacts;
        }

        public Contact GetContact(int id)
        {
            return _contacts.FirstOrDefault(c => c.Id == id);
        }

        public void UpdateContact(Contact contact)
        {
            var con = _contacts.Find(c => c.Id == contact.Id);
            _contacts[_contacts.IndexOf(con)] = contact;
        }
    }
}
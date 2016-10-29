using System.Collections.Generic;
using AddressBook.Models;

namespace AddressBook.Services
{
    public interface IContactRepository
    {
        IEnumerable<Contact> GetAllContacts();
        void AddContact(Contact contact);
        Contact GetContact(int id);
        void UpdateContact(Contact contact);
        void DeleteContact(int id);
    }
}
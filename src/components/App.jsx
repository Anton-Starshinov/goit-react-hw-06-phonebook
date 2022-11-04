import { useState, useEffect } from 'react';
import Form from './Form/Form';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';
import { Container, TitlePhoneBook } from './App.styled';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = ({ name, number }) => {
    const addContact = { id: nanoid(3), name, number };
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === addContact.name.toLowerCase()
      )
    ) {
      return alert(`${addContact.name} is already in contacts`);
    }
    setContacts([addContact, ...contacts]);
  };

  const cheageFilter = evt => {
    setFilter(evt.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <Container>
      <TitlePhoneBook>Phonebook</TitlePhoneBook>
      <Form onSubmit={formSubmitHandler} />
      <TitlePhoneBook>Contacts</TitlePhoneBook>
      <Filter value={filter} onChange={cheageFilter} />
      <ContactList contacts={getVisibleContacts()} onDelete={deleteContact} />
    </Container>
  );
};

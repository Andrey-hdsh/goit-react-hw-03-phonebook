import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from '../FormContact/FormContact';
import { Filter } from '../FilterContact/Filter';
import { ContactList } from '../ListContact/ListContact';

export class SectionFormContacts extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleNewContact = ({ name, number }) => {
    const { contacts } = this.state;
    if (contacts.some(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return;
    } else if (contacts.some(contact => contact.number === number)) {
      alert(`${number} is already in contacts`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  handleFilterContacts = value => {
    this.setState({ filter: value.currentTarget.value });
  };

  handleDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const textContactsFilter = this.state.filter.toLowerCase();
    const filteredContacts = this.state.contacts.filter(contact => {
      return contact.name.toLowerCase().includes(textContactsFilter);
    });

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm
          hundleContact={this.handleNewContact}
          contacts={this.state.contacts}
        />
        <h2>Contacts</h2>
        <Filter
          value={this.state.filter}
          onChange={this.handleFilterContacts}
        />
        <ContactList
          filteredData={filteredContacts}
          deletedData={this.handleDeleteContact}
        />
      </div>
    );
  }
}

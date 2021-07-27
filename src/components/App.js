import { React, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import { v4 as uuid_v4 } from "uuid";
import ContactDetail from "./ContactDetail";
import api from "../api/Contacts";
import EditContact from "./EditContact";

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  // retrieve contacts from API
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  const addContactHandler = async (contact) => {

    contacts.forEach((user) => {
      if(user.email === contact.email){
        return;
      }
    })

    const request = { id: uuid_v4(), ...contact };

    const response = await api.post("/contacts", request);
    setContacts([...contacts, response.data]);
  };

  const editContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    if (response.data) {
      let { id } = response.data;

      const updatedStateContacts = contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      });

      setContacts([...updatedStateContacts]);
    }
  };

  const deleteContactHandler = async (id) => {
    const newContactsList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    // const contactToDelete = contacts.find((contact) => {
    //   return contact.id === id;
    // });

    const response = await api.delete(`/contacts/${id}`);

    if (response.data) {
      setContacts([newContactsList]);
    }

    setContacts(newContactsList);
  };

  useEffect(() => {
    // retrieveContacts()
    // const retrievedContacts = JSON.parse(
    //   localStorage.getItem(LOCAL_STORAGE_KEY)
    // );
    // if (retrievedContacts) {
    //   setContacts(retrievedContacts);
    // }
    const getAllContacts = async () => {
      const retrievedContacts = await retrieveContacts();
      if (retrievedContacts) {
        setContacts(retrievedContacts);
      }
    };
    getAllContacts();
  }, []);

  // useEffect(() => {
  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  // }, [contacts]);

  const searchHandler = async (searchTerm) => {
    setSearchTerm(searchTerm);

    if (searchTerm !== "") {
      const filteredContacts = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResult(filteredContacts);
    } else {
      setSearchResult(contacts);
    }
  };

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <ContactList
                contacts={ searchTerm.length < 1 ? contacts : searchResult}
                getContactId={deleteContactHandler}
                term={searchTerm}
                searchKeyword={searchHandler}
              />
            )}
          />
          <Route
            path="/add"
            render={(props) => (
              <AddContact addContactHandler={addContactHandler} />
            )}
          />
          <Route
            path="/edit/:id"
            render={(props) => (
              <EditContact editContactHandler={editContactHandler} />
            )}
          />

          <Route path="/contact/:id" component={ContactDetail}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

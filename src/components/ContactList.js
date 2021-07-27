import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";

const ContactList = (props) => {

  const deleteContactHandler = (id) => {
    props.getContactId(id);
  };


  const renderContactList = props.contacts.map((contact) => {

    return (
      <ContactCard
        key={contact.id}
        contact={contact}
        clickHandler={deleteContactHandler}
      />
    );
  });
  return (
    <div className="ui main">
      <h2>Contact List
       <Link to="/add"><button className="ui button blue right" style={{float:"right"}}>Add Contact</button></Link>
      </h2>
      <div className="ui search">
        <div className="ui icon input">
        <input type="text" placeholder="Search Contact" value={props.searchTerm} onChange={(e) => props.searchKeyword(e.target.value)} className="prompt"/>
        <i className="search icon" />
        </div>
      </div>
      <div className="ui celled list">{renderContactList.length > 0 ? renderContactList : "No Contacts List Available "}</div>
    </div>
  );
};

export default ContactList;

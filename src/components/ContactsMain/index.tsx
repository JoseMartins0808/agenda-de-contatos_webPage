


export default function ContactsMain({ contactsData, deleteContact }) {

    console.log(contactsData);

    return (
        <main className="contacts_main">
            <h3>Relação de contatos:</h3>
            <ul>
                {contactsData.map((contact, index) => (
                    <li key={contact.id}>
                        <h3>{contact.full_name}</h3>
                        <div className="contacts_email">
                            {contact.emails.map((email, i) => (
                                <p key={`cmail ${i}`}>{email.email}</p>
                            ))}
                        </div>
                        <div className="contacts_phone">
                            {contact.phones.map((phone, i) => (
                                <p key={`cphone ${i}`}>{phone.phone}</p>
                            ))}
                        </div>
                        <h3>Registrado em: {contact.registerDate}</h3>
                        <button id={`delete_${contact.id}`} onClick={() => deleteContact(contact.id)} >Excluir contato</button>
                    </li>
                ))}
            </ul>
        </main>
    )
};
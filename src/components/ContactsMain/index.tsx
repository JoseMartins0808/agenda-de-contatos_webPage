'use client';
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { UpdateContactModal } from "../UpdateContactModal";

export default function ContactsMain({ contactsData, deleteContact, setMain }) {

    const [modal, setModal] = useState(false);
    const [contactId, setContactId] = useState(null);

    console.log(contactId);

    function contactToUpdate() {
        const contactFound = contactsData.filter((contact) => contact.id === contactId);
        console.log(contactFound)
        return contactFound;
    }

    function handleModal(contactId) {
        setModal(true);
        setContactId(contactId);
    };

    return (
        <main className="contacts_main">
            <h3>Relação de contatos:</h3>
            {contactsData.length === 0 ? (
                <div>
                    <h3>Você não tem contatos registrados. Registre agora clicando <strong onClick={() => setMain('create')}>aqui!</strong></h3>

                </div>
            ) : (
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
                            <h4>Registrado em: {contact.registerDate}</h4>
                            <div>
                                <button id={`delete_${contact.id}`} onClick={() => deleteContact(contact.id)} >Excluir contato</button>
                                <button onClick={() => handleModal(contact.id)}>Atualizar contato</button>
                            </div>

                        </li>
                    ))}
                </ul>
            )}
            {modal && <UpdateContactModal contact={contactToUpdate()} setModal={setModal} />}
            <ToastContainer theme="dark" autoClose={1500} />
        </main>
    )
};
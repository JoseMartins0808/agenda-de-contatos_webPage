'use client';
import { useForm } from "react-hook-form";
import Input from "../Input";
import { application } from "../../services/api";
import { useContext } from "react";
import { DashboardContext } from "../../providers/DashboardProvider";

export function UpdateContactModal({ contact, setModal, allContacts }) {

    const { register, handleSubmit } = useForm();
    const { updateContact } = useContext(DashboardContext)

    async function handleUpdate(data) {

        let updateData = {
            full_name: '',
            emails: [],
            phones: []
        };

        if (data.full_name === '') {
            delete updateData.full_name;
        } else {
            updateData.full_name = data.full_name
        };

        if (data.email === '') {
            updateData.emails.push(contact[0].emails[0].email);
        } else {
            updateData.emails.push(data.email)
        };

        if (data.s_email !== '') {
            updateData.emails.push(data.s_email);
        };

        if (data.phone === '') {
            updateData.phones.push(contact[0].phones[0].phone);
        } else {
            updateData.phones.push(data.phone);
        };

        if (data.s_phone !== '') {
            updateData.phones.push(data.s_phone)
        };

        const contactId: string = contact[0].id
        console.log(allContacts[0].id)

        let newContactsArray = allContacts.filter((contact) => contact.id !== contactId);

        await updateContact(updateData, contactId, newContactsArray);
    };

    return (
        <dialog open>
            <div>
                <h3>Atualizar o Contato {contact[0].full_name}</h3>
                <form onSubmit={handleSubmit(handleUpdate)}>
                    <Input label={'Atualize o nome do contato '} placeholder={contact[0].full_name}
                        type={'text'} {...register('full_name')} />
                    <Input label={'Atualize o email do contato'} placeholder={contact[0].emails[0].email}
                        type={'text'} {...register('email')} />
                    <Input label={'Atualize o email opcional do contato'} placeholder={contact[0].emails[1]?.email || 'digite o email opcional do contato'}
                        type={'text'} {...register('s_email')} />
                    <Input label={'Atualize o telefone do contato'} placeholder={contact[0].phones[0].phone}
                        type={'text'} {...register('phone')} maxLength={11} />
                    <Input label={'Atualize o telefone opcional do contato'} placeholder={contact[0].phones[1]?.phone || 'digite o telefone opcional do contado'}
                        type={'text'} {...register('s_phone')} maxLength={11} />
                    <div>
                        <button type='submit'>Atualizar</button>
                        <button type='button' onClick={() => setModal(false)}>Cancelar</button>
                    </div>
                </form>
            </div>
        </dialog>
    )
};
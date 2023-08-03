'use client';
import { useForm } from "react-hook-form";
import Input from "../Input";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { application } from "../../services/api";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from "react";
import { DashboardContext } from "../../providers/DashboardProvider";

const createContactSchema = z.object({
    full_name: z.string().min(1, 'Necessário informar o nome do contato'),
    phone: z.string().min(1, 'Necessário informar o telefone do contato'),
    second_phone: z.string().optional(),
    email: z.string().min(1, 'Necessário informar o email do contato').email('Email inválido'),
    second_email: z.string().optional()
});

type tCreateContact = z.infer<typeof createContactSchema>;

export default function CreateContactMain() {

    let userToken = localStorage.getItem('@agendaDeContatos:token');
    userToken = JSON.parse(userToken);

    const { setUserContacts, userContacts } = useContext(DashboardContext);
    console.log(userContacts);
    const { register, handleSubmit, formState: { errors } } = useForm<tCreateContact>({ resolver: zodResolver(createContactSchema) });

    function handleData(data: tCreateContact) {
        let phones = [data.phone];
        let emails = [data.email];

        if (data.second_email === '') {
            delete data.second_email;
        } else {
            emails.push(data.second_email);
        };

        if (data.second_phone === '') {
            delete data.second_phone;
        } else {
            phones.push(data.second_phone);
        };

        const createContactData = {
            full_name: data.full_name,
            phones: phones,
            emails: emails
        };

        return createContactData;
    };


    async function createContact(payload) {

        payload = handleData(payload);

        console.log(payload);

        await application.post('/contacts', payload, { headers: { Authorization: 'Bearer ' + userToken } })
            .then((response) => {
                toast.success('Contato cadastrado com sucesso!');
                console.log(response);
                let array = userContacts;
                array.push(response.data)
                setUserContacts(array);
            }).catch((error) => console.log(error))
    };

    return (
        <main>
            <h2>Criar um novo contato</h2>
            <form onSubmit={handleSubmit(createContact)}>
                <Input label={'Nome do contato'} placeholder={'digite o nome do contato'}
                    type={'text'} {...register('full_name')} error={errors.full_name?.message} />
                <Input label={'Telefone do contato'} placeholder={'digite o telefone do contato'}
                    type={'text'} {...register('phone')} error={errors.phone?.message} />
                <Input label={'Telefone Opcional'} placeholder={'digite o telefone opcional'}
                    type={'text'} {...register('second_phone')} error={errors.second_phone?.message} />
                <Input label={'Email do contato'} placeholder={'digite o email do contato'}
                    type={'text'} {...register('email')} error={errors.email?.message} />
                <Input label={'Email opcional'} placeholder={'digite o email opcional'}
                    type={'text'} {...register('second_email')} error={errors.second_email?.message} />
                <button type={'submit'}>Cadastrar contato</button>
            </form>
            <ToastContainer theme="dark" autoClose={1500} />
        </main>
    )
};
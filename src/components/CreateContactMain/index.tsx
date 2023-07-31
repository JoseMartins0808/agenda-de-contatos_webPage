import { useForm } from "react-hook-form";
import Input from "../Input";
import { z } from 'zod';
import { type } from "os";
import { zodResolver } from "@hookform/resolvers/zod";


const createContactSchema = z.object({
    full_name: z.string().min(1, 'Necessário informar o nome do contato'),
    phone: z.string().min(1, 'Necessário informar o telefone do contato'),
    second_phone: z.string().optional(),
    email: z.string().min(1, 'Necessário informar o email do contato').email('Email inválido'),
    second_email: z.string().optional()
});

type tCreateContact = z.infer<typeof createContactSchema>;

export default function CreateContactMain() {

    const { register, handleSubmit, formState: { errors } } = useForm<tCreateContact>({ resolver: zodResolver(createContactSchema) });

    function showData(data) {
        console.log(data);
    };

    return (
        <main>
            <h2>Criar um novo contato</h2>
            <form onSubmit={handleSubmit(showData)}>
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
        </main>
    )
};
'use client';
import { z, } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '../Input';
import { useContext, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserContext } from '../../providers/UserProvider';



const registerFormSchema = z.object({
    username: z.string().min(1, 'Informe o nome cadastral para login'),
    full_name: z.string().min(1, 'Informe seu nome completo'),
    password: z.string().min(1, 'Informe sua senha')
        .regex(/[a-z]/, 'Necessário ao menos uma letra minúscula')
        .regex(/(\d)/, 'Necessário ao menos um número')
        .regex(/[A-Z]/, 'Necessário ao menos uma letra maiúscula')
        .regex(/(\W|_)/, 'Necessário ao menos um caracter especial')
        .regex(/.{8,}/, 'Necessário ao menos oito caracteres'),
    confirmPassword: z.string().min(1, 'Confirme sua senha'),
    email: z.string().min(1, 'Informe seu e-mail').email({ message: 'Insira um email válido' }),
    second_email: z.string().optional(),
    phone: z.string().length(11, 'Telefone inválido. Somente números (xx-xxxxx-xxxx)'),
    second_phone: z.string().optional()
}).refine((payload) => payload.password === payload.confirmPassword, {
    message: 'A confirmação deve ser idêntica à senha informada',
    path: ['confirmPassword']
});

type tRegisterForm = z.infer<typeof registerFormSchema>;


export default function RegisterForm() {

    const { register, handleSubmit, formState: { errors } } = useForm<tRegisterForm>({ resolver: zodResolver(registerFormSchema) });

    const { createUser, toggleConfirmVisual, togglePassVisual, confirmIcon,
        hideConfirm,
        hidePassword,
        passIcon } = useContext(UserContext);

    return (
        <form onSubmit={handleSubmit(createUser)}>
            <Input label={'Nome de cadastro'} placeholder={'digite seu nome cadastral'}
                type={'text'} {...register('username')}
                error={errors.username?.message || undefined}
            />
            <Input label={'Nome completo'} placeholder={'digite seu nome completo'}
                type={'text'} {...register('full_name')}
                error={errors.full_name?.message}
            />
            <Input label={'Senha'} placeholder={'digite sua senha'}
                type={hidePassword} {...register('password')}
                error={errors.password?.message}
            />
            <FontAwesomeIcon icon={passIcon} onClick={togglePassVisual} />
            <Input label={'Confirmar senha'} placeholder={'confirme sua senha'}
                type={hideConfirm} {...register('confirmPassword')}
                error={errors.confirmPassword?.message}
            />
            <FontAwesomeIcon icon={confirmIcon} onClick={toggleConfirmVisual} />
            <Input label={'E-mail'} placeholder={'digite seu e-mail'}
                type={'text'} {...register('email')}
                error={errors.email?.message}
            />
            <Input label={'E-mail opcional'} placeholder={'caso queira, digite seu e-mail opcional'}
                type={'text'} {...register('second_email')}
                error={errors.second_email?.message}
            />
            <Input label={'Telefone'} placeholder={'digite seu telefone'}
                type={'text'} {...register('phone')}
                error={errors.phone?.message}
            />
            <Input label={'Telefone opcional'} placeholder={'caso queira, digite seu telefone opcional'}
                type={'text'} {...register('second_phone')}
                error={errors.second_phone?.message}
            />
            <button type='submit' disabled={false} >Cadastrar</button>                       {/*registerButton*/}
            <ToastContainer theme='dark' autoClose={1500} />
        </form>
    )

};
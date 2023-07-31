'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Input from '../Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { application } from '../../services/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const loginFormSchema = z.object({
    username: z.string().min(1, 'Informe seu nome cadastral'),
    password: z.string().min(1, 'Informe sua senha')
});

type tLoginForm = z.infer<typeof loginFormSchema>;



export default function LoginForm() {

    const [hidePassword, setHidePassword] = useState<string>('password');
    const [passIcon, setPassIcon] = useState(faEye);
    const { register, handleSubmit, formState: { errors } } = useForm<tLoginForm>({ resolver: zodResolver(loginFormSchema) });
    const navigate = useRouter();

    function passIconToggle() {
        if (hidePassword === 'password') {
            setHidePassword('text');
            setPassIcon(faEyeSlash);
        } else {
            setHidePassword('password');
            setPassIcon(faEye);
        };
    };

    async function login(payload: any) {
        try {
            await application.post('login', payload)
                .then((response) => {
                    console.log(response.data);
                    toast.success('Login realizado com sucesso! Redirecionando...');
                    localStorage.setItem('@agendaDeContatos:token', JSON.stringify(response.data.token));
                    localStorage.setItem('@agendaDeContatos:userId', JSON.stringify(response.data.user.id));
                    setTimeout(() => {
                        navigate.push('/dashboard');
                    }, 3100);
                })
        } catch (error) {
            toast.error('Verifique seu nome cadastral e senha');
        };
    };

    return (
        <form onSubmit={handleSubmit(login)}>
            <Input label={'Nome de cadastro'} placeholder={'digite seu nome cadastral'}
                type={'text'} {...register('username')}
                error={errors.username?.message} />
            <Input label={'Senha'} placeholder={'digite sua senha'}
                type={hidePassword} {...register('password')}
                error={errors.password?.message} />
            <FontAwesomeIcon icon={passIcon} onClick={passIconToggle}></FontAwesomeIcon>
            <button type='submit'>Login</button>
            <ToastContainer theme='dark' autoClose={1500}></ToastContainer>
        </form>
    )
};
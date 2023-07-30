'use client';
import { ReactNode, createContext, useState } from 'react';
import { faEyeSlash, faEye, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { application } from '../../services/api';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';


interface iUserContextProps {
    createUser: (data: any) => void;
    togglePassVisual: () => void;
    toggleConfirmVisual: () => void;
    hidePassword: string;
    hideConfirm: string;
    passIcon: IconDefinition
    confirmIcon: IconDefinition
}

export const UserContext = createContext({} as iUserContextProps);

interface iUserProviderProps {
    children: ReactNode;
}

export const UserProvider = ({ children }: iUserProviderProps) => {

    const [hidePassword, setHidePassword] = useState<string>('password');
    const [hideConfirm, setHideConfirm] = useState<string>('password');
    const [passIcon, setPassIcon] = useState(faEye);
    const [confirmIcon, setConfirmIcon] = useState(faEye);
    const navigate = useRouter();

    function rectifyCreateUserData(data: any) {
        let payload = data;
        let phonesArray = [payload.phone];
        let emailsArray = [payload.email];

        if (payload.second_phone !== '') phonesArray.push(payload.second_phone);

        if (payload.second_email !== '') emailsArray.push(payload.second_email);

        const createUserData = {
            username: payload.username,
            full_name: payload.full_name,
            emails: emailsArray,
            phones: phonesArray,
            password: payload.password
        };

        return createUserData;
    };

    async function createUser(payload: any) {
        const data = rectifyCreateUserData(payload);
        try {
            await application.post('users', data)
                .then((response) => {
                    toast.success(`Cadastro realizado com sucesso! Redirecionando para o login...`);
                    setTimeout(() => {
                        navigate.push('/');
                    }, 3100);
                })
        } catch (error) {
            console.log(error);
        };
    };

    function togglePassVisual() {
        if (hidePassword === 'password') {
            setHidePassword('text');
            setPassIcon(faEyeSlash);
        } else {
            setHidePassword('password');
            setPassIcon(faEye);
        };
    };

    function toggleConfirmVisual() {
        if (hideConfirm === 'password') {
            setHideConfirm('text');
            setConfirmIcon(faEyeSlash);
        } else {
            setHideConfirm('password');
            setConfirmIcon(faEye);
        };
    };

    return (
        <UserContext.Provider value={{
            createUser,
            toggleConfirmVisual,
            togglePassVisual,
            confirmIcon,
            hideConfirm,
            hidePassword,
            passIcon
        }}>
            {children}
        </UserContext.Provider>
    )
};
'use client';
import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from 'react';
import { application } from '../../services/api';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface iDashboardContextProps {
    getUserData: () => void;
    getContactsData: () => void;
    userData: any;
    setUserData: Dispatch<SetStateAction<{}>>;
    userContacts: any;
    setUserContacts: Dispatch<SetStateAction<{}>>;
    loading: boolean;
    loadingContacts: boolean;
    deleteContact: (contactId: string) => void;
    updateUser: (userId: string, data: any) => void;
    updateContact: (data: any, contactId: string, newArray: any[]) => void;
};

export const DashboardContext = createContext({} as iDashboardContextProps);

interface iDashboardProviderProps {
    children: ReactNode;
};

export const DashboardProvider = ({ children }: iDashboardProviderProps) => {


    const [userData, setUserData] = useState<any>({});
    const [userContacts, setUserContacts] = useState([]);
    let userToken = '';
    let userId = '';
    const [loading, setLoading] = useState(true);
    const [loadingContacts, setLoadingContacts] = useState(true);
    const navigate = useRouter();

    if (typeof window !== 'undefined') {
        userToken = JSON.parse(localStorage.getItem('@agendaDeContatos:token'));
        userId = JSON.parse(localStorage.getItem('@agendaDeContatos:userId'));
    };

    useEffect(() => {
        userToken = JSON.parse(localStorage.getItem('@agendaDeContatos:token'));
        userId = JSON.parse(localStorage.getItem('@agendaDeContatos:userId'));
    }, []);

    async function getUserData() {
        await application.get(`users/${userId}`, { headers: { Authorization: 'Bearer ' + userToken } })
            .then((response) => {
                setUserData(response.data);
                setLoading(false);
            }).catch((error) => {
                console.log(error);
                toast.error('Sessão expirada. Favor efetuar novamente o login.');
                navigate.push('/');
            })
    };

    async function getContactsData() {
        await application.get(`contacts`, { headers: { Authorization: 'Bearer ' + userToken } })
            .then((response) => {
                setUserContacts(response.data);
                setLoadingContacts(false);
            }).catch((error) => console.log(error));
    };

    async function deleteContact(contactId: string) {
        const newContactsArray = userContacts.filter((contact) => contactId !== contact.id);
        setUserContacts(newContactsArray);

        await application.delete(`contacts/${contactId}`, { headers: { Authorization: 'Bearer ' + userToken } })
            .then(() => {
                toast.success('Contato removido com sucesso!')
            }).catch((error) => console.log(error));
    };

    function rectifyUpdateData(payload) {
        let updateUserData = {
            username: '',
            full_name: '',
            password: '',
            phones: [],
            emails: []
        };

        if (payload.email || payload.second_email) {
            if (payload.email) { updateUserData.emails.push(payload.email) };
            if (payload.second_email) { updateUserData.emails.push(payload.second_email) };
        } else {
            updateUserData.emails.push(userData.emails[0].email);
        };

        if (payload.phone || payload.second_phone) {
            if (payload.phone) { updateUserData.phones.push(payload.phone) };
            if (payload.second_phone) { updateUserData.phones.push(payload.second_phone) };
        } else {
            updateUserData.phones.push(userData.phones[0].phone);
        };

        if (!payload.username) { delete updateUserData.username }
        else { updateUserData.username = payload.username };

        if (!payload.full_name) { delete updateUserData.full_name }
        else { updateUserData.full_name = payload.full_name };

        if (!payload.password) { delete updateUserData.password }
        else { updateUserData.password = payload.password };

        return updateUserData;
    };

    async function updateUser(data: any) {

        data = rectifyUpdateData(data);

        if (Object.keys(data).length === 0) return toast.error('Nada foi atualizado.');

        await application.patch(`users/${userId}`, data, { headers: { Authorization: 'Bearer ' + userToken } })
            .then((response) => {
                setUserData(response.data);
                toast.success('Cadastro atualizado!')
            }).catch((error) => toast.error('Algo deu errado. Por favor, tente novamente'));
    };

    async function updateContact(data: any, contactId: string, newArray: any[]) {

        await application.patch(`contacts/${contactId}`, data, { headers: { Authorization: 'Bearer ' + userToken } })
            .then((response) => {
                newArray.push(response.data);
                setUserContacts(newArray);
                toast.success('Contato atualizado!')
            }).catch((error) => {
                console.log(error);
                toast.error('Algo deu errado. Tente novamente.');
            });
    };

    return (
        <DashboardContext.Provider value={{
            getUserData,
            getContactsData,
            userData,
            setUserData,
            userContacts,
            setUserContacts,
            loading,
            loadingContacts,
            deleteContact,
            updateUser,
            updateContact
        }}>
            {children}
        </DashboardContext.Provider>
    )
};

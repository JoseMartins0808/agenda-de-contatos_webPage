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
};

export const DashboardContext = createContext({} as iDashboardContextProps);

interface iDashboardProviderProps {
    children: ReactNode;
};

export const DashboardProvider = ({ children }: iDashboardProviderProps) => {


    const [userData, setUserData] = useState({});
    const [userContacts, setUserContacts] = useState([]);
    let userToken = '';
    let userId = '';
    const [loading, setLoading] = useState(true);
    const [loadingContacts, setLoadingContacts] = useState(true);

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
            }).catch((error) => console.log(error))
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
            deleteContact
        }}>
            {children}
        </DashboardContext.Provider>
    )
};

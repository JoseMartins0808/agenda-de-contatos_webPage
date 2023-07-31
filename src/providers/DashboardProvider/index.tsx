'use client';
import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from 'react';
import { application } from '../../services/api';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface iDashboardContextProps {
    token: string;
    setToken: Dispatch<SetStateAction<string>>;
    getUserData: () => void;
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


    const [token, setToken] = useState<string>('');
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
        getUserData();
        getContactsData();
        userToken = JSON.parse(localStorage.getItem('@agendaDeContatos:token'));
        userId = JSON.parse(localStorage.getItem('@agendaDeContatos:userId'));
    }, [])

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
    };


    return (
        <DashboardContext.Provider value={{
            token,
            setToken,
            getUserData,
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

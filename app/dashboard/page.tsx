'use client';
import { useState, useContext, useEffect, useSyncExternalStore } from 'react';
import { DashboardContext } from '../../src/providers/DashboardProvider';
import ContactsMain from '../../src/components/ContactsMain';
import CreateContactMain from '../../src/components/CreateContactMain';
import { useRouter } from 'next/navigation';
import ManageAccountMain from '../../src/components/ManageAccountMain';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'

export default function DashboardPage() {

    const { getUserData, getContactsData, userData, setUserData, setUserContacts, loading, loadingContacts, deleteContact,
        userContacts, updateUser } = useContext(DashboardContext);

    const [main, setMain] = useState('contacts');
    const navigate = useRouter();

    useEffect(() => {
        getUserData();
        getContactsData();
    }, [])

    function renderOptionalMain() {
        if (main === 'contacts') {
            return <ContactsMain contactsData={userContacts} deleteContact={deleteContact} setMain={setMain} />;
        } else if (main === 'manage') {
            return <ManageAccountMain userData={userData} updateUser={updateUser} />
        } else if (main === 'create') {
            return <CreateContactMain />
        };
    };

    function logOut() {
        localStorage.removeItem('@agendaDeContatos:token');
        localStorage.removeItem('@agendaDeContatos:userId');
        navigate.push('/');
    };

    return (
        <>
            <header>
                <div className='user_header'>
                    {loading ? <p>carregando...</p> : <>
                        <img></img>
                        <h3>{userData.full_name}</h3>
                        {userData.emails.map((email, index) => <p key={'u_mail' + index}>{email.email}</p>)}
                    </>}
                </div>
                <div className='options_header'>
                    <button type='button' onClick={() => setMain('contacts')}>Meus contatos</button>
                    <button type='button' onClick={() => setMain('manage')}>Gerenciar perfil</button>
                    <button type='button' onClick={() => setMain('create')}>Criar novo contato</button>
                </div>
                <div className='logout_header'>
                    <button onClick={() => logOut()}>Sair da conta</button>
                </div>
            </header>
            {loadingContacts ? <p>carregando</p> : renderOptionalMain()}
            <ToastContainer autoClose={1500} theme='dark' />
        </>
    );
}

'use client';
import { useState, useContext, useEffect } from 'react';
import { DashboardContext } from '../../src/providers/DashboardProvider';
import ContactsMain from '../../src/components/ContactsMain';
import CreateContactMain from '../../src/components/CreateContactMain';


export default function DashboardPage() {
    const { getUserData, userData, setUserData, loading, loadingContacts, deleteContact,
        userContacts } = useContext(DashboardContext);
    const [main, setMain] = useState('contacts');

    function renderOptionalMain() {
        if (main === 'contacts') {
            return <ContactsMain contactsData={userContacts} deleteContact={deleteContact} />;
        } else if (main === 'update') {
            return <p>atualizar Perfil</p>
        } else if (main === 'create') {
            return <CreateContactMain />
        } else if (main === 'delete') {
            return <p>deletar perfil</p>
        };
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
                    <button type='button' onClick={() => setMain('update')}>Atualizar perfil</button>
                    <button type='button' onClick={() => setMain('create')}>Criar contatos</button>
                    <button type='button' onClick={() => setMain('delete')}>Deletar minha conta</button>
                </div>
                <div className='logout_header'>
                    <button>Sair da conta</button>
                </div>
            </header>
            <main>
                {loadingContacts ? <p>carregando</p> : renderOptionalMain()}
            </main>
        </>
    );
}
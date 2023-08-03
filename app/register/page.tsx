'use client';
import Link from 'next/link';
import RegisterForm from '../../src/components/RegisterForm';
import styles from './page.module.css';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export default function RegisterPage() {

    return (
        <main>
            <h1 className={styles.dash}>Veja como cadastrar na Agenda rapi 10 é fácil!</h1>
            <RegisterForm></RegisterForm>
            <h3>Voltar ao <strong><Link href={'/'}>login</Link></strong></h3>
        </main>
    )
};
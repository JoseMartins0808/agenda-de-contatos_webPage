import LoginForm from '../src/components/LoginForm';
import styles from './page.module.css';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false


export default function LoginPage() {
  return (
    <main className={styles.main}>
      <h1>Faça seu login na Agenda Rapi 10!</h1>
      <LoginForm></LoginForm>
    </main>
  )
}

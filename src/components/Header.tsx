import { useSession } from 'next-auth/react';
import Image from 'next/image';
import styles from '../styles/components/header.module.scss'
import { MdLogout, MdAdminPanelSettings } from 'react-icons/md';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

type Props = {
  title?: string;
}

const Header: React.FC<Props> = ({ title = 'Turma Fit' }) => {
  const { data: session } = useSession();

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <h1>{ title }</h1>
        <div className={styles.right}>
          { session && (
            <>
                <div className={styles.pictureAndName}>
                {session.user.image && <Image 
                  src={session.user?.image || ''} 
                  alt='Foto de perfil' 
                  height={40}
                  width={40}
                />}
                {session.user.name && <span>Olá, {session.user?.name}!</span>}
              </div>
              {
                session.user.isPersonal && (
                  <Link href='/personal/students'>
                    <a className={styles.button}>
                      <MdAdminPanelSettings />
                    </a>
                  </Link>
                )
              }
              <button className={styles.button} onClick={() => signOut()} >
                <MdLogout />
              </button>
            </>
          ) }

        </div>
      </div>
    </header>
  )
}

export default Header;
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import styles from '../styles/components/header.module.scss'
import { MdLogout, MdAdminPanelSettings } from 'react-icons/md';
import { signOut } from 'next-auth/react';
import useSWR from 'swr';
import { getUser } from '../lib/axios';
import { useEffect } from 'react';
import Link from 'next/link';

type Props = {
  title?: string;
}

const Header: React.FC<Props> = ({ title = 'Turma Fit' }) => {
  const { data: session } = useSession();

  const { data: user, mutate } = useSWR('/api/user/', getUser(session?.user?.email || ''));

  useEffect(() => {
    mutate();
  }, [session?.user?.email, mutate])

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <h1>{ title }</h1>
        <div className={styles.right}>
          { session && (
            <>
              <div className={styles.pictureAndName}>
                <Image 
                  src={session.user?.image || ''} 
                  alt='Foto de perfil' 
                  height={40}
                  width={40}
                />
                <span>Olá, {session.user?.name}!</span>
              </div>
              {
                user?.personal && (
                  <Link href='/personal/admin'>
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
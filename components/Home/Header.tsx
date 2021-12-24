import { useSession } from 'next-auth/react';
import Image from 'next/image';
import styles from '../../styles/components/header.module.scss'
import { MdLogout } from 'react-icons/md';
import { signOut } from 'next-auth/react';

const Header: React.FC = () => {
  const { data } = useSession();

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <h1>Turma Fit</h1>
        { data && (
          <div className={styles.userInfo}>
            <Image 
              src={data.user?.image || ''} 
              alt='Foto de perfil' 
              height={40}
              width={40}
            />
            <span>Olá, {data.user?.name}!</span>
            <button onClick={() => signOut()} >
              <MdLogout />
            </button>
          </div>
        ) }
      </div>
    </header>
  )
}

export default Header;
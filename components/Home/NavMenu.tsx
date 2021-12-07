import Link from 'next/link';
import styles from '../../styles/pages/home.module.scss';

const NavMenu: React.FC = () => {
  return (
    <nav>
      <Link href="/next">
        <a className={styles.bigButton}>Próximo Treino</a>
      </Link>
      <Link href="/update">
        <a className={styles.bigButton}>Atualizar Medidas</a>
      </Link>
      <div>
        <Link href="/trainings">
          <a className={styles.smallButton}>Treinos</a>
        </Link>
        <Link href="/history">
          <a className={styles.smallButton}>Histórico</a>
        </Link>
      </div>
    </nav>
  )
}

export default NavMenu;
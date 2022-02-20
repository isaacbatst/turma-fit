import styles from '../../styles/components/loadingPage.module.scss';

const LoadingPage: React.FC = () => (
  <div className={styles.wrapper}>
    <div className={`spinner-border ${styles.customSpinner}`} role="status">
    </div>
  </div>
)

export default LoadingPage;
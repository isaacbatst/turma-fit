import LoginPage, { getLoginPageServerSideProps } from '@application/pages/LoginPage/LoginPage';
import type { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = getLoginPageServerSideProps

export default LoginPage;
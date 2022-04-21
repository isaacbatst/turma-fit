import HomePage, { getHomePageServerSideProps } from '@application/pages/HomePage/HomePage';
import type { GetServerSideProps, NextPage } from 'next';

const Home: NextPage = HomePage;

export const getServerSideProps: GetServerSideProps = getHomePageServerSideProps

export default Home;
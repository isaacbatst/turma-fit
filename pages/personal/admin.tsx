import Header from "../../components/Header";
import Layout from "../../components/Layout";
import { NextPageWithAuth } from "../../types/page";

const PersonalAdmin: NextPageWithAuth = () => {
  return (
    <Layout>
      <Header />
      <div>Admin</div>
    </Layout>
  )
}

PersonalAdmin.auth = true;

export default PersonalAdmin;
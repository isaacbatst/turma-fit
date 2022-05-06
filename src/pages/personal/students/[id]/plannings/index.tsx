import { useRouter } from "next/router";
import Layout from "../../../../../application/components/Layout";

const Plannings: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
      <section>
        Treinos de {id}
      </section>
    </Layout>
  )
}

export default Plannings;
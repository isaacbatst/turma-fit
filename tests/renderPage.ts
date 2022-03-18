import { getPage } from "next-page-tester";
import { act } from "react-dom/test-utils";

const renderPage = async (route: string) => await act(async () => {
  const { render } = await getPage({
    route,
    wrappers: 'tests/wrappers.tsx'
  })
  render();
});

export default renderPage;
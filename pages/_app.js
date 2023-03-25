import "../styles/globals.css";
import "@/prismjs/themes/prism-tomorrow.css";
import Header from "components/layouts/Header";
import MasterLayout from "components/layouts/MasterLayout";

function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout =
    Component.getLayout || ((page) => <MasterLayout>{page}</MasterLayout>);

  return getLayout(<Component {...pageProps} />);
}

export default MyApp;

//file needed for bootstrap to load in  next.js project
import "bootstrap/dist/css/bootstrap.min.css";

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

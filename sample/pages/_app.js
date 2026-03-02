
import 'swiper/css';
import '../styles/globals.css';
import 'remixicon/fonts/remixicon.css';
import "animate.css";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import Layout from "../src/components/Layout/Layout";
import Header from "../src/components/Header/Header";
import Footer from "../src/components/Footer/Footer";
import { Fragment, useEffect } from "react";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


function MyApp({ Component, pageProps }) {
    useEffect(() => {
      AOS.init();
    }, []);
  return <Fragment>
          <Header/>
          <Layout>
            <Component {...pageProps} />
        </Layout>
        <Footer/>
        </Fragment>
  
}

export default MyApp

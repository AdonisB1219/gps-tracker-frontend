import { lazy } from "react";

import IntroContent from "../content/IntroContent.json";
import MiddleBlockContent from "../content/MiddleBlockContent.json";
import AboutContent from "../content/AboutContent.json";
import MissionContent from "../content/MissionContent.json";
import ProductContent from "../content/ProductContent.json";
import ContactContent from "../content/ContactContent.json";
import "./styles.css"
import Header from "../components/Header";
import Footer from "../components/Footer";

const Contact = lazy(() => import("../components/ContactForm"));
const MiddleBlock = lazy(() => import("../components/MiddleBlock"));
const Container = lazy(() => import("../components/Container"));
const ScrollToTop = lazy(() => import("../components/ScrollToTop"));
const ContentBlock = lazy(() => import("../components/ContentBlock"));

const Home = () => {
  return (
    <>
    <Header />
    <Container>
      <ScrollToTop />
      <ContentBlock
        direction="right"
        title={IntroContent.title}
        content={IntroContent.text}
        button={IntroContent.button}
        icon="collage.jpeg"
        id="intro"
      />
      <MiddleBlock
        title={MiddleBlockContent.title}
        content={MiddleBlockContent.text}
        button={MiddleBlockContent.button}
      />
      <ContentBlock
        direction="left"
        title={AboutContent.title}
        content={AboutContent.text}
        section={AboutContent.section}
        icon="satellital.jpeg"
        id="about"
      />
      <ContentBlock
        direction="right"
        title={MissionContent.title}
        content={MissionContent.text}
        icon="map.jpeg"
        id="mission"
      />
      <ContentBlock
        direction="left"
        title={ProductContent.title}
        content={ProductContent.text}
        icon="satellital.jpeg"
        id="product"
      />
      <Contact
        title={ContactContent.title}
        content={ContactContent.text}
        id="contact"
      />
    </Container>
    <Footer />

    </>
  );
};

export default Home;
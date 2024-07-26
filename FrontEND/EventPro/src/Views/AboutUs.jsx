import Footer from "../components/Footer";
import Header from "../components/Header/Header";
import About from "../components/About";
import AnimatedPage from "../components/Animation/AnimatedPage";
import ScrollToTopButton from "../components/Animation/ScrollToTopButton";

function AboutUs() {

  return (
    <>
      <Header />
      <AnimatedPage>

        <About />

      </AnimatedPage>
      <Footer />
      <ScrollToTopButton/>
    </>
  );
}

export default AboutUs;

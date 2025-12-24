import Footer from "./components/Footer";
import Header from "./components/Header";
import "./index.css";
import Faq from "./sections/Faq";
import Hero from "./sections/Hero";
import Services from "./sections/Services";
import Who from "./sections/Who";

function App() {
  return (
    <>
      <div style={{ backgroundColor: "var(--color-bg)", position: "relative" }}>
        <Header />
        <Hero />
        <img
          src="/images/hero-right-ellipse.png"
          alt="hero-right-ellipse"
          className="absolute -top-30 -right-30 lg:-top-100 lg:-right-120 z-0"
        />
        <Services />
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
          officiis nemo dolore saepe tempora blanditiis sapiente libero aut
          dolor a voluptates quas ex provident eius, deserunt voluptas odio
          quasi ratione.
        </div>
        <Who />
        <Faq />
        <Footer />
      </div>
    </>
  );
}

export default App;

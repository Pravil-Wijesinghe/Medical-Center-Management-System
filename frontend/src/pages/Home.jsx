import { useRef } from 'react';
import { Paper } from "@mui/material";
import Hero from "../components/home/Hero";
import NavBar from "../layouts/NavBar";
import Footer from "../layouts/Footer";
import AboutUs from "../components/home/AboutUs";
import MeetDoctors from "../components/home/MeetDoctors";
import Services from "../components/home/Services";
import ContactUs from "../components/home/ContactUs";
import Ads from "../components/home/Ads";
import HomeFooter from "../components/home/Footer";

const Home = () => {
  const heroRef = useRef(null);
  const aboutUsRef = useRef(null);
  const meetDoctorsRef = useRef(null);
  const servicesRef = useRef(null);
  const contactUsRef = useRef(null);

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Paper sx={{ width: '100%', position: 'relative' }}>
      <NavBar
        scrollToHero={() => scrollToSection(heroRef)}
        scrollToAboutUs={() => scrollToSection(aboutUsRef)}
        scrollToMeetDoctors={() => scrollToSection(meetDoctorsRef)}
        scrollToServices={() => scrollToSection(servicesRef)}
        scrollToContactUs={() => scrollToSection(contactUsRef)}
      />
      <Paper sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.paper' }}>
        <main>
          <div ref={heroRef}><Hero scrollToMeetDoctors={() => scrollToSection(meetDoctorsRef)} /></div>
          <div ref={aboutUsRef}><AboutUs /></div>
          <div ref={meetDoctorsRef}><MeetDoctors /></div>
          <div ref={servicesRef}><Services /></div>
          <Ads />
          <div ref={contactUsRef}><ContactUs /></div>
          <HomeFooter />
        </main>
      </Paper>
      <Footer
        scrollToHero={() => scrollToSection(heroRef)}
        scrollToAboutUs={() => scrollToSection(aboutUsRef)}
        scrollToMeetDoctors={() => scrollToSection(meetDoctorsRef)}
        scrollToServices={() => scrollToSection(servicesRef)}
        scrollToContactUs={() => scrollToSection(contactUsRef)}
      />
    </Paper>
  );
};

export default Home;

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
  return (
    <Paper sx={{ width: '100%', position: 'relative' }}>
      <NavBar  position='relative' sx={{ width: '100%', top: 0, left: 0 }} />
      <Paper sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.paper' }}>
        <main>
          <Hero />
          <AboutUs />
          <MeetDoctors />
          <Services />
          <Ads />
          <ContactUs />
          <HomeFooter/>
        </main>
      </Paper>
      <Footer />
    </Paper>
  );
};

export default Home;

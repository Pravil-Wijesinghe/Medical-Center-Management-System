import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./layouts/NavBar";
import Footer from "./layouts/Footer";
import { Paper } from "@mui/material";

function App() {
  return (
    <BrowserRouter>
      <Paper sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.paper' }}>
        <Navbar />
        <main>
          <AppRoutes />
        </main>
        <Footer />
      </Paper>
    </BrowserRouter>
  );
}

export default App;

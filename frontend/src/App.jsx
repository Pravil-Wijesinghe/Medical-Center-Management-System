import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./layouts/NavBar";
import Footer from "./layouts/Footer";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <main>
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

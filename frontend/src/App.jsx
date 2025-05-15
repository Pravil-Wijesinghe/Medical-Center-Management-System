import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { Paper } from "@mui/material";

function App() {
  return (
    <BrowserRouter>
      <Paper sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.paper' }}>
        <main>
          <AppRoutes />
        </main>
      </Paper>
    </BrowserRouter>
  );
}

export default App;

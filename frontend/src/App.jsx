// import { BrowserRouter } from "react-router-dom";
// import AppRoutes from "./routes/AppRoutes";
// import { Paper } from "@mui/material";

// function App() {
//   return (
//     <BrowserRouter>
//       <Paper sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.paper' }}>
//         <main>
//           <AppRoutes />
//         </main>
//       </Paper>
//     </BrowserRouter>
//   );
// }

// export default App;

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { Paper } from "@mui/material";
import { initializeAuth } from './store/slices/authSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize auth state from localStorage when app starts
    dispatch(initializeAuth());
  }, [dispatch]);

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
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import DashBoardPage from "./pages/DashboardPage";
import LogMealPage from "./pages/LogMealPage";
import NoPage from "./pages/NoPage";
import ProtectedRoute from "./components/ProtectedRoute";

import MealTable from "./components/mealHistory/MealTable";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MealTable />} />
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/signup" element={<SignUpPage />}/>
        <Route path="/dashboard" element={<ProtectedRoute> <DashBoardPage /> </ProtectedRoute> }/>
        <Route path="/logmeal" element={<ProtectedRoute> <LogMealPage /> </ProtectedRoute> }/>
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

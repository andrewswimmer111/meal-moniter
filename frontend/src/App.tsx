import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import DashBoardPage from "./pages/DashboardPage";
import LogMealPage from "./pages/LogMealPage";
import MealTablePage from "./pages/MealTablePage";
import NoPage from "./pages/NoPage";
import ProtectedRoute from "./components/ProtectedRoute";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login"element={<LoginPage /> }/>
        <Route path="/signup" element={<SignUpPage />}/>
        <Route path="/dashboard" element={<ProtectedRoute> <DashBoardPage /> </ProtectedRoute> }/>
        <Route path="/logmeal" element={<ProtectedRoute> <LogMealPage /> </ProtectedRoute> }/>
        <Route path="/history" element={<ProtectedRoute> <MealTablePage /> </ProtectedRoute> }/>

        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

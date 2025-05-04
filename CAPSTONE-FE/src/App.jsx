import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./components/HomePage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SurveyPage from "./components/survey/SurveyPage";
import CreateSurveyPage from "./components/survey/CreateSurveyPage";
import PrivateRoute from "./components/PrivateRoute";
import RegisterPage from "./components/account/RegisterPage";
import LoginPage from "./components/account/LoginPage";
import ResultsPage from "./components/survey/ResultsPage";
import TopNavbar from "./components/TopNavbar";

function App() {
  return (
    <BrowserRouter>
      <TopNavbar />
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />

        <Route element={<PrivateRoute />}>
          <Route path="/Survey" element={<SurveyPage />} />
          <Route path="/CreateSurvey" element={<CreateSurveyPage />} />
          <Route path="/SurveyResults" element={<ResultsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

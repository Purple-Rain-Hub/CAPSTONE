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
import FooterComponent from "./components/FooterComponent";
import "./App.css";
import ErrorPage from "./components/ErrorPage";
import NotAuthRoute from "./components/NotAuthRoute";

function App() {
  return (
    <BrowserRouter>
      <TopNavbar />
      <Routes>
        <Route element={<NotAuthRoute />}>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route path="/" element={<HomePage />} />

        <Route element={<PrivateRoute />}>
          <Route path="/Survey" element={<SurveyPage />} />
          <Route path="/CreateSurvey" element={<CreateSurveyPage />} />
          <Route path="/SurveyResults" element={<ResultsPage />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;

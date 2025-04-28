import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import HomePage from "./components/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SurveyPage from "./components/SurveyPage";
import CreateSurveyPage from "./components/CreateSurveyPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Survey" element={<SurveyPage />} />
        <Route path="/CreateSurvey" element={<CreateSurveyPage />} />
        {/* <Route path="/SurveyResults" element={<ResultsPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

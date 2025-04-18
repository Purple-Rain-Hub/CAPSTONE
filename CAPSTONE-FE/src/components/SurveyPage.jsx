import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getSurvey } from "../redux/action";

const SurveyPage = () => {
  const dispatch = useDispatch();
  const [survey, setSurvey] = useState([
    {
      question: "",
      answers: ["", ""],
    },
  ]);
  const [fetchError, setFetchError] = useState(false);

  const fetchSurvey = async () => {
    const existingSurvey = await dispatch(getSurvey());
    if (existingSurvey != null && existingSurvey.length > 0) {
      setSurvey(existingSurvey);
    } else setFetchError(true);
  };

  useEffect(() => {
    fetchSurvey();
  }, []);

  return (
    <Container>
      <h1>Inizia il tuo Questionario</h1>
      {fetchError ? (
        <span className="bg-danger text-white p-2">
          Errore nel caricamente del questionario, riprova!
        </span>
      ) : (
        <span className="d-none"></span>
      )}
      <Button className="mt-4">Inizia!</Button>
    </Container>
  );
};

export default SurveyPage;

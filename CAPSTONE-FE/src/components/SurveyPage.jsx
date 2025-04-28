import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getSurvey } from "../redux/action";
import { useNavigate } from "react-router-dom";

const SurveyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState([]);
  const [fetchError, setFetchError] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [selectedAnswerId, setSelectedAnswerId] = useState(null);

  const handleStart = () => {
    setCurrentIndex(0);
  };

  const handleNext = () => {
    const currentQuestion = survey[currentIndex];

    const chosenAnswer = currentQuestion.answers.find(
      (a) => a.answerId === selectedAnswerId
    );

    dispatch({
      type: "SAVE_SURVEY_CONTENT",
      payload: {
        question: currentQuestion.question,
        answer: chosenAnswer.answer,
        answerId: chosenAnswer.answerId,
        points: currentQuestion.points,
      },
    });

    setSelectedAnswerId(null);

    if (currentIndex + 1 < survey.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigate("/SurveyResults");
    }
  };

  const fetchSurvey = async () => {
    const existingSurvey = await dispatch(getSurvey());
    if (existingSurvey != null && existingSurvey.length > 0) {
      setSurvey(existingSurvey);
      dispatch({
        type: "RESET_SURVEY_CONTENT",
      });
    } else setFetchError(true);
  };

  useEffect(() => {
    fetchSurvey();
  }, []);

  if (fetchError) {
    return (
      <Container>
        <h1>Benvenuto nel tuo Questionario</h1>
        <span className="bg-danger text-white p-2">
          Errore nel caricamente del questionario!
        </span>
      </Container>
    );
  }

  if (survey.length === 0) {
    return (
      <Container>
        <h1>Benvenuto nel tuo Questionario</h1>
        <span className="bg-warning p-2">Caricamento domande...</span>
      </Container>
    );
  }

  if (currentIndex === -1) {
    return (
      <Container>
        <h1>Benvenuto nel tuo Questionario</h1>
        <Button className="mt-4" onClick={handleStart}>
          Inizia!
        </Button>
      </Container>
    );
  }

  const currentQuestion = survey[currentIndex];
  const isLast = currentIndex === survey.length - 1;

  return (
    <Container>
      <h4>
        Domanda {currentIndex + 1} / {survey.length}
      </h4>
      <p>{currentQuestion.question}</p>

      <Form>
        {currentQuestion.answers.map((a, i) => (
          <Form.Check
            key={i}
            type="radio"
            id={`answer-${i}`}
            label={a.answer}
            name="answers"
            value={a.answerId}
            checked={selectedAnswerId === a.answerId}
            onChange={() => setSelectedAnswerId(a.answerId)}
          />
        ))}

        <Button
          className="mt-3"
          onClick={handleNext}
          disabled={selectedAnswerId == null}
          //ATTENZIONE: puo essere attivato tramite ispeziona
        >
          {isLast ? "Visualizza risultati" : "Avanti"}
        </Button>
      </Form>
    </Container>
  );
};

export default SurveyPage;

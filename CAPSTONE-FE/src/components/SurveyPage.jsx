import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getSurvey } from "../redux/action";
import { useNavigate } from "react-router-dom";

const SurveyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState([
    {
      question: "",
      answers: ["", ""],
      points: 1,
    },
  ]);
  const [fetchError, setFetchError] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const handleStart = () => {
    setCurrentIndex(0);
  };

  const handleNext = () => {
    const currentQuestion = survey[currentIndex];

    dispatch({
      type: "SAVE_SURVEY_CONTENT",
      payload: {
        question: currentQuestion.question,
        answer: selectedAnswer,
        points: currentQuestion.points,
        gamesId: [],
      },
    });

    setSelectedAnswer("");

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
            label={a}
            name="answers"
            value={a}
            checked={selectedAnswer === a}
            onChange={(e) => setSelectedAnswer(e.target.value)}
          />
        ))}

        <Button
          className="mt-3"
          onClick={handleNext}
          disabled={selectedAnswer === ""}
          //ATTENZIONE: puo essere attivato tramite ispeziona
        >
          Avanti
        </Button>
      </Form>
    </Container>
  );
};

export default SurveyPage;

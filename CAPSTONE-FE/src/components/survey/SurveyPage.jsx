import { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getSurvey } from "../../redux/action/index";
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
      <Container fluid id="surveyContainer" className="mainContainer">
        <h1>Benvenuto nel tuo Questionario</h1>
        <span className="bg-danger text-white p-2">
          Errore nel caricamente del questionario!
        </span>
      </Container>
    );
  }

  if (survey.length === 0) {
    return (
      <Container fluid id="surveyContainer" className="mainContainer">
        <h1>Benvenuto nel tuo Questionario</h1>
        <span className="bg-warning p-2">Caricamento domande...</span>
      </Container>
    );
  }

  if (currentIndex === -1) {
    return (
      <Container fluid id="surveyContainer" className="mainContainer">
        <Container className="d-flex justify-content-between p-0">
          <img
            src="public\mascot\what2gameMascotFull.png"
            alt="mascotHero"
            className="mx-auto"
          />
          <Container className="text-center my-auto w-50">
            <h2>
              Ciao sono Emily! <br /> Sei pronto a scoprire il tuo prossimo
              gioco preferito? ANDIAMO
            </h2>
            <Button className="mt-4" onClick={handleStart}>
              Inizia!
            </Button>
          </Container>
        </Container>
      </Container>
    );
  }

  const currentQuestion = survey[currentIndex];
  const isLast = currentIndex === survey.length - 1;

  return (
    <Container
      fluid
      id="surveyContainer"
      className="mainContainer d-flex justify-content-center align-items-center"
    >
      <Card style={{ maxWidth: 600, width: "100%" }} className="p-4">
        <div className="mb-3">
          <small className="text-muted">
            Domanda {currentIndex + 1} / {survey.length}
          </small>
        </div>
        <h2 className="mb-4">{currentQuestion.question}</h2>

        <div className="d-grid gap-3 mb-4">
          {currentQuestion.answers.map((a, i) => (
            <Button
              key={i}
              variant={
                selectedAnswerId === a.answerId ? "primary" : "outline-primary"
              }
              size="lg"
              className="text-start"
              onClick={() => setSelectedAnswerId(a.answerId)}
            >
              {a.answer}
            </Button>
          ))}
        </div>

        <div className="d-flex justify-content-end">
          <Button onClick={handleNext} disabled={selectedAnswerId == null}>
            {isLast ? "Visualizza risultati" : "Avanti"}
          </Button>
        </div>
      </Card>
    </Container>
  );
};

export default SurveyPage;

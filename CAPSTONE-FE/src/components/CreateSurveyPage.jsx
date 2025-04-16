import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getSurvey, postNewSurvey } from "../redux/action";

const CreateSurveyPage = () => {
  const dispatch = useDispatch();
  const [newSurvey, setNewSurvey] = useState([
    {
      question: "",
      answers: ["", ""],
    },
  ]);

  const handleNewSurvey = (e) => {
    e.preventDefault();
    dispatch(postNewSurvey(newSurvey));
  };

  useEffect(() => {
    const existingSurvey = dispatch(getSurvey());
    setNewSurvey(existingSurvey);
  }, []);

  return (
    <Container>
      <h1>Crea nuovo questionario</h1>
      <Form onSubmit={handleNewSurvey}>
        {newSurvey.map((q, x) => (
          <div key={x} className="border border-1 border-dark-subtle p-3 mt-2">
            <div>
              <Form.Label className="mt-2 fw-lighter">
                Domanda n.{x + 1}
              </Form.Label>
              <Form.Control
                type="text"
                required
                value={q.question}
                onChange={(e) => {
                  const updatedSurvey = [...newSurvey];
                  updatedSurvey[x].question = e.target.value;
                  setNewSurvey(updatedSurvey);
                }}
              />
            </div>
            <div>
              <Form.Label className="mt-2 fw-lighter">Risposte</Form.Label>
              {newSurvey[x].answers.map((a, n) => (
                <Form.Control
                  key={n}
                  className="mt-2"
                  type="text"
                  required
                  placeholder={`risposta n.${n + 1}`}
                  value={a}
                  onChange={(e) => {
                    const updatedSurvey = [...newSurvey];
                    updatedSurvey[x].answers[n] = e.target.value;
                    setNewSurvey(updatedSurvey);
                  }}
                />
              ))}
              <Button
                onClick={() => {
                  const updatedSurvey = [...newSurvey];
                  updatedSurvey[x].answers.push("");
                  setNewSurvey(updatedSurvey);
                }}
              >
                Aggiungi risposta
              </Button>
              {newSurvey[x].answers.length > 2 ? (
                <Button
                  onClick={() => {
                    const updatedSurvey = [...newSurvey];
                    updatedSurvey[x].answers.pop();
                    setNewSurvey(updatedSurvey);
                  }}
                  className="btn-danger"
                >
                  Rimuovi risposta
                </Button>
              ) : (
                <p></p>
              )}
            </div>
            {newSurvey.length > 1 ? (
              <Button
                onClick={() => {
                  const updatedSurvey = [...newSurvey];
                  updatedSurvey.splice(x, 1);
                  setNewSurvey(updatedSurvey);
                }}
                className="btn-danger"
              >
                Rimuovi domanda
              </Button>
            ) : (
              <p></p>
            )}
          </div>
        ))}
        <Button
          className="mt-2 d-block"
          onClick={() => {
            const updatedSurvey = [...newSurvey];
            updatedSurvey.push({
              question: "",
              answers: ["", ""],
            });
            setNewSurvey(updatedSurvey);
          }}
        >
          Aggiungi domanda
        </Button>
        <Button type="submit" className="mt-4 d-block btn-danger">
          Salva Form
        </Button>
      </Form>
    </Container>
  );
};

export default CreateSurveyPage;

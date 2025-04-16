import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <h1>Benvenuto in WhatToGame</h1>
      <Button
        onClick={() => {
          navigate("/Survey");
        }}
      >
        Survey
      </Button>
    </Container>
  );
};

export default HomePage;

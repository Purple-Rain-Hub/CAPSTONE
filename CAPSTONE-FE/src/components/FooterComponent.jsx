import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

const FooterComponent = () => (
  <footer className="bg-dark text-light py-3 mt-auto">
    <Container>
      <Row className="justify-content-center mb-2">
        <Col xs="auto">
          <a
            href="https://github.com/Purple-Rain-Hub"
            target="_blank"
            rel="noopener noreferrer"
            className="text-light mx-2"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="Javascript:void(0)"
            rel="noopener noreferrer"
            className="text-light mx-2"
          >
            <FaFacebookF size={24} />
          </a>
          <a
            href="Javascript:void(0)"
            rel="noopener noreferrer"
            className="text-light mx-2"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="Javascript:void(0)"
            rel="noopener noreferrer"
            className="text-light mx-2"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="Javascript:void(0)"
            rel="noopener noreferrer"
            className="text-light mx-2"
          >
            <FaLinkedinIn size={24} />
          </a>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs="auto">
          <small>© 2025 What2Game. All rights reserved.</small>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default FooterComponent;

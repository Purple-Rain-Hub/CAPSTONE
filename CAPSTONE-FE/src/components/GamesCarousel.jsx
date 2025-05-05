import { Carousel, Card, Row, Col, Container } from "react-bootstrap";

const GamesCarousel = ({ title, games, itemsToShow }) => {
  const pages = [];
  for (let i = 0; i < games.length; i += itemsToShow) {
    pages.push(games.slice(i, i + itemsToShow));
  }

  return (
    <Container
      fluid
      className="my-4 border border-4 py-4 bg-info border-black"
      id="carouselDiv"
    >
      <h3 className="mb-3">{title}</h3>
      <Carousel controls indicators={false}>
        {pages.map((page, idx) => (
          <Carousel.Item key={idx}>
            <div
              className="d-flex justify-content-start ps-3"
              style={{ gap: "1rem" }}
            >
              {page.map((g) => (
                <div
                  key={g.id}
                  style={{
                    flex: `0 0 calc(100% / ${itemsToShow} - 1rem)`,
                    height: 240,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={g.cover}
                    alt={g.name}
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default GamesCarousel;

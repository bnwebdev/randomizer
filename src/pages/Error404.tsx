import { FC } from "react";
import { Row, Col, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../hooks";
import { path } from "../utils";

const Error404: FC = () => {
  const navigate = useNavigate();

  const t = useTranslation()

  const errorName = t('404ErrorPage.error.name')
  const errorMessage = t('404ErrorPage.error.message')
  const prevPage = t('404ErrorPage.previousPageLink')
  const homePage = t('404ErrorPage.homePageLink')

  return (
    <div
      className="d-flex flex-column justify-content-center"
      style={{ minHeight: "80vh" }}
    >
      <Row>
        <Col sm={{ offset: 3, span: 6 }}>
          <h1 className="text-danger">{errorName}</h1>
          <h2>{errorMessage}</h2>
          <Nav>
            <Nav.Link onClick={() => navigate(-1)}>
              {prevPage}
            </Nav.Link>
            <Nav.Link className="nav-link" onClick={() => navigate(path("/"))}>
              {homePage}
            </Nav.Link>
          </Nav>
        </Col>
      </Row>
    </div>
  );
};

export default Error404;

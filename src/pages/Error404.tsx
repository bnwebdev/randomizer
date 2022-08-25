import { FC } from "react";
import { Row, Col, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { path } from "../utils";

const Error404: FC = () => {
  const navigate = useNavigate();
  return (
    <div
      className="d-flex flex-column justify-content-center"
      style={{ minHeight: "80vh" }}
    >
      <Row>
        <Col sm={{ offset: 3, span: 6 }}>
          <h1 className="text-danger">Error 404</h1>
          <h2>Page isn't found</h2>
          <Nav>
            <Nav.Link onClick={() => navigate(-1)}>
              Previous Page
            </Nav.Link>
            <Nav.Link className="nav-link" onClick={() => navigate(path("/"))}>
              HomePage
            </Nav.Link>
          </Nav>
        </Col>
      </Row>
    </div>
  );
};

export default Error404;

import { FC, useEffect, useState } from "react";
import { Button, Col, ListGroup, Row, Spinner } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import computeRandomDescription from "../computors";
import { useDexie } from "../hooks";
import { path } from "../utils";

const LOADING_TIME = 800;

const Random: FC = () => {
  const params = useParams();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const random = useDexie((db) => db.randoms.get(Number(params.id)));
  const db = useDexie(async (db) => db);
  const navigate = useNavigate()
  useEffect(() => {
    if (isLoading) {
      setTimeout(() => setIsLoading(false), LOADING_TIME);
    }
  }, [isLoading]);

  if (!random) {
    return <h1>Loading data...</h1>;
  }

  const remove = async () => {
    db?.randoms.delete(random.id as number);
    navigate(path('/'))
  };

  return (
    <>
      <h1>{random.name}</h1>
      <div className="mb-2">
        <Button onClick={() => setIsLoading(true)}>Get new random!</Button>
        <Button className="mx-1" variant="danger" onClick={remove}>
          Remove
        </Button>
      </div>
      <ListGroup>
        {random.randomDescriptions.map((randomDescription) => (
          <ListGroup.Item key={randomDescription.label}>
            <Row>
              <Col sm={6}>
                <h2>{randomDescription.label}</h2>
              </Col>
              <Col sm={6}>
                {isLoading ? (
                  <Spinner animation="border" variant="primary" />
                ) : (
                  <h2>{computeRandomDescription(randomDescription)}</h2>
                )}
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default Random;

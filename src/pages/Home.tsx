import { FC, useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDexie } from "../hooks";

const Home: FC = () => {
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const randoms = useDexie((db) =>
    db.randoms.limit(limit).offset(offset).toArray()
  );

  if (!randoms) {
    return <h1>Loading data...</h1>
  }

  if (randoms.length === 0) {
    return <h1> Nothing! </h1>
  }

  return (
    <ListGroup>
      {randoms.map(({ name, id }) => (
        <LinkContainer key={id} to={`/randoms/${id}`}>
          <ListGroup.Item action className="d-flex justify-content-center">
            {name}
          </ListGroup.Item>
        </LinkContainer>
      ))}
    </ListGroup>
  );
};

export default Home;

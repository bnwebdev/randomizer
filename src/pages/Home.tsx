import { FC, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDexie, useTranslation } from "../hooks";
import { path } from "../utils";

const Home: FC = () => {
  const limit = 10;
  const [offset] = useState(0);
  const randoms = useDexie((db) =>
    db.randoms.limit(limit).offset(offset).toArray()
  );

  const t = useTranslation()

  if (!randoms) {
    return <h1>{t('homePage.loadingData') as string}</h1>
  }

  if (randoms.length === 0) {
    return <h1>{t('homePage.nothing') as string}</h1>
  }

  return (
    <ListGroup>
      {randoms.map(({ name, id }) => (
        <LinkContainer key={id} to={path(`/randoms/${id}`)}>
          <ListGroup.Item action className="d-flex justify-content-center">
            {name}
          </ListGroup.Item>
        </LinkContainer>
      ))}
    </ListGroup>
  );
};

export default Home;

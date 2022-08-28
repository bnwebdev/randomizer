import { FC, useEffect, useState } from "react";
import { Button, Col, ListGroup, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Row, Spinner } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { ErrorPrinter } from "../components";
import computeRandomDescription from "../computors";
import { useDexie } from "../hooks";
import { path, sleep } from "../utils";

const LOADING_TIME = 800;

const Random: FC = () => {
  const params = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [isRemoving, setIsRemoving] = useState(false);
  const [removingError,  setRemovingError] = useState('');
  const [showRemoveModal, setShowRemoveModal] = useState(false)

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

  const removeItem = async () => {
    db?.randoms.delete(random.id as number);
  };

  const onRemove = async () => {
    try {
      setIsRemoving(true)
      await sleep(1000)
      await removeItem()
      
      setShowRemoveModal(false)
      navigate(path('/'))
    } catch (error) {
      setRemovingError((error as Error).message);
    } finally {
      setIsRemoving(false);
    }
  }

  const closeModal = () => setShowRemoveModal(false)

  return (
    <>
      <h1>{random.name}</h1>
      <div className="mb-2">
        <Button onClick={() => setIsLoading(true)}>Get new random!</Button>
        <Modal show={showRemoveModal} onHide={closeModal} backdrop>
          <ModalHeader>
            <ModalTitle>
              Remove {random.name}
            </ModalTitle>
            {
              isRemoving
              ? <Spinner animation="border" size="sm"/>
              : null
            }
          </ModalHeader>
          <ModalBody>
            <ErrorPrinter error={removingError}/>
            <p>You would like remove this random. Are you sure?</p>
          </ModalBody>
          <ModalFooter>
            <Button variant="secondary" disabled={isRemoving} onClick={() => setShowRemoveModal(false)}>No</Button>
            <Button disabled={isRemoving} onClick={onRemove}>Yes</Button>
          </ModalFooter>
        </Modal>
        <Button className="mx-1" variant="danger" onClick={() => setShowRemoveModal(true)}>
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

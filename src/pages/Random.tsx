import { FC, useEffect, useState } from "react";
import { Button, Col, ListGroup, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Row, Spinner } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { ErrorPrinter } from "../components";
import computeRandomDescription from "../computors";
import { useDexie, useTranslation } from "../hooks";
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
  const t = useTranslation()

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


  const updateValuesText = t('randomsMakerPage.subpage.concreteRandom.updateValues')
  const removeText = t('randomsMakerPage.subpage.concreteRandom.remove')
  const title = t('randomsMakerPage.subpage.concreteRandom.removeModal.title', { name: random.name })
  const okText = t('randomsMakerPage.subpage.concreteRandom.removeModal.okText')
  const cancelText = t('randomsMakerPage.subpage.concreteRandom.removeModal.cancelText')
  const question = t('randomsMakerPage.subpage.concreteRandom.removeModal.question')

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
        <Button onClick={() => setIsLoading(true)}>{updateValuesText}</Button>
        <Modal show={showRemoveModal} onHide={closeModal} backdrop>
          <ModalHeader>
            <ModalTitle>
              {title}
            </ModalTitle>
            {
              isRemoving
              ? <Spinner animation="border" size="sm"/>
              : null
            }
          </ModalHeader>
          <ModalBody>
            <ErrorPrinter error={removingError}/>
            <p>{question}</p>
          </ModalBody>
          <ModalFooter>
            <Button variant="secondary" disabled={isRemoving} onClick={() => setShowRemoveModal(false)}>{cancelText}</Button>
            <Button variant="primary" disabled={isRemoving} onClick={onRemove}>{okText}</Button>
          </ModalFooter>
        </Modal>
        <Button className="mx-1" variant="danger" onClick={() => setShowRemoveModal(true)}>
          {removeText}
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

import { FC, useMemo, useState } from "react";
import {
  Button,
  ListGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Spinner,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { ErrorPrinter } from "../components";
import { COMPUTING_VALUE_TIME } from "../core/constants";
import { RootView } from "../core/Root/view";
import { prepareRandomDescriptionViewProps } from "../core/utils/prepareRandomDescriptionViewProps";
import { useComputing, useDexie, useTranslation } from "../hooks";

const Random: FC = () => {
  const params = useParams();

  const [isRemoving, setIsRemoving] = useState(false);
  const [removingError, setRemovingError] = useState("");
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const { compute, computing } = useComputing(COMPUTING_VALUE_TIME);

  const random = useDexie((db) => db.randoms.get(Number(params.id)));
  const db = useDexie(async (db) => db);

  const navigate = useNavigate();
  const t = useTranslation();

  const randomNodes = useMemo(
    () =>
      random?.randomDescriptions.map((randomDescription, idx) => (
        <ListGroup.Item key={idx}>
          {
            <RootView
              type={randomDescription.type}
              {...(prepareRandomDescriptionViewProps(
                randomDescription,
                computing
              ) as any)}
            />
          }
        </ListGroup.Item>
      )),
    [random, computing]
  );

  if (!random) {
    return <h1>Loading data...</h1>;
  }

  const removeItem = async () => {
    db?.randoms.delete(random.id as number);
  };

  const updateValuesText = t(
    "randomsMakerPage.subpage.concreteRandom.updateValues"
  );
  const removeText = t("randomsMakerPage.subpage.concreteRandom.remove");
  const title = t("randomsMakerPage.subpage.concreteRandom.removeModal.title", {
    name: random.name,
  });
  const okText = t(
    "randomsMakerPage.subpage.concreteRandom.removeModal.okText"
  );
  const cancelText = t(
    "randomsMakerPage.subpage.concreteRandom.removeModal.cancelText"
  );
  const question = t(
    "randomsMakerPage.subpage.concreteRandom.removeModal.question"
  );

  const onRemove = async () => {
    try {
      setIsRemoving(true);
      await removeItem();

      setShowRemoveModal(false);
      navigate("/");
    } catch (error) {
      setRemovingError((error as Error).message);
    } finally {
      setIsRemoving(false);
    }
  };

  const closeModal = () => setShowRemoveModal(false);

  return (
    <>
      <h1>{random.name}</h1>
      <div className="mb-2">
        <Button onClick={() => compute()}>{updateValuesText}</Button>
        <Modal show={showRemoveModal} onHide={closeModal} backdrop>
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
            {isRemoving ? <Spinner animation="border" size="sm" /> : null}
          </ModalHeader>
          <ModalBody>
            <ErrorPrinter error={removingError} />
            <p>{question}</p>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="secondary"
              disabled={isRemoving}
              onClick={() => setShowRemoveModal(false)}
            >
              {cancelText}
            </Button>
            <Button variant="primary" disabled={isRemoving} onClick={onRemove}>
              {okText}
            </Button>
          </ModalFooter>
        </Modal>
        <Button
          className="mx-1"
          variant="danger"
          onClick={() => setShowRemoveModal(true)}
        >
          {removeText}
        </Button>
      </div>
      <ListGroup>{randomNodes}</ListGroup>
    </>
  );
};

export default Random;

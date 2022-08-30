import { FC, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import { useTranslation } from "../../../hooks";

import { RandomDescription, RandomDescriptionTypes } from "../../../types";
import ErrorPrinter from "../../ErrorPrinter";

import EnumRandomDescriptionMaker from "./EnumRandomDescriptionMaker";
import NumberRandomDescriptionMaker from "./NumberRandomDescriptionMaker";

type Props = {
  onChange: (randomDescription: RandomDescription) => void;
  removeHandler: (randomDescription: RandomDescription) => void;
  randomDescription: RandomDescription;
};

const randomDescriptionMakers: Record<RandomDescriptionTypes, FC<Props>> = {
  [RandomDescriptionTypes.ENUMERAL]: EnumRandomDescriptionMaker as FC<Props>,
  [RandomDescriptionTypes.NUMBER]: NumberRandomDescriptionMaker as FC<Props>,
};

const RandomDescriptionMaker: FC<Props> = (props) => {
  const { randomDescription, removeHandler } = props
  const Component = randomDescriptionMakers[randomDescription.type];

  const [removingError, setRemovingError] = useState('')
  const [showRemoveModal, setShowRemoveModal] = useState(false)

  const t = useTranslation()

  const title = t('randomsMakerPage.removeDescriptionForm.title', { name: randomDescription.label })
  const question = t('randomsMakerPage.removeDescriptionForm.question')
  const cancelText = t('randomsMakerPage.removeDescriptionForm.cancelText')
  const okText = t('randomsMakerPage.removeDescriptionForm.okText')

  const closeModal = () => {
    setShowRemoveModal(false)
    setRemovingError('')
  };
  const openModal = () => setShowRemoveModal(true)

  const onRemove = () => {
    try {
      removeHandler(randomDescription)
      closeModal()
    } catch (error) {
      setRemovingError((error as Error).message)
    }
  }

  return (
    <>
      <Form.Group className="mb-3">
        <Row>
          <Col
            sm={3}
            className="d-flex justify-content-center align-items-center"
          >
            <Form.Label>{props.randomDescription.label}</Form.Label>
          </Col>
          <Col sm={6}>
            <Component {...props} />
          </Col>
          <Col
            sm={3}
            className="d-flex justify-content-center align-items-center"
          >
            <Modal show={showRemoveModal} onHide={closeModal} backdrop>
              <Modal.Header>
                <Modal.Title>
                  {title}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ErrorPrinter error={removingError}/>
                <p>{question}</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>{cancelText}</Button>
                <Button variant="primary" onClick={onRemove}>{okText}</Button>
              </Modal.Footer>
            </Modal>
            <Button
              onClick={openModal}
              variant="outline-danger"
            >
              <Trash size="32" />
            </Button>
          </Col>
        </Row>
      </Form.Group>
    </>
  );
};

export default RandomDescriptionMaker;

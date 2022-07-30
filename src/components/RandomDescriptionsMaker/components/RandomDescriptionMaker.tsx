import { FC } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";

import { RandomDescription, RandomDescriptionTypes } from "../../../types";

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
  const Component = randomDescriptionMakers[props.randomDescription.type];
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
            <Button
              onClick={() => props.removeHandler(props.randomDescription)}
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

import { FC } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { NumberRandomDescription, RandomDescription } from "../../../types";

type Props = {
  onChange: (randomDescription: RandomDescription) => void;
  randomDescription: NumberRandomDescription;
};

const NumberRandomDescriptionMaker: FC<Props> = ({ randomDescription, onChange }) => {
  return (
    <>
      <Row className="mb-3">
        <Col sm={6}>
          <Form.Group>
            <Form.Label>Min</Form.Label>
            <Form.Control
              type="number"
              value={randomDescription.min}
              onChange={(e) =>
                onChange({ ...randomDescription, min: +e.currentTarget.value })
              }
            />
          </Form.Group>
        </Col>
        <Col sm={6}>
          <Form.Group className="mb-3">
            <Form.Label>Max</Form.Label>
            <Form.Control
              type="number"
              value={randomDescription.max}
              onChange={(e) =>
                onChange({ ...randomDescription, max: +e.currentTarget.value })
              }
            />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
};

export default NumberRandomDescriptionMaker;

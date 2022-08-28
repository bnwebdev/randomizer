import { FC } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useTranslation } from "../../../hooks";
import { NumberRandomDescription, RandomDescription } from "../../../types";

type Props = {
  onChange: (randomDescription: RandomDescription) => void;
  randomDescription: NumberRandomDescription;
};

const NumberRandomDescriptionMaker: FC<Props> = ({ randomDescription, onChange }) => {

  const t = useTranslation()

  const minLabel: string = t('randomsMakerPage.numberDescriptionsMaker.minLabel')
  const maxLabel: string = t('randomsMakerPage.numberDescriptionsMaker.maxLabel')

  return (
    <>
      <Row className="mb-3">
        <Col sm={6}>
          <Form.Group>
            <Form.Label>{minLabel}</Form.Label>
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
            <Form.Label>{maxLabel}</Form.Label>
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

import { FC, useEffect, useMemo, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { CHANGING_VALUE_TIME } from "../../constants";

import { NumericViewProps } from "../../types";
import { NumericComputor } from "../computor";
import { useChangingRandomNumber } from "../hooks";

export const NumericView: FC<NumericViewProps> = (props) => {
  const { min, max, computing } = props;
  const computor = useMemo(() => new NumericComputor(min, max), [min, max]);

  const [result, setResult] = useState(() => computor.makeRandom().result);

  const changingRandom = useChangingRandomNumber(computor, CHANGING_VALUE_TIME);

  useEffect(() => {
    if (!computing) {
      setResult(computor.makeRandom().result);
    }
  }, [computing, computor]);

  if (computing) {
    return (
      <Row style={{ maxWidth: "max-content" }}>
        <Col>
          <Spinner animation="grow" />
        </Col>
        <Col className="h3">{changingRandom}</Col>
      </Row>
    );
  }

  return (
    <Row style={{ maxWidth: "max-content" }}>
      <Col className="h3">{result}</Col>
    </Row>
  );
};

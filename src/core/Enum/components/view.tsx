import { FC, useEffect, useMemo, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { CHANGING_VALUE_TIME } from "../../constants";

import { EnumViewProps } from "../../types";
import { EnumComputor } from "../computor";
import { useChangingRandomEnum } from "../hooks";

export const EnumView: FC<EnumViewProps> = (props) => {
  const { enums, computing } = props;
  const computor = useMemo(() => new EnumComputor(enums), [enums]);

  const [result, setResult] = useState(() => computor.makeRandom().result);

  const changingRandom = useChangingRandomEnum(computor, CHANGING_VALUE_TIME);

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

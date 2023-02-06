import { FC } from "react";
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "../../../hooks";

import { NumericPreviewProps } from "../../types";

export const NumericPreview: FC<NumericPreviewProps> = (props) => {
  const { min, max } = props;
  const t = useTranslation();

  return (
    <>
      <Row>
        <Col className="h3 d-flex align-items-center" xs={2}>
          {t<string>("randomsMakerPage.numberDescriptionsMaker.minLabel")}
        </Col>
        <Col className="h4 d-flex align-items-center" xs={10}>
          {min}
        </Col>
      </Row>
      <Row>
        <Col className="h3 d-flex align-items-center" xs={2}>
          {t<string>("randomsMakerPage.numberDescriptionsMaker.maxLabel")}
        </Col>
        <Col className="h4 d-flex align-items-center" xs={10}>
          {max}
        </Col>
      </Row>
    </>
  );
};

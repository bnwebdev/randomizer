import { FC, ReactNode, useContext, useMemo } from "react";
import { Col, Row, Stack } from "react-bootstrap";
import { RandomComponentFactoryContext } from "../../common/RandomComponentFactoryContext";
import { ObjectPreviewProps } from "../../types";

export const ObjectPreview: FC<ObjectPreviewProps> = (props) => {
  const { object } = props;
  const { Preview } = useContext(RandomComponentFactoryContext);

  const components: Array<[string, ReactNode]> = useMemo(() => {
    return Object.entries(object).map(([key, { type, props }]) => {
      const PreviewComponent = Preview[type] as FC<any>;

      return [key, <PreviewComponent {...props} />];
    });
  }, [object, Preview]);

  const getBorderStyle = (idx: number) =>
    idx === components.length - 1 ? "" : "border-bottom";

  return (
    <Stack gap={2}>
      {components.map(([name, children], idx) => (
        <Row key={name + idx} className={getBorderStyle(idx)}>
          <Col className="h2 d-flex align-items-center" xs={2}>
            {name}
          </Col>
          <Col xs={10} className="pb-2">
            {children}
          </Col>
        </Row>
      ))}
    </Stack>
  );
};

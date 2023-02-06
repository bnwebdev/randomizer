import { FC, ReactNode, useContext, useMemo } from "react";
import { Col, Row, Stack } from "react-bootstrap";
import { RandomComponentFactoryContext } from "../../common/RandomComponentFactoryContext";
import { ObjectViewProps } from "../../types";

export const ObjectView: FC<ObjectViewProps> = (props) => {
  const { object, computing } = props;

  const { View } = useContext(RandomComponentFactoryContext);

  const components: Array<[string, ReactNode]> = useMemo(() => {
    return Object.entries(object).map(([key, { type, props }]) => {
      const ViewComponent = View[type] as FC<any>;

      return [key, <ViewComponent {...props} computing={computing} />];
    });
  }, [object, computing, View]);

  const getBorderStyle = (idx: number) =>
    idx === components.length - 1 ? "" : "border-bottom";

  return (
    <Stack gap={2}>
      {components.map(([name, children], idx) => (
        <Row key={name + idx} className={getBorderStyle(idx)}>
          <Col className="h2 d-flex align-items-center">{name}</Col>
          <Col xs={8}>{children}</Col>
        </Row>
      ))}
    </Stack>
  );
};

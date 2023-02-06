import { FC } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";

import { EnumPreviewProps } from "../../types";

export const EnumPreview: FC<EnumPreviewProps> = (props) => {
  const { enums } = props;

  return (
    <ListGroup>
      {enums.map((item, idx) => (
        <ListGroupItem
          key={item + idx}
          className="d-flex justify-content-center"
        >
          {item}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

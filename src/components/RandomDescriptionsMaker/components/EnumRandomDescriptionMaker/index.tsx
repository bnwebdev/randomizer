import { FC, useMemo, useState } from "react";
import { Badge, Form } from "react-bootstrap";
import { PlusCircleDotted } from "react-bootstrap-icons";
import { EnumRandomDescription, RandomDescription } from "../../../../types";
import ValueAdderModal from "./components/ValueAdderModal";
import ValueChangerModal from "./components/ValueChangerModal";

type Props = {
  onChange: (randomDescription: RandomDescription) => void;
  randomDescription: EnumRandomDescription;
};

const EnumRandomDescriptionMaker: FC<Props> = ({
  randomDescription,
  onChange,
}) => {
  const [show, setShow] = useState(false);

  const saveAdderHandler = (value: string) => {
    onChange({
      ...randomDescription,
      enum: [...randomDescription.enum, value],
    });
  };

  const [idxToChange, setIdxToChange] = useState(-1);
  const DynamicChangerModal = useMemo(() => {
    if (idxToChange === -1) {
      return () => null;
    }
    const close = () => setIdxToChange(-1);
    const save = (value: string) => {
      const newEnum = [...randomDescription.enum];
      newEnum[idxToChange] = value;
      onChange({
        ...randomDescription,
        enum: newEnum,
      });
    };
    const remove = () => {
      const newEnum = [...randomDescription.enum];
      newEnum.splice(idxToChange, 1);
      onChange({
        ...randomDescription,
        enum: newEnum,
      });
    };

    return () => (
      <ValueChangerModal
        show={true}
        close={close}
        save={save}
        remove={remove}
        value={randomDescription.enum[idxToChange]}
      />
    );
  }, [idxToChange]);

  return (
    <>
      <Form.Group className="mb-3">
        {randomDescription.enum.map((value, idx) => (
          <Badge
            key={idx}
            bg="primary"
            text="light"
            onClick={() => setIdxToChange(idx)}
            className="btn"
          >
            {value || "nothing"}
          </Badge>
        ))}
        <Badge
          pill
          onClick={() => setShow(true)}
          bg="success"
          text="light"
          className="btn p-1"
        >
          <PlusCircleDotted size={32} />
        </Badge>
      </Form.Group>
      <ValueAdderModal
        show={show}
        close={() => setShow(false)}
        save={saveAdderHandler}
      />
      <DynamicChangerModal />
    </>
  );
};

export default EnumRandomDescriptionMaker;

import { FC, useState } from "react";
import { Button } from "react-bootstrap";
import { PlusCircle } from "react-bootstrap-icons";
import {
  BaseRandomDescription,
  RandomDescription,
  RandomDescriptionTypes,
} from "../../types";
import { RandomDescriptionMaker, TypeChooserModal } from "./components";

type Props = {
  onChange: (
    handler: (descriptions: RandomDescription[]) => RandomDescription[]
  ) => void;
  descriptions: RandomDescription[];
};

const RandomDescriptionsMaker: FC<Props> = ({
  descriptions: randomDescriptions,
  onChange,
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  const handleCreate = ({ label, type }: BaseRandomDescription) => {
    let randomDescription: RandomDescription;
    switch (type) {
      case RandomDescriptionTypes.ENUMERAL:
        randomDescription = { type, label, enum: [] };
        break;
      case RandomDescriptionTypes.NUMBER:
        randomDescription = { type, label, min: 0, max: 100 };
        break;
      case RandomDescriptionTypes.KEY_VALUES:
        randomDescription = { type, label, keys: [], values: [], repeated: true}
        break;
      default:
        throw new Error(`Undefined type`);
    }
    onChange((descriptions) => [...descriptions, randomDescription]);
  };

  return (
    <>
      {randomDescriptions.map((randomDescription, idx) => (
        <RandomDescriptionMaker
          key={idx}
          randomDescription={randomDescription}
          onChange={(newDescription) =>
            onChange((descriptions) => {
              const newDescriptios = [...descriptions];
              newDescriptios[idx] = newDescription;
              return newDescriptios;
            })
          }
          removeHandler={(randomDescription) =>
            onChange((descriptions) =>
              descriptions.filter(
                (_randomDescription) => _randomDescription !== randomDescription
              )
            )
          }
        />
      ))}
      <Button onClick={handleOpen} className="p-2 rounded-circle" variant="outline-success">
          <PlusCircle size="32" />
      </Button>
      <TypeChooserModal show={show} close={handleClose} create={handleCreate} />
    </>
  );
};

export default RandomDescriptionsMaker;

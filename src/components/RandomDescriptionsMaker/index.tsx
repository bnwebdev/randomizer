import { FC, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";
import { ChangeHandler, useForm } from "react-hook-form";
import {
  BaseRandomDescription,
  RandomDescription,
  RandomDescriptionTypes,
} from "../../types";
import ErrorPrinter from "../ErrorPrinter";
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
      default:
        throw new Error(`Undefined type`);
    }
    onChange((descriptions) => [...descriptions, randomDescription]);
  };

  return (
    <>
      {randomDescriptions.map((randomDescription, idx) => (
        <RandomDescriptionMaker
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
      <Button onClick={handleOpen} className="rounded-circle p-1">
        <Plus size="32" />
      </Button>
      <TypeChooserModal show={show} close={handleClose} create={handleCreate} />
    </>
  );
};

export default RandomDescriptionsMaker;
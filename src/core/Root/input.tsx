import { FC, useContext } from "react";
import { RandomDescriptionTypes } from "../../types";
import { RandomComponentFactoryContext } from "../common/RandomComponentFactoryContext";
import {
  EnumInputProps,
  LinkInputProps,
  NumericInputProps,
  ObjectInputProps,
} from "../types";

type Props =
  | ({
      type: RandomDescriptionTypes.ENUMERAL;
    } & EnumInputProps)
  | ({
      type: RandomDescriptionTypes.LINK;
    } & LinkInputProps)
  | ({
      type: RandomDescriptionTypes.NUMBER;
    } & NumericInputProps)
  | ({
      type: RandomDescriptionTypes.OBJECT;
    } & ObjectInputProps);

export const RootInput: FC<Props> = ({ type, ...props }) => {
  const { Input } = useContext(RandomComponentFactoryContext);

  const ConcreteInput = Input[type];

  return <ConcreteInput {...props} />;
};

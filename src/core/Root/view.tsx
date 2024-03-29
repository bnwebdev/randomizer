import { FC, useContext } from "react";
import { RandomDescriptionTypes } from "../../types";
import { RandomComponentFactoryContext } from "../common/RandomComponentFactoryContext";
import {
  EnumViewProps,
  LinkViewProps,
  NumericViewProps,
  ObjectViewProps,
  RandomRepeatRandomsViewProps,
} from "../types";

type Props =
  | ({
      type: RandomDescriptionTypes.ENUMERAL;
    } & EnumViewProps)
  | ({
      type: RandomDescriptionTypes.LINK;
    } & LinkViewProps)
  | ({
      type: RandomDescriptionTypes.NUMBER;
    } & NumericViewProps)
  | ({
      type: RandomDescriptionTypes.OBJECT;
    } & ObjectViewProps)
  | ({
      type: RandomDescriptionTypes.RANDOM_REPEAT_RANDOMS;
    } & RandomRepeatRandomsViewProps);

export const RootView: FC<Props> = ({ type, ...props }) => {
  const { View } = useContext(RandomComponentFactoryContext);

  const ConcreteView = View[type] as FC<any>;

  return <ConcreteView {...props} />;
};

import { createContext, FC } from "react";
import { RandomDescriptionTypes } from "../../types";
import {
  EnumInputProps,
  EnumPreviewProps,
  EnumViewProps,
  LinkInputProps,
  LinkPreviewProps,
  LinkViewProps,
  NumericInputProps,
  NumericPreviewProps,
  NumericViewProps,
  ObjectInputProps,
  ObjectPreviewProps,
  ObjectViewProps,
  RandomRepeatRandomsInputProps,
  RandomRepeatRandomsViewProps,
  RandomRepeatRandomsPreviewProps,
} from "../types";

export type Context = {
  TYPES: RandomDescriptionTypes[];
  Input: {
    [RandomDescriptionTypes.ENUMERAL]: FC<EnumInputProps>;
    [RandomDescriptionTypes.NUMBER]: FC<NumericInputProps>;
    [RandomDescriptionTypes.OBJECT]: FC<ObjectInputProps>;
    [RandomDescriptionTypes.LINK]: FC<LinkInputProps>;
    [RandomDescriptionTypes.RANDOM_REPEAT_RANDOMS]: FC<RandomRepeatRandomsInputProps>;
  };
  Preview: {
    [RandomDescriptionTypes.ENUMERAL]: FC<EnumPreviewProps>;
    [RandomDescriptionTypes.NUMBER]: FC<NumericPreviewProps>;
    [RandomDescriptionTypes.OBJECT]: FC<ObjectPreviewProps>;
    [RandomDescriptionTypes.LINK]: FC<LinkPreviewProps>;
    [RandomDescriptionTypes.RANDOM_REPEAT_RANDOMS]: FC<RandomRepeatRandomsPreviewProps>;
  };
  View: {
    [RandomDescriptionTypes.ENUMERAL]: FC<EnumViewProps>;
    [RandomDescriptionTypes.NUMBER]: FC<NumericViewProps>;
    [RandomDescriptionTypes.OBJECT]: FC<ObjectViewProps>;
    [RandomDescriptionTypes.LINK]: FC<LinkViewProps>;
    [RandomDescriptionTypes.RANDOM_REPEAT_RANDOMS]: FC<RandomRepeatRandomsViewProps>;
  };
};

const ShouldBeProvided = () => {
  throw new Error(`Should be provided`);
};

export const RandomComponentFactoryContext = createContext<Context>({
  TYPES: [
    RandomDescriptionTypes.ENUMERAL,
    RandomDescriptionTypes.NUMBER,
    RandomDescriptionTypes.OBJECT,
    RandomDescriptionTypes.LINK,
    RandomDescriptionTypes.RANDOM_REPEAT_RANDOMS,
  ],
  Input: {
    [RandomDescriptionTypes.ENUMERAL]: ShouldBeProvided,
    [RandomDescriptionTypes.NUMBER]: ShouldBeProvided,
    [RandomDescriptionTypes.OBJECT]: ShouldBeProvided,
    [RandomDescriptionTypes.LINK]: ShouldBeProvided,
    [RandomDescriptionTypes.RANDOM_REPEAT_RANDOMS]: ShouldBeProvided,
  },
  Preview: {
    [RandomDescriptionTypes.ENUMERAL]: ShouldBeProvided,
    [RandomDescriptionTypes.NUMBER]: ShouldBeProvided,
    [RandomDescriptionTypes.OBJECT]: ShouldBeProvided,
    [RandomDescriptionTypes.LINK]: ShouldBeProvided,
    [RandomDescriptionTypes.RANDOM_REPEAT_RANDOMS]: ShouldBeProvided,
  },
  View: {
    [RandomDescriptionTypes.ENUMERAL]: ShouldBeProvided,
    [RandomDescriptionTypes.NUMBER]: ShouldBeProvided,
    [RandomDescriptionTypes.OBJECT]: ShouldBeProvided,
    [RandomDescriptionTypes.LINK]: ShouldBeProvided,
    [RandomDescriptionTypes.RANDOM_REPEAT_RANDOMS]: ShouldBeProvided,
  },
});

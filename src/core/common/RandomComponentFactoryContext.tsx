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
} from "../types";

export type Context = {
  TYPES: RandomDescriptionTypes[];
  Input: {
    [RandomDescriptionTypes.ENUMERAL]: FC<EnumInputProps>;
    [RandomDescriptionTypes.NUMBER]: FC<NumericInputProps>;
    [RandomDescriptionTypes.OBJECT]: FC<ObjectInputProps>;
    [RandomDescriptionTypes.LINK]: FC<LinkInputProps>;
  };
  Preview: {
    [RandomDescriptionTypes.ENUMERAL]: FC<EnumPreviewProps>;
    [RandomDescriptionTypes.NUMBER]: FC<NumericPreviewProps>;
    [RandomDescriptionTypes.OBJECT]: FC<ObjectPreviewProps>;
    [RandomDescriptionTypes.LINK]: FC<LinkPreviewProps>;
  };
  View: {
    [RandomDescriptionTypes.ENUMERAL]: FC<EnumViewProps>;
    [RandomDescriptionTypes.NUMBER]: FC<NumericViewProps>;
    [RandomDescriptionTypes.OBJECT]: FC<ObjectViewProps>;
    [RandomDescriptionTypes.LINK]: FC<LinkViewProps>;
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
  ],
  Input: {
    [RandomDescriptionTypes.ENUMERAL]: ShouldBeProvided,
    [RandomDescriptionTypes.NUMBER]: ShouldBeProvided,
    [RandomDescriptionTypes.OBJECT]: ShouldBeProvided,
    [RandomDescriptionTypes.LINK]: ShouldBeProvided,
  },
  Preview: {
    [RandomDescriptionTypes.ENUMERAL]: ShouldBeProvided,
    [RandomDescriptionTypes.NUMBER]: ShouldBeProvided,
    [RandomDescriptionTypes.OBJECT]: ShouldBeProvided,
    [RandomDescriptionTypes.LINK]: ShouldBeProvided,
  },
  View: {
    [RandomDescriptionTypes.ENUMERAL]: ShouldBeProvided,
    [RandomDescriptionTypes.NUMBER]: ShouldBeProvided,
    [RandomDescriptionTypes.OBJECT]: ShouldBeProvided,
    [RandomDescriptionTypes.LINK]: ShouldBeProvided,
  },
});

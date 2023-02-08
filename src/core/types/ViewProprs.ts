import { RandomDescriptionTypes } from "../../types";

interface BaseViewProps {
  computing: boolean;
}

export interface NumericViewProps extends BaseViewProps {
  min: number;
  max: number;
}
export interface EnumViewProps extends BaseViewProps {
  enums: string[];
}

export interface LinkViewProps extends BaseViewProps {
  linkId: string;
}

export interface ObjectViewProps extends BaseViewProps {
  object: Record<
    string,
    {
      type: RandomDescriptionTypes;
      props: RandomViewProps;
    }
  >;
}

export interface RandomRepeatRandomsViewProps extends BaseViewProps {
  repeatCount: NumericViewProps;
  random: {
    type: RandomDescriptionTypes;
    props: RandomViewProps;
  };
}

export type RandomViewProps =
  | NumericViewProps
  | EnumViewProps
  | ObjectViewProps
  | LinkViewProps
  | RandomRepeatRandomsViewProps;

import { RandomDescriptionTypes } from "../../types";

interface BasePreviewProps {}

export interface NumericPreviewProps extends BasePreviewProps {
  min: number;
  max: number;
}
export interface EnumPreviewProps extends BasePreviewProps {
  enums: string[];
}
export interface ObjectPreviewProps extends BasePreviewProps {
  object: Record<
    string,
    {
      type: RandomDescriptionTypes;
      props: RandomPreviewProps;
    }
  >;
}

export interface LinkPreviewProps extends BasePreviewProps {
  linkId: string;
}

export interface RandomRepeatRandomsPreviewProps extends BasePreviewProps {
  repeatCount: NumericPreviewProps;
  random: {
    type: RandomDescriptionTypes;
    props: RandomPreviewProps;
  };
}

export type RandomPreviewProps =
  | NumericPreviewProps
  | EnumPreviewProps
  | ObjectPreviewProps
  | LinkPreviewProps
  | RandomRepeatRandomsPreviewProps;

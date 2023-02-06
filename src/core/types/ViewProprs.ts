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
export interface ObjectViewProps extends BaseViewProps {
  object: Record<
    string,
    {
      type: RandomDescriptionTypes;
      props: NumericViewProps | EnumViewProps | ObjectViewProps;
    }
  >;
}

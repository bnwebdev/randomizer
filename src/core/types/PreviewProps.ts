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
      props: NumericPreviewProps | EnumPreviewProps | ObjectPreviewProps;
    }
  >;
}

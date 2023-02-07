import { FC, PropsWithChildren } from "react";
import { RandomDescriptionTypes } from "../../types";
import { EnumInput } from "../Enum/components/input";
import { EnumPreview } from "../Enum/components/preview";
import { EnumView } from "../Enum/components/view";
import { LinkInput } from "../Link/components/input";
import { LinkPreview } from "../Link/components/preview";
import { LinkView } from "../Link/components/view";
import { NumericInput } from "../Numeric/components/input";
import { NumericPreview } from "../Numeric/components/preview";
import { NumericView } from "../Numeric/components/view";
import { ObjectInput } from "../Object/components/input";
import { ObjectPreview } from "../Object/components/preview";
import { ObjectView } from "../Object/components/view";
import { RandomComponentFactoryContext } from "./RandomComponentFactoryContext";

const context = {
  TYPES: [
    RandomDescriptionTypes.ENUMERAL,
    RandomDescriptionTypes.NUMBER,
    RandomDescriptionTypes.OBJECT,
  ],
  Input: {
    [RandomDescriptionTypes.ENUMERAL]: EnumInput,
    [RandomDescriptionTypes.NUMBER]: NumericInput,
    [RandomDescriptionTypes.OBJECT]: ObjectInput,
    [RandomDescriptionTypes.LINK]: LinkInput,
  },
  Preview: {
    [RandomDescriptionTypes.ENUMERAL]: EnumPreview,
    [RandomDescriptionTypes.NUMBER]: NumericPreview,
    [RandomDescriptionTypes.OBJECT]: ObjectPreview,
    [RandomDescriptionTypes.LINK]: LinkPreview,
  },
  View: {
    [RandomDescriptionTypes.ENUMERAL]: EnumView,
    [RandomDescriptionTypes.NUMBER]: NumericView,
    [RandomDescriptionTypes.OBJECT]: ObjectView,
    [RandomDescriptionTypes.LINK]: LinkView,
  },
};

export const RandomComponentFactoryProvider: FC<PropsWithChildren> = ({
  children,
}) => (
  <RandomComponentFactoryContext.Provider value={context}>
    {children}
  </RandomComponentFactoryContext.Provider>
);

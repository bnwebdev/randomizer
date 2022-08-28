import { FC } from "react";
import { useTranslation } from "../hooks";

const Serialize: FC = () => <h1>{useTranslation()('notImplemented') as string}</h1>;

export default Serialize;

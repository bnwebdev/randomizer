import { FC } from "react";

type Props = {
  error?: string;
};

const ErrorPrinter: FC<Props> = ({ error }) => {
  if (!error) {
    return null;
  }

  return (
    <h3 className="text-light bg-danger p-2 text-center rounded">{error}</h3>
  );
};

export default ErrorPrinter;

import { FC, useEffect, useRef, useState } from "react";
import { RootView } from "../../Root/view";
import { RandomRepeatRandomsViewProps } from "../../types";
import { NumericComputor } from "../../Numeric/computor";
import { RandomDescriptionTypes } from "../../../types";
import { useComputing } from "../../../hooks";
import { COMPUTING_VALUE_TIME } from "../../constants";
import { ListGroup } from "react-bootstrap";

export const RandomRepeatRandomsView: FC<RandomRepeatRandomsViewProps> = ({
  random,
  repeatCount,
  computing,
}) => {
  const computor = useRef(
    new NumericComputor(repeatCount.min, repeatCount.max)
  );
  const [repeatCountResult, setRepeatCountResult] = useState(
    () => computor.current.makeRandom().result
  );

  const { compute, computing: deepComputing } = useComputing(
    COMPUTING_VALUE_TIME,
    false
  );

  useEffect(() => {
    setRepeatCountResult(computor.current.makeRandom().result);
    compute();
  }, [computing, compute]);

  return (
    <>
      {computing ? (
        <RootView
          type={RandomDescriptionTypes.NUMBER}
          {...repeatCount}
          computing
        />
      ) : null}
      {computing ? null : (
        <ListGroup numbered>
          {new Array(repeatCountResult).fill(0).map((_, idx) => (
            <ListGroup.Item>
              <RootView
                key={idx}
                type={random.type}
                {...(random.props as any)}
                computing={deepComputing}
              />
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>
  );
};

import { FC } from "react";
import { RandomDexie } from "../../../database";
import { useDexie } from "../../../hooks";
import { RootView } from "../../Root/view";
import { LinkViewProps } from "../../types";
import { prepareRandomDescriptionViewProps } from "../../utils/prepareRandomDescriptionViewProps";

export const LinkView: FC<LinkViewProps> = ({ linkId, computing }) => {
  const desctiption = useDexie(
    async (db: RandomDexie) => {
      const link = await db.randomLinks.get(linkId);

      return link && db.randoms.get(link.descriptionId);
    },
    [linkId]
  );

  return (
    <>
      {desctiption?.randomDescriptions.map((d, idx) => (
        <RootView
          key={idx}
          type={d.type}
          {...(prepareRandomDescriptionViewProps(d, computing) as any)}
        />
      ))}
    </>
  );
};

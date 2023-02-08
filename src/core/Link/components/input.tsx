import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Form } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { RandomDexie, RandomLinkStatus } from "../../../database";
import { useDexie, useLazyDexie, useTranslation } from "../../../hooks";
import { createId } from "../../../utils/createId";
import { LinkInputProps } from "../../types";

export const LinkInput: FC<LinkInputProps> = ({ forUseFormName }) => {
  const t = useTranslation();
  const linkId = useMemo(() => createId(), []);

  const { setValue } = useFormContext();

  useEffect(() => {
    setValue(`${forUseFormName}.linkId`, linkId);
  }, [linkId, setValue, forUseFormName]);

  const [selectedId, setSelectedId] = useState<number>();

  useDexie(async (db) => {
    await db.randomLinks
      .where({ status: RandomLinkStatus.DRAFT })
      .and(({ createdAt }) => {
        const date = new Date();
        date.setDate(date.getDate() - 1);

        return createdAt < +date;
      })
      .delete();
  }, []);

  useDexie(
    (db) =>
      db.randomLinks.put({
        id: linkId,
        descriptionId: -1,
        creatorDescriptionId: -1,
        status: RandomLinkStatus.DRAFT,
        createdAt: Date.now(),
      }),
    [linkId]
  );

  const updateDescriptionIdQuery = useCallback(
    (db: RandomDexie, descriptionId: number) =>
      db.randomLinks.update(linkId, { descriptionId }),
    [linkId]
  );

  const [updateDescriptionId] = useLazyDexie(updateDescriptionIdQuery);

  useEffect(() => {
    if (selectedId) {
      updateDescriptionId(selectedId);
    }
  }, [selectedId, updateDescriptionId]);

  const randoms = useDexie((db) => db.randoms.toArray(), []);

  if (!randoms) {
    return <h1>{t("homePage.loadingData") as string}</h1>;
  }

  if (randoms.length === 0) {
    return <h1>{t("homePage.nothing") as string}</h1>;
  }

  return (
    <Form.Select
      value={selectedId}
      onChange={(e) => setSelectedId(+e.target.value)}
    >
      <option key="index" disabled={!!selectedId}>
        Choose random
      </option>
      {randoms.map(({ id, name }) => (
        <option key={id} value={id}>
          {name}#{id}
        </option>
      ))}
    </Form.Select>
  );
};

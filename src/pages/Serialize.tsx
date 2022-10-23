import path from "path-browserify";

import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Form, ListGroup, ListGroupItem } from "react-bootstrap";
import { ErrorPrinter } from "../components";
import { Link } from "../components/UI";
import { deserialize, getAcceptedFileFormatsByFormat } from "../computors";
import { useLazyDexie, useLogs, useTranslation } from "../hooks";
import { DB, SupportedSerializeFormat } from "../types";

const allFormats = Object.values(SupportedSerializeFormat)

const Serialize: FC = () => {
    const t = useTranslation()
    const [format, setFormat] = useState<SupportedSerializeFormat>(SupportedSerializeFormat.JSON)
    const [file, setFile] = useState<File>()
    const { logs, pushLog } = useLogs(10)

    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleInput = async () => {
        const files = fileInputRef?.current?.files || []
        setFile(files[0])
    }

    const uploadFileQuery = useCallback(async (db: DB, file: File) => {
        const name = path.parse(file.name).name
        try {
            const result = await new Promise<string>((resolve, reject) => {
                const reader = new FileReader()
                reader.onerror = reject;
                reader.onloadend = () => resolve(reader.result as string);

                reader.readAsText(file, 'utf-8')
            })

            const randomDescriptions = await deserialize(format, result)

            const descriptionId = await db.randoms.add({ randomDescriptions, name })
            pushLog(t('serializePage.upload.successLog', { name }), { descriptionId })
        } catch (err) {
            pushLog(t('serializePage.upload.errorLog', { name }))
            console.error(err)

            throw err
        } finally {
            setFile(void 0)
        }

    }, [format, pushLog, t])

    const [uploadFile, { error, loading, called }] = useLazyDexie(uploadFileQuery)

    useEffect(() => {
        file && !loading && !called && uploadFile(file)
    }, [file, loading, uploadFile, called])

    return (
        <>
            {t('serializePage.upload.description')}
            
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>{t('serializePage.formatLabel') as string}</Form.Label>
                <Form.Select
                    disabled={allFormats.length <= 1 && !loading}
                    value={format}
                    onChange={e=> setFormat(e.currentTarget.value as SupportedSerializeFormat)}
                >
                    {allFormats.map(
                        (format) => (
                            <option key={format} value={format}>
                                {t(`serializePage.format.${format}`) as string}
                            </option>
                        )
                    )}
                </Form.Select>
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>{t('serializePage.upload.fileLabel') as string}</Form.Label>
                <Form.Control
                    ref={fileInputRef}
                    onChange={handleInput}
                    type="file"
                    disabled={loading}
                    accept={getAcceptedFileFormatsByFormat(format).join(', ')}
                />
            </Form.Group>
            <ErrorPrinter error={error?.message} />
            <ListGroup>
                {logs.map(({ text, id, context }) => <>
                    { context.descriptionId
                        ? <ListGroupItem key={id}>
                            {text}.
                            <Link
                                to={`/randoms/${context.descriptionId}`}
                                label={t('serializePage.upload.seeResult')}
                                linkProps={{className: "green-link"}}
                            />
                        </ListGroupItem>
                        : <ListGroupItem key={id}>{text}</ListGroupItem>
                    }
                </>
                )}
            </ListGroup>
        </>
    )
}

export default Serialize;

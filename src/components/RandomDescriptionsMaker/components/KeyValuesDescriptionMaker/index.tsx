import { FC, useState } from "react"
import { Form } from "react-bootstrap"
import ArrayStringInput from "./components/ArrayStringInput"

const KeyValuesDescriptionMaker: FC = () => {
    const [keys, setKeys] = useState([])
    const [values, setValues] = useState([])

    return <>
        <Form.Check label="Repeated?" />
        <ArrayStringInput items={keys} onChange={() => void 0} badgeProps={{ bg: 'success', text: 'light' }} /><br />
        <ArrayStringInput items={values} onChange={() => void 0} badgeProps={{ bg: 'danger', text: 'light' }}/>
    </>
}

export default KeyValuesDescriptionMaker
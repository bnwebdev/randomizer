import { FC, useState } from "react";
import { Badge, BadgeProps, Modal } from "react-bootstrap";
import { PlusCircleDotted } from "react-bootstrap-icons";

type Props = {
    items: string[]
    onChange: (newItems: string[]) => void
    badgeProps?: BadgeProps
}

const ArrayStringInput: FC<Props> = ({ items, onChange, badgeProps = {}}) => {
    const [idxToChange, setIdxToChange] = useState<number | null>(null)
    const [show, setShow] = useState(false)

    return <>
        {items.map((item, idx) => <Badge
            key={item + idx}
            {...badgeProps}
            onClick={() => setIdxToChange(idx)}
            className="btn"
          >
            {item || "nothing"}
          </Badge>)}
        <Badge
            pill
            onClick={() => setShow(true)}
            {...badgeProps}
            className="btn p-1"
        >
            <PlusCircleDotted size={32} />
        </Badge>
        <Modal show={show} onHide={() => setShow(false)}>

        </Modal>
    </>
}

export default ArrayStringInput
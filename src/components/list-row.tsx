// import dependencies
import React from 'react'

// create interfaces
interface PartsListRowUI {
    position: number;
    part: {
        id: number;
        name: string;
        count: number;
        url: string;
    }
    handlePartRemove: (id: number, name: string) => void;
    handlePartUpdateCount: (id: number, name: string, count: number) => void;
}

// create PartsListRow component
export const PartsListRow = (props: PartsListRowUI) => (
    <tr className="table-row">
        <td className="table-item">
            {props.position}
        </td>

        <td className="table-item">
            {props.part.name}
        </td>

        <td className="table-item">
            {props.part.count}
        </td>

        <td className="table-item">
            {props.part.url}
        </td>

        <td className="table-item">
            <button
                className="btn btn-plus"
                onClick={() => props.handlePartUpdateCount(props.part.id, props.part.name, Number(props.part.count) + 1)}>
                +
            </button>
            <button
                className="btn btn-minus"
                onClick={() => props.handlePartUpdateCount(props.part.id, props.part.name, Number(props.part.count) - 1)}>
                -
            </button>
        </td>
        <td className="table-item">
            <button
                className="btn btn-remove"
                onClick={() => props.handlePartRemove(props.part.id, props.part.name)}>
                Remove part
            </button>
        </td>
    </tr>
)
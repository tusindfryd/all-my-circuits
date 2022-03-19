// import dependencies
import React from 'react'

// create interfaces
interface PartsListRowUI {
    position: number;
    part: {
        id: number;
        name: string;
        count: number;
        notes: string;
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
            <button
                className="btn-plus"
                onClick={() => props.handlePartUpdateCount(props.part.id, props.part.name, Number(props.part.count) + 1)}>➕</button>
            <button
                className="btn-minus"
                onClick={() => props.handlePartUpdateCount(props.part.id, props.part.name, Number(props.part.count) - 1)}>➖</button>
        </td>

        <td className="table-item">
            <div className="mb-3 row">
                {
                    props.part.notes.split(",").map((note: string) => {
                        return (
                            <span key={note} className="badge bg-info col-auto">{note}
                                <button type="button" className="btn-close" aria-label="Remove"></button>
                            </span>
                        )
                    })
                }
                <div className="col-auto">
                    <input className="form-control form-control-sm-1" type="text" id="notes" name="text" onChange={(e) => console.log(e.currentTarget.value)} />
                </div>
            </div>
        </td>

        <td className="table-item">
            <button
                className="btn-remove"
                onClick={() => props.handlePartRemove(props.part.id, props.part.name)}>🗑️</button>
        </td>
    </tr>
)
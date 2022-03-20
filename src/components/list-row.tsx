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
    handleNewNote: (id: number, note: string) => void;
    handleNoteRemoval: (id: number, note: string) => void;
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
            <div className="row">
                {
                    props.part.notes
                        .split(",")
                        .filter((note: string) => note !== "")
                        .map((note: string) => {
                            return (
                                <span key={note} className="badge bg-info col-auto">{note}
                                    <button type="button" className="btn-close btn-close-white" aria-label="Remove" onClick={() => props.handleNoteRemoval(props.part.id, note)}></button>
                                </span>
                            )
                        })
                }
                <div className="col-auto">
                    <input className="form-control form-control-sm-1"
                        type="text"
                        id="notes"
                        name="text"
                        onKeyDown={
                            (e: any) => {
                                if (e.key === "Enter") {
                                    props.handleNewNote(props.part.id, String(e.currentTarget.value))
                                }
                            }
                        } />
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
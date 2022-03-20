// import dependencies
import React from 'react'

// import components
import { PartsListRow } from './list-row'

// import styles
import './../styles/styles.scss'

// create interfaces
interface PartUI {
  id: number;
  name: string;
  count: number;
  notes: string;
}

interface PartListUI {
  parts: PartUI[];
  loading: boolean;
  handlePartRemove: (id: number, title: string) => void;
  handlePartUpdateCount: (id: number, name: string, count: number) => void;
  handleNewNote: (id: number, note: string) => void;
}

// create PartList component
export const PartList = (props: PartListUI) => {
  // show loading message
  if (props.loading) {
    return (
      <div className="d-flex justify-content-center m-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }
  else if (props.parts.length > 0) {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th className="table-head-item"> # </th>

            <th className="table-head-item">Name</th>

            <th className="table-head-item">Count</th>

            <th className="table-head-item">Notes</th>

            <th className="table-head-item" />

          </tr>
        </thead>

        <tbody className="table-body">

          {props.parts.map((part: PartUI, idx) => (
            <PartsListRow
              key={part.id}
              part={part}
              position={idx + 1}
              handlePartRemove={props.handlePartRemove}
              handlePartUpdateCount={props.handlePartUpdateCount}
              handleNewNote={props.handleNewNote}
            />
          ))}
        </tbody>
      </table>
    )
  }
  else {
    return (
      <p>There are no parts to show.</p>
    )
  }
}
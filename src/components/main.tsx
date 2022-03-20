// import dependencies
import React, { useEffect, useState } from 'react'
import axios from 'axios'

// import components
import { PartList } from './list'

// import styles
import './../styles/styles.scss'

// create Main component
export const Main = () => {
    // prepare states
    const [name, setName] = useState('')
    const [count, setCount] = useState('')
    const [notes, setNotes] = useState('')
    const [parts, setParts] = useState([])
    const [loading, setLoading] = useState(true)

    // fetch all parts on initial render
    useEffect(() => {
        fetchParts()
    }, [])

    // fetch all parts
    const fetchParts = async (keyword?: string) => {
        keyword = keyword ? keyword : ""
        // send GET request to 'parts/all' endpoint
        axios
            .get('http://localhost:4001/parts/all', { params: { keyword: keyword } })
            .then(response => {
                // update the parts state
                setParts(response.data)

                // update loading state
                setLoading(false)
            })
            .catch(error => console.error(`There was an error retrieving the part list: ${error}`))
    }

    // reset all input fields
    const handleInputsReset = () => {
        setName('')
        setCount('')
        setNotes('')
    }

    // create new part
    const handlePartCreate = () => {
        // send POST request to 'parts/create' endpoint
        axios
            .post('http://localhost:4001/parts/create', {
                name: name,
                count: count,
                notes: notes
            })
            .then(res => {
                console.log(res.data)

                // fetch all parts to refresh the parts on the part list
                fetchParts()
            })
            .catch(error => console.error(`There was an error creating ${name}: ${error}`))
    }

    // submit new part
    const handlePartSubmit = () => {
        // check if all fields are filled
        if (name.length > 0) {
            // create new part
            handlePartCreate()

            console.info(`${name} added.`)

            // reset all input fields
            handleInputsReset()
        }
    }

    // remove part
    const handlePartRemove = (id: number, name: string) => {
        // send PUT request to 'parts/delete' endpoint
        axios
            .put('http://localhost:4001/parts/delete', { id: id })
            .then(() => {
                console.log(`Part ${name} removed.`)

                // fetch all parts to refresh the parts on the part list
                fetchParts()
            })
            .catch(error => console.error(`There was an error removing ${name}: ${error}`))
    }

    // update part count
    const handlePartUpdateCount = (id: number, name: string, count: number) => {
        if (count > 0) {
            // send PUT request to 'parts/update' endpoint
            axios
                .put('http://localhost:4001/parts/update', { id: id, count: count, fieldName: "count", type: "overwrite" })
                .then(() => {
                    console.log(`Count of ${name} updated.`)

                    // fetch all parts to refresh the parts on the part list
                    fetchParts()
                })
                .catch(error => console.error(`There was an error updating the count of ${name}: ${error}`))
        } else {
            handlePartRemove(id, name);
        }
    }

    // remove note
    const handleNoteRemoval = (id: number, note: string) => {
        axios
            .put('http://localhost:4001/parts/update', { id: id, notes: note, fieldName: "notes", type: "cut" })
            .then(() => {
                console.log(`Note removed.`)

                // fetch all parts to refresh the parts on the part list
                fetchParts()
            })
            .catch(error => console.error(`There was an error removing the note: ${error}`))
    }

    const handleNewNote = (id: number, note: string) => {
        // send PUT request to 'parts/update' endpoint
        axios
            .put('http://localhost:4001/parts/update', { id: id, notes: note, fieldName: "notes", type: "concat" })
            .then(() => {
                console.log(`Note updated.`)

                // fetch all parts to refresh the parts on the part list
                fetchParts()
            })
            .catch(error => console.error(`There was an error updating the count of ${name}: ${error}`))
    }

    // reset part list (remove all parts)
    const handleListReset = () => {
        // send PUT request to 'parts/reset' endpoint
        axios.put('http://localhost:4001/parts/reset')
            .then(() => {
                // fetch all parts to refresh the parts on the part list
                fetchParts()
            })
            .catch(error => console.error(`There was an error resetting the part list: ${error}`))
    }

    return (
        <main className="container-sm py-5">
            {/* form for creating new part */}
            <form className="container" onSubmit={(event) => { handlePartSubmit(); event.preventDefault(); }}>
                <div className="row">
                    <div className="col">
                        <fieldset>
                            <label className="form-label" htmlFor="name">Name:</label>
                            <input className="form-control" type="text" required id="name" name="name" value={name} onChange={(e) => setName(e.currentTarget.value)} />
                        </fieldset>
                    </div>
                    <div className="col col-3">
                        <fieldset>
                            <label className="form-label" htmlFor="count">Count:</label>
                            <input className="form-control" type="number" required min="1" step="1" id="count" name="count" value={count} onChange={(e) => setCount(e.currentTarget.value)} />
                        </fieldset>
                    </div>
                </div>
                <fieldset>
                    <label className="form-label" htmlFor="url">Notes:</label>
                    <input className="form-control" type="text" id="notes" name="text" value={notes} onChange={(e: any) => setNotes(e.currentTarget.value)} />
                </fieldset>

                <button type="submit" className="my-3 btn btn-primary">Add the part</button>

            </form>
            <hr />
            <form className="container" onSubmit={(e) => e.preventDefault()}>
                <fieldset>
                    <label className="form-label" htmlFor="keyword">Filter by name:</label>
                    <input className="form-control" type="text" id="keyword" name="keyword" onChange={(e) => fetchParts(e.currentTarget.value)} />
                </fieldset>
            </form>

            {/* render part list component */}
            <PartList parts={parts} loading={loading} handlePartRemove={handlePartRemove} handlePartUpdateCount={handlePartUpdateCount} handleNewNote={handleNewNote} handleNoteRemoval={handleNoteRemoval} />

            {/* show reset button if list contains at least one part */}
            {parts.length > 0 && (
                <button className="btn btn-warning" onClick={handleListReset}>Remove all elements</button>
            )}
        </main>
    )
}
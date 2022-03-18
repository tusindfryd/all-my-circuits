// import dependencies
import React, { useEffect, useState } from 'react'
import axios from 'axios'

// import components
import { PartList } from './list'

// import styles
// import './../styles/part.css'

// create Part component
export const Main = () => {
    // prepare states
    const [name, setName] = useState('')
    const [count, setCount] = useState('')
    const [url, setURL] = useState('')
    const [parts, setParts] = useState([])
    const [loading, setLoading] = useState(true)

    // fetch all parts on initial render
    useEffect(() => {
        fetchParts()
    }, [])

    // fetch all parts
    const fetchParts = async () => {
        // send GET request to 'parts/all' endpoint
        axios
            .get('http://localhost:4001/parts/all')
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
        setURL('')
    }

    // create new part
    const handlePartCreate = () => {
        // send POST request to 'parts/create' endpoint
        axios
            .post('http://localhost:4001/parts/create', {
                name: name,
                count: count,
                url: url
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
        // send PUT request to 'parts/update' endpoint
        axios
            .put('http://localhost:4001/parts/update', { id: id, count: count })
            .then(() => {
                console.log(`Count of ${name} updated.`)

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
        <div className="part-list-wrapper">
            {/* Form for creating new part */}
            <div className="part-list-form">
                <div className="form-wrapper" onSubmit={handlePartSubmit}>
                    <div className="form-row">
                        <fieldset>
                            <label className="form-label" htmlFor="name">Enter name:</label>
                            <input className="form-input" type="text" id="name" name="name" value={name} onChange={(e) => setName(e.currentTarget.value)} />
                        </fieldset>

                        <fieldset>
                            <label className="form-label" htmlFor="count">Enter count:</label>
                            <input className="form-input" type="number" id="count" name="count" value={count} onChange={(e) => setCount(e.currentTarget.value)} />
                        </fieldset>
                    </div>

                    <div className="form-row">
                        <fieldset>
                            <label className="form-label" htmlFor="url">Enter Octopart URL:</label>
                            <input className="form-input" type="url" id="url" name="url" value={url} onChange={(e) => setURL(e.currentTarget.value)} />
                        </fieldset>
                    </div>
                </div>

                <button onClick={handlePartSubmit} className="btn btn-add">Add the part</button>
            </div>

            {/* Render part list component */}
            <PartList parts={parts} loading={loading} handlePartRemove={handlePartRemove} handlePartUpdateCount={handlePartUpdateCount}/>

            {/* Show reset button if list contains at least one part */}
            {parts.length > 0 && (
                <button className="btn btn-reset" onClick={handleListReset}>Reset parts list.</button>
            )}
        </div>
    )
}
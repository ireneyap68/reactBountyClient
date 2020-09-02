import React, { useState } from 'react'
import NewBountyForm from "./NewBountyForm";

const ShowBounty = (props) => {
    //State Declarations
    const [showForm, setShowForm] = useState(false)

    let display = <h3>Crime is on the rise</h3>
    let form = ''

    if(props.current.name){
        // Instead of using index in map, you can also just use a unique field from your data as a key
        let hunters = props.current.hunters.map(hunter => <li key={hunter._id}>{hunter.name}</li>)
        let hunterRender = props.current.hunters[0] ? <ul>{hunters}</ul> : "No Assigned Hunters"
        // Create both buttons for edit form
        let edit = <button onClick={() => {setShowForm(true)}}>Edit</button>
        let cancel = <button onClick={() => {setShowForm(false)}}>Cancel</button>
        // Edit button logical
        let button = !showForm ? edit : cancel

        // If showing edit form render NewBountyForm
        if (showForm) {
            form = <NewBountyForm current={props.current} refreshBounties={props.refreshBounties} />
        }

        // Change display to be our html info if we have current bounty info
        display = (
            <div className="show-bounty">
                <h2>{props.current.name}</h2>
                <h3>Wanted For: {props.current.wantedFor}</h3>
                <p>Hunters: </p>
                {hunterRender}
                <p>Last seen on the <strong>{props.current.ship}</strong></p>
                <p><strong>STATUS:</strong> {props.current.captured ? 'CAUGHT' : 'AT LARGE'}</p>
                {button}
                {form}
            </div>
        )
    }

    return (
        <>
            {display}
        </>
    )
}

export default ShowBounty
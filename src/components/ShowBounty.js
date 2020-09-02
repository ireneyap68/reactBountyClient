import React, { useState } from 'react'
import NewBountyForm from "./NewBountyForm";

const ShowBounty = (props) => {
    const [showForm, setShowForm] = useState(false)
    let display = <h3>Crime is on the rise</h3>
    let form = ''

    if(props.current.name){
        let hunters = props.current.hunters.map(hunter => <li key={hunter.name}>{hunter.name}</li>)
        let hunterRender = props.current.hunters[0] ? <ul>{hunters}</ul> : "No Assigned Hunters"
        let edit = <button onClick={() => {setShowForm(true)}}>Edit</button>
        let cancel = <button onClick={() => {setShowForm(false)}}>Cancel</button>
        let button = !showForm ? edit : cancel

        if (showForm) {
            form = <NewBountyForm current={props.current} refreshBounties={props.refreshBounties} />
        }

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
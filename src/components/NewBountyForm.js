import React, { useState } from 'react'

const NewBountyForm = (props) => {
    const [id, setId] = useState(props.current._id || "")
    const [name, setName] = useState(props.current.name || "")
    const [client, setClient] = useState(props.current.client || "")
    const [wantedFor, setWantedFor] = useState(props.current.wantedFor || "")
    const [ship, setShip] = useState(props.current.ship || "")
    const [reward, setReward] = useState(props.current.reward || 0)
    const [captured, setCaptured] = useState(props.current.captured || false)

    const submitForm = (e) => {
        e.preventDefault()
        let whichMethod = id ? "PUT" : "POST"
        fetch('http://localhost:8000/bounties/'+id, {
            method: whichMethod,
            body: JSON.stringify({
                name,
                client,
                wantedFor,
                ship,
                reward,
                captured
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then((result) => {
                setName('')
                setClient('')
                setWantedFor('')
                setShip('')
                setReward('')
                setCaptured(false)
            })
            .then(() => {
                console.log("WOW")
                props.refreshBounties()
            })
            .catch(err => {
                console.log(`Failed to ${whichMethod} the bounty:\n ${err}`)
            })
    }

    return(
        <div className="bounty-form">
            <h2>{id ? "Edit Bounty" : "Add New Bounty"}</h2>
            <form onSubmit={submitForm}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input name="name" type="text" value={name} onChange={(e) => {setName(e.target.value)}}/>
                </div>
                <div>
                    <label htmlFor="wantedFor">Wanted For:</label>
                    <input name="wantedFor" type="text" value={wantedFor} onChange={(e) => {setWantedFor(e.target.value)}}/>
                </div>
                <div>
                    <label htmlFor="client">Client:</label>
                    <input name="client" type="text" value={client} onChange={(e) => {setClient(e.target.value)}}/>
                </div>
                <div>
                    <label htmlFor="reward">Reward:</label>
                    <input name="reward" type="text" value={reward} onChange={(e) => {setReward(Number(e.target.value))}}/>
                </div>
                <div>
                    <label htmlFor="ship">Ship:</label>
                    <input name="ship" type="text" value={ship} onChange={(e) => {setShip(e.target.value)}}/>
                </div>
                <div>
                    <label htmlFor="captured">Captured:</label>
                    <input name="captured" type="checkbox" checked={captured} onChange={(e) => {setCaptured(e.target.checked)}}/>
                </div>
                <input type="submit" value="Bountify!"/>
            </form>
        </div>
    )
}

export default NewBountyForm
import React from 'react'

const Poster = (props) => {
    let more = <button onClick={() => {props.onClick(props.bounty)}}>More</button>
    let less = <button onClick={() => {props.onClick({})}}>Less</button>
    let button = props.bounty._id === props.currentId ? less : more

    return(
        <>
            <div className="poster">
                <h2>WANTED</h2>
                <h3>{props.bounty.name}</h3>
                <h4>{props.bounty.reward}</h4>
                {button}
                <button onClick={() => {props.handleDelete(props.bounty._id)}} >Delete</button>
            </div>
        </>
    )
}

export default Poster
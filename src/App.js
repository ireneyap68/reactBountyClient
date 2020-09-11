require('dotenv').config()
import React, { useState, useEffect } from 'react';
import './App.css';
import Poster from "./components/Poster";
import ShowBounty from "./components/ShowBounty";
import NewBountyForm from "./components/NewBountyForm";

const App = () => {
  // State Declarations
  const [current, setCurrent] = useState({})
  const [bounties, setBounties] = useState([])
  const [showForm, setShowForm] = useState(false)

  const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL

  // Same as calling DidComponentMount
  useEffect(() => {
    getBounties()
  }, [])

  // Query our api for all bounties and pass to our state
  // On refreshBounties if we have a current bounty state set, clear it
  const getBounties = () => {
    fetch('process.env.REACT_APP_SERVER_URL')
        .then(res => res.json())
        .then(bounties => {
          console.log(bounties)
          setBounties(bounties)
          if(current.name) {
              setCurrent({})
          }
        })
        .catch(err => {
          console.log("Error while fetching bounties:", err)
        })
  }

  // Change current bounty when we click on a different bounty
  const changeCurrent = (bounty) => {
      console.log("Bounty:", bounty)
      setCurrent(bounty)
      setShowForm(false)
  }

  // Delete selected bounty from database using DELETE method in API
  const deleteBounty = (bountyId) => {
      fetch('http://localhost:8000/bounties/' + bountyId, {
          method: 'delete'
      })
          .then(response => {
              console.log(response)
              getBounties()
          })
          .catch(err => {
              console.log("Error while deleting bounty:", err)
          })
  }

  const toggleForm = () => {
      let formState = !showForm
      setShowForm(formState)
  }

  // Map bounties and convert to an array of Poster componenets
  let posters = bounties.map(bounty => <Poster key={bounty.name} bounty={bounty} currentId={current._id} onClick={changeCurrent} handleDelete={deleteBounty}/>)

  return (
      <>
        <header className="App-header">
          <h1>Wanted Poster Bulletin Board</h1>
          <p>
            Reduce crime in your neighborhood!
          </p>
        </header>
        <main>
            {posters}
            <ShowBounty showForm={showForm} toggleForm={toggleForm} current={current} refreshBounties={getBounties}/>
            <NewBountyForm current={{}} refreshBounties={getBounties}/>
        </main>
      </>
  )
}

export default App;

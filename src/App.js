import React, { useState, useEffect } from 'react';
import './App.css';
import Poster from "./components/Poster";
import ShowBounty from "./components/ShowBounty";
import NewBountyForm from "./components/NewBountyForm";

const App = () => {
  const [current, setCurrent] = useState({})
  const [bounties, setBounties] = useState([])

  useEffect(() => {
    getBounties()
  }, [])

  const getBounties = () => {
    fetch('http://localhost:8000/bounties')
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

  const changeCurrent = (bounty) => {
      console.log("Bounty:", bounty)
      setCurrent(bounty)
  }

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
            <ShowBounty current={current} refreshBounties={getBounties}/>
            <NewBountyForm current={{}} refreshBounties={getBounties}/>
        </main>
      </>
  )
}

export default App;

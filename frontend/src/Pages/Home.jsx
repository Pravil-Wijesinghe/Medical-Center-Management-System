import React from 'react'
import bgImage1 from '../Images/bgImage1.png'
import NavBar from '../Components/NavBar'

function Home() {
  return (
    <div style={{backgroundImage: `url(${bgImage1})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>
      <NavBar/>
    </div>
  )
}

export default Home

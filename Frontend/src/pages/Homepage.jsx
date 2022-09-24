import React from 'react'
import { Link } from 'react-router-dom'
import '../components/css/Homepage.css'

function Homepage() {
  return (
    <div>
      <h1 className='title-text'>Homepage</h1>
      <Link to = '/createproject'>
        <button className='title-text-btn'> Create Project</button>
      </Link>
    </div>
  )
}

export default Homepage
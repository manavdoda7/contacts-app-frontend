

import React from 'react'
import { Link } from 'react-router-dom'

const Homepage = () => {
  return (
    <div>
        <div class="p-5 mb-4 bg-light rounded-3">
      <div class="container-fluid py-5">
        <h1 class="display-5 fw-bold">Contacts App</h1>
        <p class="col-md-8 fs-4">An app to manage your contacts at one place</p>
        <Link class="btn btn-primary btn-lg m-2" to='/register'>Register a new user</Link>
        <Link class="btn btn-primary btn-lg m-2" to='/login'>Login as a user</Link>
      </div>
    </div>
    </div>
  )
}

export default Homepage
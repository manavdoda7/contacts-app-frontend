import React, { useEffect, useState } from 'react'
import {url} from '../../backend'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Button from '../button/button'

const ViewContact = () => {
  let id = useParams().id
  let path = url+'/contact/?_id='+id.toString();
  const edit = (e)=>{
    e.preventDefault();
    window.location.href = '/contact/edit/'+id
  }
  const deleteR = (e)=>{
    e.preventDefault();
    axios.delete(path, {
      headers: {
        authorization: 'Bearer '+localStorage.getItem('token')
      }
    }).then((response)=>{
      console.log(response.data);
      if(response.data.success==false) {
        alert(response.data.message)
        window.location.href = '/dashboard'
      } else {
        alert('Delete success.')
        window.location.href = '/dashboard'
      }
    }).catch(err=>{
      console.log('Error in loading.', err);
      alert('Please try again after sometime.')
      window.location.href = '/dashboard'
    })
  }
  const [detailsCard, setDetailsCard] = useState('Loading....')
  useEffect(() => {
    if(localStorage.getItem('token')!==null && localStorage.getItem('token')!=='none') {
      axios.get(path, {
        headers: {
          authorization: 'Bearer '+localStorage.getItem('token')
        }
      }).then((response)=>{
        console.log(response.data);
        let contact = response.data.contacts[0]
        setDetailsCard(<div>
          <h5>First Name: {contact.first_name}</h5>
          <h5>Last Name: {contact.last_name}</h5>
          <h5>Phone Number: {contact.phone_number}</h5>
          <h5>Email: {contact.email}</h5>
          <h5>LinkedIn URL: {contact.linkedin_url}</h5>
          <p>
            <Button classes='btn m-2 btn-primary' onclick={(e)=>edit(e)} value='Edit'></Button>
            <Button classes='btn m-2 btn-danger' onclick={(e)=>deleteR(e)} value='Delete'></Button>
            </p>
        </div>)
      }).catch(err => {
        console.log(err);
        alert('Please try again after sometime.')
      })
    } else {
      alert('Please login first.')
      window.location.href = 'login'
    }
  }, [])
  
  return (
    <div className='container border round my-5'>
      <h1>Contact Details</h1>
      <hr />
      {detailsCard}
    </div>
  )
}

export default ViewContact
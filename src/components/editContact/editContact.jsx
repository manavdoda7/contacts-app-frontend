import React, { useEffect, useState } from 'react'
import {url} from '../../backend'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Button from '../button/button'

const EditContact = () => {
  let id = useParams().id
  let path = url+'/contact/?_id='+id.toString();
  const discard = (e) =>{
    e.preventDefault();
    window.location.href='/contact/view/'+id
  }
  const save = (e) => {
    e.preventDefault();
    console.log('here');
    let first_name = document.getElementById('first_name').value
    let last_name = document.getElementById('last_name').value
    let email = document.getElementById('email').value
    let phone_number = document.getElementById('phone_number').value
    let linkedin_url = document.getElementById('linkedin_url').value
    axios.patch(path, {
        first_name, last_name, email, phone_number, linkedin_url
      }, {
        headers: {
          authorization: 'Bearer '+localStorage.getItem('token')
        }
      }).then((response)=>{
        console.log(response.data);
        if(response.data.success==false) {
            return alert(response.data.message)
        } else {
            return alert('Save success.')
        }
      }).catch(err=>{
        console.log('Error in loading.', err);
        alert('Please try again after sometime.')
      })
      window.location.href = '/contact/view/'+id
  }
  const [detailsCard, setDetailsCard] = useState('Loading....')
  const [contact, setContact] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    linkedin_url: ''
  })
  useEffect(() => {
    if(localStorage.getItem('token')!==null && localStorage.getItem('token')!=='none') {
      axios.get(path, {
        headers: {
          authorization: 'Bearer '+localStorage.getItem('token')
        }
      }).then((response)=>{
        console.log(response.data);
        if(response.data.success==false) {
            return alert(response.data.message)
        }
        setContact(response.data.contacts[0])
        // setDetailsCard()
      }).catch(err=>{
        console.log('Error in loading.', err);
        alert('Please try again after sometime.')
      })
    } else {
      alert('Please login first.')
      window.location.href = 'login'
    }
  }, [id])
  
  return (
    <div className='container border round my-5'>
      <h1>Contact Details</h1>
      <hr />
      <div>
          <h5>First Name: </h5> <input className='form-control' type="text" value={contact.first_name} id='first_name' onChange={(e)=>{
            setContact({...contact, first_name: e.target.value})
            console.log(e.target.value);
          }} />
          <h5>Last Name: </h5> <input className='form-control' type="text" value={contact.last_name} id='last_name' onChange={(e)=>{
            setContact({...contact, last_name: e.target.value})
            console.log(e.target.value);
          }} />
          <h5>Phone Number: </h5> <input className='form-control' type="text" value={contact.phone_number} id='phone_number'  onChange={(e)=>{
            setContact({...contact, phone_number: e.target.value})
            console.log(e.target.value);
          }} />
          <h5>Email: </h5> <input className='form-control' type="text" value={contact.email} id='email' onChange={(e)=>{
            setContact({...contact, email: e.target.value})
            console.log(e.target.value);
          }} />
          <h5>LinkedIn URL: </h5> <input className='form-control' type="text" value={contact.linkedin_url} id='linkedin_url'  onChange={(e)=>{
            setContact({...contact, linkedin_url: e.target.value})
            console.log(e.target.value);
          }} />
          <p>
            <Button classes='btn m-2 btn-primary' onclick={(e)=>save(e)} value='Save'></Button>
            <Button classes='btn m-2 btn-danger' onclick={(e)=>discard(e)} value='Discard'></Button>
          </p>
        </div>
    </div>
  )
}

export default EditContact
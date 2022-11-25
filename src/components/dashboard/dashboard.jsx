import React, { useEffect, useState } from 'react'
import Button from '../button/button'
import {url} from '../../backend'
import axios from 'axios'
import UploadCSV from '../uploadCsv/uploadcsv';

const onClick = (e, id) => {
  e.preventDefault();
  console.log(id);
  window.location.href = '/contact/view/'+id
}

const allowedExtensions = ["csv"];

const Dashboard = () => {
  const [contacts, setContacts] = useState()
  const [overlay, setOverlay] = useState(<Button type='submit' value='Add new Contacts' onclick={(e)=>uploadButton(e)} classes='btn btn-primary'/>)
  const uploadButton = (e) => {
    e.preventDefault();
    setOverlay(<UploadCSV/>)
  }
  useEffect(() => {
    if(localStorage.getItem('token')!==null && localStorage.getItem('token')!=='none') {
      if(localStorage.getItem('token')!==null && localStorage.getItem('token')!=='none') {
        // console.log(localStorage.getItem('ProviderToken'))
        axios.get(url+'/contact', {
            headers: {
                authorization: 'Bearer '+localStorage.getItem('token')
            }
        }).then((response)=>{
          if(response.data.success) {
            let cards = response.data.contacts.map((contact)=>{
              return (
                <li key={contact._id}>
                  <Button onclick={(e)=>onClick(e, contact._id)} value={<h4>{contact.first_name + " " + contact.last_name}</h4>} classes='btn'></Button>
                </li>
              )
            })
            setContacts(cards)
          } else {
            alert(response.data.message)
          }
        }).catch((err)=>{
          alert('Please try again after sometime.')
        })
      } else {
        alert('Please login first.')
        window.location.href = 'login'
      }
    }
  }, [])
  return (
    <div className='container my-3 border rounded'>
      <h1>Contacts</h1>
      {overlay}
      <hr />
      <ul className="cards">
        {contacts}
      </ul>
    </div>
  )
}

export default Dashboard
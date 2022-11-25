import React, { useEffect, useState } from 'react'
import Button from '../button/button'
import {url} from '../../backend'
import axios from 'axios'
import Papa from "papaparse";

const onClick = (e, id) => {
  e.preventDefault();
  console.log(id);
  window.location.href = '/contact/view/'+id
}

const allowedExtensions = ["csv"];

const Dashboard = () => {
  const [contacts, setContacts] = useState()
  const [overlay, setOverlay] = useState(<Button type='submit' value='Add new Contacts' onclick={(e)=>uploadButton(e)} classes='btn btn-primary'/>)
  const [data, setData] = useState([]);
  const [file, setFile] = useState("");
  const handleFileChange = (e) => {
    if (e.target.files.length) {
        const inputFile = e.target.files[0];
        const fileExtension = inputFile?.type.split("/")[1];
        if (!allowedExtensions.includes(fileExtension)) {
            alert("Please input a csv file");
            return;
        }
        setFile(inputFile);
    }
};
  const handleParse = () => {
    console.log(file);
    if (!file) return alert("Enter a valid file");
    const reader = new FileReader();
    reader.onload = async ({ target }) => {
        const csv = Papa.parse(target.result, { header: true });
        const parsedData = csv?.data;
        const columns = Object.keys(parsedData[0]);
        setData(columns);
    };
    reader.readAsText(file);
};
  const uploadButton = (e) => {
    e.preventDefault();
    setOverlay(
      <div>
        <input onChange={handleFileChange} id="csvInput" name="file" accept='.csv' type="file"/>
        <Button onclick={handleParse} value='Upload' classes='btn btn-outline-primary'  />
      </div>
    )
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
                  <Button onclick={(e)=>onClick(e, contact._id)} value={<h4>{contact.first_name + " " + contact.last_name}</h4>} classes='btn border'></Button>
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
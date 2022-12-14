import React from "react";
import Input from "../input/input";
import Button from "../button/button";
import axios from "axios";
import {url} from "../../backend"
import { Link } from "react-router-dom";

const loginForm = () => {
  function submitHandler(e) {
    e.preventDefault();
    console.log('here');
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    // console.log(email, password)
    axios.post(url+ '/authenticate/login', {
        email: email,
        password:password
    }).then((response)=>{
        if(response.data.success) {
            console.log(response.data.token);
            window.localStorage.setItem(`token`, response.data.token)
            window.location.href=`dashboard`
        } else {
            alert('Incorrect username and password.')
        }
    }).catch((err)=>{
        console.log('Error in fetching login response.',err)
        if(err.response && err.response.status === 403) {
            alert('Incorrect username and password.')
        } else {
            alert('Please try again.')
        }
    })
  }
  return (
    <section className="vh100" style={{background:'#F4F4F5'}}>
      <div className="container py-5 h-100" >
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{borderRadius: "1rem"}} >
              <div className="row g-0">
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={submitHandler}>
                      <h1>Login</h1>
                      <Input label="Email" type="email" id="email" />
                      <Input label="Password" type="password" id="password" />
                      <Button type="submit" value="Login" classes={"btn btn-primary mx-1"} />
                      <Link to={'/register'} className="btn btn-outline-dark mx-1" >Register</Link>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default loginForm;
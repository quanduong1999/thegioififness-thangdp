import Head from 'next/head'
import Link from 'next/link'
import {useState, useContext, useEffect} from 'react'
import { useRouter } from 'next/router'
import { RegisterAPI } from './api/auth/register';


const Register = () => {
    const initialState = {name:'', email: '', role:'', password: '', cf_password: ''}
    const [userData, setUserData] = useState(initialState);
    const {name,email,role,password,cf_password} = userData;
    
    const handleChangeInput = (e) => {
      const {name, value} = e.target
      setUserData({...userData,[name]: value})

    }

    const handleSubmit = (e) => {
      const body = {
        "username": email,
        "password": password,
        "role": role
      }
      console.log(body)
      e.preventDefault();
      RegisterAPI.postRegister(body)
        .then(res => {
          console.log(res)
        })
        .catch(err => console.log(err))
    }


    return(
      <div>
        <Head>
          <title>Register Page</title>
        </Head>

        <form className="mx-auto my-4" style={{maxWidth: '500px'}} onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" id="name"
            name="name" value={name}  onChange={handleChangeInput}/>
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
            name="email" value={email}  onChange={handleChangeInput}/>
            <small id="emailHelp" className="form-text text-muted">We will never share your email with anyone else.</small>
          </div>

          <div className="form-group">
            <label htmlFor="name">Role</label>
            <input type="text" className="form-control" id="role"
            name="role" value={role}  onChange={handleChangeInput}/>
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1"
            name="password" value={password}  onChange={handleChangeInput}/>
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputPassword2">Confirm Password</label>
            <input type="password" className="form-control" id="exampleInputPassword2"
            name="cf_password" value={cf_password}  onChange={handleChangeInput}/>
          </div>
          
          <button type="submit" className="btn btn-dark w-100">Register</button>

          <p className="my-2">
            Already have an account? <Link href="/login"><a style={{color: 'crimson'}}>Login Now</a></Link>
          </p>
        </form>
      </div>
    )
  }
  
  export default Register
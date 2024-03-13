import axios from 'axios'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Home() {
    const navigate = useNavigate()
    const handleLogout =()=>{
        axios.get("https://internshalaa.onrender.com/auth/logout")
        .then((res)=>{
            if(res.data.status){
               navigate("/login")
            }
        }).catch(err=>{
            console.log(err)
        })
    }
  return (
    <div>
        <button><Link to="/dashboard">Dashboard</Link></button>
        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

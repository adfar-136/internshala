import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../App.css"
const Dashboard = () => {
    const navigate = useNavigate();
    const [appliedOpportunities, setAppliedOpportunities] = useState([]);

    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get('https://internshalaa.onrender.com/auth/verify')
            .then(res => {
                if (!res.data.status) {
                    navigate("/login");
                } else {
                    fetchAppliedOpportunities();
                }
            })
            .catch(error => {
                console.error('Error verifying user:', error);
                navigate("/login");
            });
    }, [navigate]);
    const fetchAppliedOpportunities = async () => {
        try {
          const response = await axios.get('https://internshalaa.onrender.com/auth/applied-opportunities');
          setAppliedOpportunities(response.data);
        } catch (error) {
          console.error('Error fetching applied opportunities:', error);
        }
      };
    
    
    const handleLogout =()=>{
        axios.get("https://internshalaa.onrender.com/auth/logout")
        .then((res)=>{
            if(res.data.status){
            localStorage.clear(); 
               navigate("/login");

            }
        }).catch(err=>{
            console.log(err)
        })
    }
    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>
            <div className="opportunities-list">
                {appliedOpportunities.map((opportunity, index) => (
                    <div key={index} className="opportunity-card">
                        <h2>{opportunity.profile_name}</h2>
                        <p><strong>Company:</strong> {opportunity.company_name}</p>
                        <p><strong>Duration:</strong> {opportunity.duration}</p>
                        <p><strong>Stipend:</strong> {opportunity.stipend}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;

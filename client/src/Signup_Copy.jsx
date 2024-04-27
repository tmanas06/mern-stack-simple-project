import React, { useState } from 'react';
import axios from "axios";
export default function Signup() {
    const [value, setValue] = useState({
        name: '',
        email: '',
        password: ''
    });
    
    const initialvalues={
        name: '',
        email: '',
        password: ''
    }
    const [formValues,setFormValues]=useState(initialvalues);

    const handleChange = (e) => {
        
        setValue({
            ...value,
            [e.target.name]: e.target.value

        });

        
    };
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const regis=await axios.post("http://localhost:5000/register",value);
        console.log(regis.data);
        setValue({
            name: '',
            email: '',
            password: ''
        });
        alert("Account created");
    }

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <p>Name <input placeholder='name' onChange={handleChange} name='name' value={value.name} /></p>
                    <p>Email <input placeholder='email' onChange={handleChange} name='email' value={value.email} /></p>
                    <p>Password <input placeholder='password' onChange={handleChange} name="password" value={value.password} /></p>
                    <button type="submit" style={{ background: "yellow", color: "black" }}>Submit</button>
                </form>
            </div>
        </>
    )
}

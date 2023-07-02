"use client"
import { useState } from "react";



const Login=()=>{ 
	const [email,setEmail]=useState(""); 
	const [passw,setPassw]=useState(""); 
	const[dataInput, setDataInput]=useState(""); 
	const submitThis=(e)=>{
        e.preventDefault()
		const info={email:email,password:passw}; 
		setDataInput([info]);
	}
    console.log(dataInput)
	return(
	<div>
		<form action="" onSubmit={submitThis}> 
			<div> 
				<label htmlFor="email">Email</label>
				<input type="text" name="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}/> 
			</div> 
			<div> 
				<label htmlFor="passw">Password</label>
			<input type="text" name="passw" id="passw" value={passw} onChange={(e)=>setPassw(e.target.value)}/> 
			</div>  
			<button type="submit">Login</button>
		</form>
	</div>
)} 

export default Login
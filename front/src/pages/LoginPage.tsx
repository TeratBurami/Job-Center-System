import { useState } from 'react';
import {Link} from 'react-router-dom'

export default function LoginPage() {

  const [data,setData]=useState({gmail:'',password:''})

  const DataValidation=()=>{
        return data.gmail && data.password
    }

    const Login=()=>{
      // let url=`http://localhost:3333/api/login`
      let url=`https://job-center-system-api.vercel.app/api/login`
      if(DataValidation()){
        fetch(url,{
          method:'POST',
          headers:{
              'Content-Type':'application/json',
          },
          body: JSON.stringify(data),
      })
      .then(res=>res.json())
      .then(data=>{
          alert(data.msg)
          if(data.status=="success"){
              localStorage.setItem('user_role', data.user_role);
              localStorage.setItem('user_id', data.user_id);
              window.location.href = '/';
          }
      })
      .catch((err)=>{
          console.error('Error ',err)
      })
      }
      else{
        alert('Please enter all information')
      }
    }

  return (
    <div className="mt-10">
      <h1 className="text-2xl font-bold text-center">Sign in</h1>
      <div className="flex flex-col gap-8 p-6 bg-slate-200 shadow-md rounded-xl shadow-slate-800 w-3/4 md:w-1/3 mx-auto mt-4">
        <div><p>Gmail:</p><input onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>)=>setData({...data,gmail:e.target.value})} className="pl-1 w-full rounded border border-slate-900" type="text" /></div>
        <div><p>Password:</p><input onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>)=>setData({...data,password:e.target.value})} className="pl-1 w-full rounded border border-slate-900" type="password" /></div>
        <button onClick={Login} className="p-2 bg-blue-600 w-1/2 mx-auto rounded text-white">Sign in</button>
        <p className="text-center">Don't have an account? <Link className='underlien text-blue-600' to='/register'>Sign up here</Link></p>
      </div>
    </div>
  );
}
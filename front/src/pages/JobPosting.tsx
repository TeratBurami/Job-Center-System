import { useState } from "react"

export default function JobPosting(){

    const [data,setData]=useState({title:'',detail:'',salary:'',skill:'',emp_id:localStorage.getItem('user_id')})

    const Submit=()=>{
        if(data.title && data.detail && data.salary && data.skill){
            Posting()
        }
        else{
            alert('Please enter all information')
        }
    }

    const Posting=()=>{
        let url=`http://localhost:3333/api/job/posting`
        // let url=`https://job-center-system-api.vercel.app/api/job/posting`
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
            window.location.href = '/job_emp';
        })
    }

    return(
        <div className="mt-10">
            <h1 className="text-2xl font-bold text-center">Job Posting</h1>
            <div className="flex mb-10 flex-col gap-4 p-6 bg-slate-200 shadow-md rounded-xl shadow-slate-800 w-3/4 md:w-1/3 mx-auto mt-4">
                <div><p>Title:</p><input onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>)=>setData({...data,title:e.target.value})} className="w-full rounded border border-slate-900" type="text" /></div>
                <div><p>Detail:</p><textarea onChange={(e)=>setData({...data,detail:e.target.value})} className="resize-none rounded border border-slate-900 w-full" rows={5}></textarea></div>
                <div><p>Skills:</p><textarea onChange={(e)=>setData({...data,skill:e.target.value})} className="resize-none rounded border border-slate-900 w-full" rows={5}></textarea></div>                <div><p>Salary:</p><input onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>)=>setData({...data,salary:e.target.value})} className="w-full rounded border border-slate-900" type="text" /></div>
                <button onClick={Submit} className="p-2 bg-blue-600 rounded w-full text-white mt-4">Post</button>
            </div>
        </div>
    )
}
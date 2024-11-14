import { useEffect, useState } from "react"
import Nav from "../components/Nav"

export default function JobPosting(){

    const [data,setData]=useState({title:'',detail:``,salary:'',skill:'',emp_id:localStorage.getItem('user_id')})
    const [salaryRange,setSalaryRange]=useState({min:'',max:''})


    const Validate=()=>{
        if(salaryRange.min && salaryRange.max && data.title && data.detail && data.skill){
            if(data.title.length<=50){
                if(Number(salaryRange.min)<Number(salaryRange.max)){
                    if((/^\d+$/.test(salaryRange.min)) && (/^\d+$/.test(salaryRange.max))){
                        setData(prevData => ({ ...prevData, salary: `${salaryRange.min} - ${salaryRange.max}` }))
                    }
                    else{
                        alert('Please enter number as salary range')
                    }
                }
                else{
                    alert('Min salary must be less than max salary')
                }
            }
            else{
                alert('Title must be less than 50 characters')
            }
        }
        else{
            alert('Please enter all information')
        }
    }


    const Posting=()=>{
        // let url=`http://localhost:3333/api/job/posting`
        let url=`https://job-center-system-api.vercel.app/api/job/posting`
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

    useEffect(() => {
        if (data.salary) {
            // console.log(data.detail);
            Posting();
        }
    }, [data.salary]);

    return(
        <div>
            <Nav></Nav>
            <div className="mt-10">
                <h1 className="text-2xl font-bold text-center">Job Posting</h1>
                <div className="flex mb-10 flex-col gap-4 p-6 bg-slate-200 shadow-md rounded-xl shadow-slate-800 w-3/4 md:w-1/3 mx-auto mt-4">
                    <div><p>Title:</p><input placeholder="Max 50 characters" onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>)=>setData({...data,title:e.target.value})} className="pl-1 w-full rounded border border-slate-900" type="text" /></div>
                    <div><p>Detail:</p><textarea onChange={(e)=>setData({...data,detail:e.target.value})} className="pl-1 resize-none rounded border border-slate-900 w-full" rows={5}></textarea></div>
                    <div><p>Skills:</p><textarea onChange={(e)=>setData({...data,skill:e.target.value})} className="pl-1 resize-none rounded border border-slate-900 w-full" rows={5}></textarea></div>
                    <div>
                        <p>Salary:</p>
                        <div className="flex gap-2 w-1/2">
                            <input onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>) => setSalaryRange({...salaryRange, min: e.target.value})} className="pl-1 w-full rounded border border-slate-900" type="text" />
                            <p>to</p>
                            <input onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>)=>setSalaryRange({...salaryRange,max: e.target.value})} className="pl-1 w-full rounded border border-slate-900" type="text" />
                        </div>
                    </div>
                    <button onClick={Validate} className="p-2 bg-blue-600 rounded w-full text-white mt-4">Post</button>
                </div>
            </div>
        </div>
    )
}
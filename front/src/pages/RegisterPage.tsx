import {useState} from 'react'
import {Link} from 'react-router-dom'

export default function RegisterPage(){
    const [Role, setRole] = useState('')
    const [ap_data,setApData]=useState({citizen_id:'',gmail:'',tel:'',password:'',work_exp:'',ability:'',education:''})
    const [emp_data,setEmpData]=useState({citizen_id:'',company:'',gmail:'',tel:'',password:'',req_skill:'',req_edu:'',req_age:''})
    
    const ApDataValidation=()=>{
        return Role && ap_data.citizen_id && ap_data.gmail && ap_data.tel && ap_data.password && ap_data.work_exp && ap_data.ability && ap_data.education
    }

    const EmpDataValidation=()=>{
        return Role && emp_data.citizen_id && emp_data.company && emp_data.gmail && emp_data.tel && emp_data.password && emp_data.req_skill && emp_data.req_edu && emp_data.req_age
    }

    const Submit=()=>{
        if(Role=="applicant"){
            if(ApDataValidation()){
                console.log(ap_data)
                Register(Role,ap_data)
            }
            else{
                alert('Please enter all information')
            }
        }
        if(Role=="employer"){
            if(EmpDataValidation()){
                console.log(emp_data)
                Register(Role,emp_data)
            }
            else{
                alert('Please enter all information')
            }
        }
    }
    
    const Register=(Role: string, data: any)=>{
        // let url=`http://localhost:3333/api/${Role}/register`
        let url=`https://job-center-system-api.vercel.app/api/${Role}/register`
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
                window.location.href = '/login';
            }
            else{
                window.location.href = '/register';
            }
        })
        .catch((err)=>{
            console.error('Error ',err)
        })
    }
    
    return(
        <div className="mt-10">
            <h1 className="text-2xl font-bold text-center">Sign Up</h1>
            <div className="flex mb-10 flex-col gap-8 p-6 bg-slate-200 shadow-md rounded-xl shadow-slate-800 w-3/4 md:w-1/3 mx-auto mt-4">
                <div className="flex gap-10">
                    <div className='flex gap-3'><p>Applicant</p><input type="radio" name="role" value="applicant" onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>)=>{setRole(e.target.value), setEmpData({citizen_id:'',company:'',gmail:'',tel:'',password:'',req_skill:'',req_edu:'',req_age:''})}} /></div>
                    <div className='flex gap-3'><p>Employer</p><input type="radio" name="role" value="employer" onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>)=>{setRole(e.target.value), setApData({citizen_id:'',gmail:'',tel:'',password:'',work_exp:'',ability:'',education:''})}} /></div>                
                </div>
                <div hidden={Role !== 'applicant'}>
                    <div><p>Citizen ID:</p><input onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>)=>setApData({...ap_data,citizen_id:e.target.value})} className="w-full rounded border border-slate-900" type="text" /></div>
                    <div className='flex gap-4'>
                        <div><p>Gmail:</p><input onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>)=>setApData({...ap_data,gmail:e.target.value})} className="w-full rounded border border-slate-900" type="text" /></div>
                        <div><p>Tel:</p><input onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>)=>setApData({...ap_data,tel:e.target.value})} className="w-full rounded border border-slate-900" type="text" /></div>
                    </div>
                    <div><p>Password:</p><input onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>)=>setApData({...ap_data,password:e.target.value})} className="w-full rounded border border-slate-900" type="password" /></div>
                    <div><p>Work experiences:</p><input onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>)=>setApData({...ap_data,work_exp:e.target.value})} className="w-full rounded border border-slate-900" type="text" /></div>
                    <div><p>Abilities:</p><input onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>)=>setApData({...ap_data,ability:e.target.value})} className="w-full rounded border border-slate-900" type="text" /></div>
                    <div><p>Education:</p><input onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>)=>setApData({...ap_data,education:e.target.value})} className="w-full rounded border border-slate-900" type="text" /></div>
                </div>
                <div hidden={Role == 'applicant'}>
                    <div><p>Citizen ID:</p><input onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>)=>setEmpData({...emp_data,citizen_id:e.target.value})} className="w-full rounded border border-slate-900" type="text" /></div>
                    <div><p>Company name:</p><input onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>)=>setEmpData({...emp_data,company:e.target.value})} className="w-full rounded border border-slate-900" type="text" /></div>
                    <div className='flex gap-4'>
                        <div><p>Gmail:</p><input onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>)=>setEmpData({...emp_data,gmail:e.target.value})} className="w-full rounded border border-slate-900" type="text" /></div>
                        <div><p>Tel:</p><input onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>)=>setEmpData({...emp_data,tel:e.target.value})} className="w-full rounded border border-slate-900" type="text" /></div>
                    </div>
                    <div><p>Password:</p><input onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>)=>setEmpData({...emp_data,password:e.target.value})} className="w-full rounded border border-slate-900" type="password" /></div>
                    <div><p>Required Skills:</p><input onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>)=>setEmpData({...emp_data,req_skill:e.target.value})} className="w-full rounded border border-slate-900" type="text" /></div>
                    <div><p>Required Education:</p><input onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>)=>setEmpData({...emp_data,req_edu:e.target.value})} className="w-full rounded border border-slate-900" type="text" /></div>
                    <div><p>Age Range:</p><input onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>)=>setEmpData({...emp_data,req_age:e.target.value})} className="w-full rounded border border-slate-900" type='text' /></div>
                </div>
                <button onClick={Submit} className="p-2 bg-blue-600 w-1/2 mx-auto rounded text-white">Sign Up</button>
                <p className='text-center'>Already have account? <Link className='underline text-blue-600' to='/login'>Sign in</Link></p>
            </div>
        </div>
    )
}
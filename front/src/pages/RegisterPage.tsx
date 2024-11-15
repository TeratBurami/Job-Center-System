import {useState} from 'react'
import {Link} from 'react-router-dom'

export default function RegisterPage(){
    const [Role, setRole] = useState('')
    const [ap_data,setApData]=useState({citizen_id:'',gmail:'',tel:'',password:'',work_exp:'',ability:'',education:''})
    const [emp_data,setEmpData]=useState({citizen_id:'',company:'',gmail:'',tel:'',password:'',req_skill:'',req_edu:'',req_age:''})
    const [ageRange,setAgeRange]=useState({min:'',max:''})
    
    const ApDataValidation=()=>{
        if(Role && ap_data.citizen_id && ap_data.gmail && ap_data.tel && ap_data.password && ap_data.work_exp && ap_data.ability && ap_data.education){
            if(ap_data.citizen_id.length==13 && /^\d+$/.test(ap_data.citizen_id)){
                if(ap_data.tel.length<=10 && /^\d+$/.test(ap_data.tel) && ap_data.tel.startsWith('0')){
                    if(ap_data.gmail.includes('@') && ap_data.gmail.includes('.')){
                        if(ap_data.password.length>=8){
                            return true
                        }
                        else{
                            alert('Password must be more than 8 characters')
                            return false
                        }
                    }
                    else{
                        alert('Gmail must be gmail')
                        return false
                    }
                }
                else{
                    alert('Tel must be less than 10 characters, must start with 0, and also must be number')
                    return false
                }
            }
            else{
                alert('Citizen ID must be less than 13 characters and also must be number')
                return false
            }
        }
        else{
            alert('Please enter all information')
            return false
        }
    }

    const EmpDataValidation=()=>{
        if(ageRange.min && ageRange.max && Role && emp_data.citizen_id && emp_data.company && emp_data.gmail && emp_data.tel && emp_data.password && emp_data.req_skill && emp_data.req_edu){
            if(emp_data.citizen_id.length==13 && /^\d+$/.test(emp_data.citizen_id)){
                if(emp_data.tel.length<=10 && /^\d+$/.test(emp_data.tel) && emp_data.tel.startsWith('0')){
                    if(emp_data.gmail.includes('@') && emp_data.gmail.includes('.')){
                        if(emp_data.password.length>=8){
                            if((/^\d+$/.test(ageRange.min)) && (/^\d+$/.test(ageRange.max))){
                                if(Number(ageRange.min)<Number(ageRange.max)){
                                    setEmpData(prevData => ({ ...prevData, req_age: `${ageRange.min} - ${ageRange.max}` }))
                                    return true
                                }
                                else{
                                    alert('Min age must be less than max age')
                                    return false
                                }
                            }
                            else{
                                alert('Age must be number')
                                return false
                            }
                        }
                        else{
                            alert('Password must be more than 8 characters')
                            return false
                        }
                    }
                    else{
                        alert('Gmail must be gmail')
                        return false
                    }
                }
                else{
                    alert('Tel must be less than 10 characters, must start with 0, and also must be number')
                    return false
                }
            }
            else{
                alert('Citizen ID must be less than 13 characters and also must be number')
                return false
            }
        }
        else{
            alert('Please enter all information')
            return false
        }
    }

    const Submit=()=>{
        if(Role=="applicant"){
            if(ApDataValidation()){
                Register(Role,ap_data)
            }
        }
        if(Role=="employer"){
            console.log(emp_data);
            if(EmpDataValidation()){
                Register(Role,emp_data)
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
                    <div className='flex gap-3'><p>Applicant</p><input type="radio" name="role" value="applicant" onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>)=>{setRole(e.target.value)}} /></div>
                    <div className='flex gap-3'><p>Employer</p><input type="radio" name="role" value="employer" onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>)=>{setRole(e.target.value)}} /></div>                
                </div>
                <div hidden={Role !== 'applicant'}>
                    <div><p>Citizen ID:</p><input onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>)=>setApData({...ap_data,citizen_id:e.target.value})} className="pl-1 w-full rounded border border-slate-900" type="text" /></div>
                    <div className='flex gap-4'>
                        <div><p>Gmail:</p><input onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>)=>setApData({...ap_data,gmail:e.target.value})} className="pl-1 w-full rounded border border-slate-900" type="text" /></div>
                        <div><p>Tel:</p><input onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>)=>setApData({...ap_data,tel:e.target.value})} className="pl-1 w-full rounded border border-slate-900" type="text" /></div>
                    </div>
                    <div><p>Password:</p><input onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>)=>setApData({...ap_data,password:e.target.value})} className="pl-1 w-full rounded border border-slate-900" type="password" /></div>
                    <div><p>Work experiences:</p><input onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>)=>setApData({...ap_data,work_exp:e.target.value})} className="pl-1 w-full rounded border border-slate-900" type="text" /></div>
                    <div><p>Abilities:</p><input onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>)=>setApData({...ap_data,ability:e.target.value})} className="pl-1 w-full rounded border border-slate-900" type="text" /></div>
                    <div><p>Education:</p><input onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>)=>setApData({...ap_data,education:e.target.value})} className="pl-1 w-full rounded border border-slate-900" type="text" /></div>
                </div>
                <div hidden={Role == 'applicant'}>
                    <div><p>Citizen ID:</p><input onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>)=>setEmpData({...emp_data,citizen_id:e.target.value})} className="pl-1 w-full rounded border border-slate-900" type="text" /></div>
                    <div><p>Company name:</p><input onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>)=>setEmpData({...emp_data,company:e.target.value})} className="pl-1 w-full rounded border border-slate-900" type="text" /></div>
                    <div className='flex gap-4'>
                        <div><p>Gmail:</p><input onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>)=>setEmpData({...emp_data,gmail:e.target.value})} className="pl-1 w-full rounded border border-slate-900" type="text" /></div>
                        <div><p>Tel:</p><input onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>)=>setEmpData({...emp_data,tel:e.target.value})} className="pl-1 w-full rounded border border-slate-900" type="text" /></div>
                    </div>
                    <div><p>Password:</p><input onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>)=>setEmpData({...emp_data,password:e.target.value})} className="pl-1 w-full rounded border border-slate-900" type="password" /></div>
                    <div><p>Required Skills:</p><input onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>)=>setEmpData({...emp_data,req_skill:e.target.value})} className="pl-1 w-full rounded border border-slate-900" type="text" /></div>
                    <div><p>Required Education:</p><input onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>)=>setEmpData({...emp_data,req_edu:e.target.value})} className="pl-1 w-full rounded border border-slate-900" type="text" /></div>
                    <div>
                        <p>Age Range:</p>
                        <div className="flex gap-2 w-1/2">
                            <input onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>)=>setAgeRange({...ageRange,min:e.target.value})} className="pl-1 w-full rounded border border-slate-900" type='text' />
                            <p>to</p>
                            <input onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>)=>setAgeRange({...ageRange,max:e.target.value})} className="pl-1 w-full rounded border border-slate-900" type='text' />
                        </div>
                    </div>
                </div>
                <button onClick={Submit} className="p-2 bg-blue-600 w-1/2 mx-auto rounded text-white">Sign Up</button>
                <p className='text-center'>Already have account? <Link className='underline text-blue-600' to='/login'>Sign in</Link></p>
            </div>
        </div>
    )
}
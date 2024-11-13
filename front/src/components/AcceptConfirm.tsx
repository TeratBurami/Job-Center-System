import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

interface Props {
  job_id: string;
  ap_id: string;
}

export default function ApplyJob({ job_id, ap_id }: Props) {
  const [open, setOpen] = useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Submit=()=>{
    // let url=`http://localhost:3333/api/apply/accept`
    let url=`https://job-center-system-api.vercel.app/api/apply/accept`
    fetch(url,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify({job_id:job_id,ap_id:ap_id,emp_id:localStorage.getItem('user_id')}),
    })
    .then(res=>res.json())
    .then(data=>{
        alert(data.msg)
        window.location.reload()
        handleClose()
    })
  }

  return (
    <React.Fragment>
      <Button sx={{ width: "100%" }} variant="contained" color="success" onClick={handleClickOpen}>
        ACCEPT
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to accept this applicant?"}
        </DialogTitle>
        <DialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
          <Button onClick={Submit} variant="contained" color="success" >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

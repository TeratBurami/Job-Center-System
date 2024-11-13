import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

interface Props {
  job_id: string;
  ap_id: string;
  emp_id: string;
}

export default function ApplyJob({ job_id, ap_id, emp_id }: Props) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    job_id: job_id,
    ap_id: ap_id,
    emp_id: emp_id,
    resume: null as File | null,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Submit = () => {
    const url = `http://localhost:3333/api/job/apply`;

    if (data.resume) {
      const formData = new FormData();
      formData.append('job_id', data.job_id);
      formData.append('ap_id', data.ap_id);
      formData.append('emp_id', data.emp_id);
      formData.append('image', data.resume); // 'image' corresponds to the backend field

      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.msg);
          handleClose();
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Something went wrong, please try again.");
        });
    } else {
      alert("Please add your resume");
    }
  };

  return (
    <React.Fragment>
      <Button sx={{ width: "100%" }} variant="contained" onClick={handleClickOpen}>
        APPLY
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to apply to this job?"}
        </DialogTitle>
        <DialogContent>
          {/* Add any additional content if needed */}
        </DialogContent>
        <DialogActions>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            required
            onChange={(e) => setData({ ...data, resume: e.target.files![0] })}
          />
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
          <Button variant="contained" onClick={Submit}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

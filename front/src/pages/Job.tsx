import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import ApplyJob from "../components/ApplyJob";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Job() {
  const [data, setData] = useState([]);
  const applicant_id = localStorage.getItem("user_id");
  const role=localStorage.getItem("user_role");
  const navigate = useNavigate();

  let url = `http://localhost:3333/api/job`;
  useEffect(() => {
    if(role=="employer"){
      alert('You are not allowed to access this page');
      window.location.href = "/";
    }
    else{
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setData(data.result);
        });
    }

  }, []);

  const handleClick = (jobId: string) => {
    navigate(`/detail/${jobId}`);
  };


  return (
    <div className="my-10 px-20">
      <h1 className="text-2xl font-bold mb-4">Job List</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Company</TableCell>
              <TableCell align="center">Salary</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item: any) => (
              <TableRow
                key={item.job_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.job_id}
                </TableCell>
                <TableCell align="center">{item.title}</TableCell>
                <TableCell align="center">{item.company}</TableCell>
                <TableCell align="center">{item.salary}</TableCell>
                <TableCell sx={{ width: "15%" }} align="center"><Button onClick={() => handleClick(item.job_id)} sx={{ width: "100%" }} variant="outlined">DETAIL</Button></TableCell>
                <TableCell sx={{ width: "15%" }} align="center">
                  <ApplyJob
                    job_id={item.job_id}
                    ap_id={applicant_id?.toString() || "id"}
                    emp_id={item.emp_id}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

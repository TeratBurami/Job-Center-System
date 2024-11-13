import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Nav from "../components/Nav";

export default function Job() {
  const [data, setData] = useState<any[]>([]);
  const navigate = useNavigate();
  const role = localStorage.getItem("user_role");

  // let url = `http://localhost:3333/api/job_emp`;
  let url = `https://job-center-system-api.vercel.app/api/job_emp`;

  useEffect(() => {
    if (role == "applicant") {
      alert("You are not allowed to access this page");
      window.location.href = "/";
    } else {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emp_id: localStorage.getItem("user_id"),
        }),
      })
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
    <div>
      <Nav></Nav>
      <div className="my-10 px-20">
        <h1 className="text-2xl font-bold mb-4">Job List</h1>
        <Link to="/posting" className="p-2 px-10 bg-blue-600 rounded text-white">
          Post a Job
        </Link>
        <TableContainer component={Paper} sx={{ marginTop: "1rem" }}>
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
                  <TableCell sx={{ width: "15%" }} align="center">
                    <Button
                      onClick={() => handleClick(item.job_id)}
                      sx={{ width: "100%" }}
                      variant="outlined"
                    >
                      DETAIL
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

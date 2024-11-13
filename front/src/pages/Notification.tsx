import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import AcceptConfirm from "../components/AcceptConfirm";

export default function Notification() {
  const role = localStorage.getItem("user_role");
  const account_id = localStorage.getItem("user_id");
  const [data, setData] = useState([]);

  // const url=`http://localhost:3333/api/notification/${role}/${account_id}`
  const url=`https://job-center-system-api.vercel.app/api/notification/${role}/${account_id}`

  useEffect(() => {
    fetch(`http://localhost:3333/api/notification/${role}/${account_id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data.result);
      });
  }, []);
  

  return (
    <div>
      <Nav></Nav>
      <div className="w-5/6 mx-auto mt-10">
        <h1 className="text-3xl">{role=="applicant"? "Accepted Job Notification":"Applied Notification"}</h1>
        {role=="employer" && (<TableContainer component={Paper} sx={{ marginTop: "1rem" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>JobTitle</TableCell>
                <TableCell align="center">Gmail</TableCell>
                <TableCell align="center">Tel</TableCell>
                <TableCell align="center">Skill</TableCell>
                <TableCell align="center">Education</TableCell>
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
                  {item.title}
                  </TableCell>
                  <TableCell align="center">{item.gmail}</TableCell>
                  <TableCell align="center">{item.tel}</TableCell>
                  <TableCell align="center">{item.ability}</TableCell>
                  <TableCell align="center">{item.education}</TableCell>
                  <TableCell align="center">{item.salary}</TableCell>
                  <TableCell sx={{ width: "15%" }} align="center"><AcceptConfirm ap_id={item.ap_id} job_id={item.job_id}></AcceptConfirm></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>)}

        {role=="applicant" && (<TableContainer component={Paper} sx={{ marginTop: "1rem" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="center">Company</TableCell>
                <TableCell align="center">Detail</TableCell>
                <TableCell align="center">Employer Gmail</TableCell>
                <TableCell align="center">Employer Tel</TableCell>
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
                    {item.title}
                  </TableCell>
                  <TableCell align="center">{item.company}</TableCell>
                  <TableCell align="center">{item.detail}</TableCell>
                  <TableCell align="center">{item.gmail}</TableCell>
                  <TableCell align="center">{item.tel}</TableCell>
                  <TableCell align="center">{item.salary}</TableCell>
                  <TableCell sx={{width:"10%"}} align="center">
                    <Button
                      sx={{ width: "100%" }}
                      variant="contained"
                      color={"info"}
                    >
                      INTERVIEW
                    </Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>)}
      </div>
    </div>
  );
}

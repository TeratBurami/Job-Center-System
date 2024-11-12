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

export default function Job() {
  const [data, setData] = useState<any[]>([]);
  const navigate = useNavigate(); // Initialize the navigate function

  let url = `http://localhost:3333/api/job`;
  
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data.result);
      });
  }, []);

  // Handle button click to navigate to detail page
  const handleClick = (jobId: string) => {
    navigate(`/detail/${jobId}`); // Navigate to /detail with the job_id
  };

  return (
    <div className="my-10 px-20">
      <h1 className="text-2xl font-bold mb-4">Job List</h1>
      <Link to="/posting" className="p-2 px-10 bg-blue-600 rounded text-white">
        Post a Job
      </Link>
      <TableContainer component={Paper} sx={{ marginTop: "1rem" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Post ID</TableCell>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Company</TableCell>
              <TableCell align="center">Salary</TableCell>
              <TableCell align="center">Apply amount</TableCell>
              <TableCell align="center">View amount</TableCell>
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
                <TableCell align="center">{item.job_id}</TableCell>
                <TableCell align="center">{item.job_id}</TableCell>
                <TableCell sx={{ width: "15%" }} align="center">
                  <Button
                    onClick={() => handleClick(item.job_id)} // Pass job_id to handleClick
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
  );
}

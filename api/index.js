const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mysql = require("mysql2");
const app = express();
const multer = require('multer');

app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DB,
});

db.connect();

app.get("/api/users", (req, res) => {
  const sql = "SELECT * FROM Employer UNION SELECT * FROM Applicant";
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      result:
        results.find((result) => result.gmail === "testing2@gmail.com") || [],
    });
  });
});

app.get("/api/applicant", (req, res) => {
  const sql = "SELECT * FROM Applicant";
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ result: results });
  });
});

app.get("/api/employer", (req, res) => {
  const sql = "SELECT * FROM Employer";
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ result: results });
  });
});

app.get("/api/apply", (req, res) => {
  const sql = "SELECT job_id,ap_id,emp_id,isAccept FROM ApplyJob";
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ result: results });
  });
});

app.get("/api/apply/:id", (req, res) => {
  const sql = "SELECT ap_id, isAccept FROM ApplyJob WHERE job_id=?";
  db.query(sql,[req.params.id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ result: results });
  });
});

app.get("/api/apply/amount/:id", (req, res) => {
  db.query("SELECT COUNT(*) AS apply_amount FROM ApplyJob WHERE job_id=?", [req.params.id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.send(result);
  });
});

app.get("/api/job", (req, res) => {
  db.query("SELECT * FROM Job JOIN Employer ON Job.emp_id = Employer.emp_id", (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ result: results });
  });
});

app.post("/api/job_emp", (req, res) => {
  db.query("SELECT * FROM Job JOIN Employer ON Job.emp_id = Employer.emp_id WHERE Job.emp_id=?",[req.body.emp_id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ result: results });
  });
});

app.get("/api/job/:id", (req, res) => {
  db.query("SELECT * FROM Job JOIN Employer ON Job.emp_id = Employer.emp_id WHERE job_id=?",[req.params.id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ result: results });
  });
});

app.get("/api/detail/:id", (req, res) => {
  db.query("SELECT Job.job_id,title,detail,salary,skill,Applicant.gmail AS ap_gmail,Applicant.tel AS ap_tel,Applicant.ap_id AS ap_id,Employer.gmail AS emp_gmail, Employer.tel AS emp_tel, Employer.emp_id, work_exp,ability,education,company,req_edu,req_age FROM ApplyJob JOIN Job ON ApplyJob.job_id = Job.job_id JOIN Applicant ON ApplyJob.ap_id = Applicant.ap_id JOIN Employer ON ApplyJob.emp_id = Employer.emp_id WHERE Job.job_id=? AND isAccept=0",[req.params.id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if(results.length==0){
      db.query("SELECT job_id,title,company,salary,req_edu,req_age,detail,skill,gmail AS emp_gmail,tel AS emp_tel,Employer.emp_id FROM Job JOIN Employer ON Job.emp_id = Employer.emp_id WHERE job_id=?",[req.params.id], (err, results) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({ result: results,status:"error" });
      });
    }
    else{
      res.json({ result: results,status:"success" });
    }
  });
});

app.get("/api/notification/:role/:id", (req, res) => {
  const role=req.params.role;
  let sql=''
  if(role=="applicant"){
    sql="SELECT title,company,gmail,tel,detail,salary,Job.job_id FROM ApplyJob JOIN Employer ON ApplyJob.emp_id=Employer.emp_id JOIN Job ON Job.job_id=ApplyJob.job_id WHERE ap_id=? AND isAccept=1";
  }
  else{
    sql="SELECT title,gmail,tel,ability,education,salary,Applicant.ap_id,Job.job_id FROM ApplyJob JOIN Applicant ON ApplyJob.ap_id=Applicant.ap_id JOIN Job ON Job.job_id=ApplyJob.job_id WHERE ApplyJob.emp_id=? AND isAccept=0";
  }
  db.query(sql,[req.params.id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ result: results });
  });
});

app.post('/api/job/apply', upload.single('image'), (req, res) => {
  const { job_id, ap_id, emp_id } = req.body;
  const resume = req.file;

  if (!job_id || !ap_id || !emp_id || !resume) {
    return res.json({ msg: 'Missing required fields' });
  }
  db.query(
    'INSERT INTO ApplyJob (job_id, ap_id, emp_id, resume) VALUES (?, ?, ?, ?)',
    [job_id, ap_id, emp_id, resume.buffer],
    (err, result) => {
      if (err) {
        console.error('Error saving data to database:', err);
        return res.status(500).json({ msg: 'Failed to save application' });
      }
      res.json({ msg: 'Job application submitted successfully' });
    }
  );
});

app.post("/api/applicant/register", (req, res) => {
  db.query(
    "SELECT gmail FROM Applicant UNION SELECT gmail FROM Employer",
    (err, result) => {
      if (err) {
        res.json({ status: "error", msg: err.message });
        return;
      }

      if (result.find((result) => result.gmail === `${req.body.gmail}`)) {
        res.json({
          msg: "The email has already been taken",
          status: "error",
          result_data: result,
        });
      } else {
        db.query(
          "INSERT INTO Applicant (ap_id, citizen_id, gmail, password, tel, work_exp, ability, education) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)",
          [
            req.body.citizen_id,
            req.body.gmail,
            req.body.password,
            req.body.tel,
            req.body.work_exp,
            req.body.ability,
            req.body.education,
          ],
          (err, results) => {
            if (err) {
              res.json({ status: "error", msg: err.message });
              return;
            }
            res.json({
              status: "success",
              msg: "Registration success",
              result: results,
            });
          }
        );
      }
    }
  );
});

app.post("/api/employer/register", (req, res) => {
  db.query(
    "SELECT gmail FROM Applicant UNION SELECT gmail FROM Employer",
    (err, result) => {
      if (err) {
        res.json({ msg: err.message, status: "error" });
        return;
      }

      if (result.find((result) => result.gmail === `${req.body.gmail}`)) {
        res.json({
          msg: "The email has already been taken",
          status: "error",
          result: result,
        });
      } else {
        db.query(
          "INSERT INTO Employer (emp_id, citizen_id, company, gmail, password, tel, req_skill, req_edu, req_age) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            req.body.citizen_id,
            req.body.company,
            req.body.gmail,
            req.body.password,
            req.body.tel,
            req.body.req_skill,
            req.body.req_edu,
            req.body.req_age,
          ],
          (err, results) => {
            if (err) {
              res.json({ status: "error", msg: err.message });
              return;
            }
            res.json({
              msg: "Registration success",
              status: "success",
              result: results,
            });
          }
        );
      }
    }
  );
});

app.post("/api/login", (req, res) => {
  const { gmail, password } = req.body;

  const queryEmployer = "SELECT * FROM Employer WHERE gmail = ?";
  db.query(queryEmployer, [gmail], (err, employerResults) => {
    if (err) {
      return res.json({ status: "error", msg: err.message });
    }

    if (employerResults.length > 0) {
      const employer = employerResults[0];
      if (password === employer.password) {
        return res.json({
          msg: "Login success",
          status: "success",
          user_role: "employer",
          user_id: employer.emp_id,
        });
      } else {
        return res.json({
          msg: "Invalid password or email, please try again",
          status: "error",
        });
      }
    }

    const queryApplicant = "SELECT * FROM Applicant WHERE gmail = ?";
    db.query(queryApplicant, [gmail], (err, applicantResults) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      }

      if (applicantResults.length > 0) {
        const applicant = applicantResults[0];
        if (password === applicant.password) {
          return res.json({
            msg: "Login success",
            status: "success",
            user_role: "applicant",
            user_id: applicant.ap_id,
          });
        } else {
          return res.json({
            msg: "Invalid password or email, please try again",
            status: "error",
          });
        }
      }

      return res.json({ msg: "User not found",status:"error" });
    });
  });
});

app.post("/api/job/posting",(req,res)=>{
  db.query("INSERT INTO Job (job_id, title, detail, salary, skill, emp_id) VALUES (NULL, ?, ?, ?, ?, ?)",[req.body.title,req.body.detail,req.body.salary,req.body.skill,req.body.emp_id],(err,results)=>{
    if (err) {
      res.json({ status: "error", msg: err.message });
      return;
    }
    res.json({
      msg: "Posting success",
      status: "success",
    });
  })
})

app.put("/api/apply/accept", (req, res) => {
  db.query(
    "UPDATE ApplyJob SET isAccept = 1 WHERE job_id = ? AND ap_id = ? AND emp_id = ?",
    [req.body.job_id, req.body.ap_id,req.body.emp_id],
    (err, results) => {
      if (err) {
        res.json({ status: "error", msg: err.message });
        return;
      }
      res.json({
        msg: "Accept success",
        status: "success",
      });
    }
  );
});

app.get("/", (req, res) => {
  res.json("Hello World");
});

// app.listen(process.env.PORT, function (err) {
//   if (err) console.log("Error in server setup");
//   console.log("Server listening on Port", process.env.PORT);
// });

module.exports = app;

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mysql = require("mysql2");
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DB,
});

db.connect();

app.get("/api/users", (req, res) => {
    const sql = "SELECT gmail FROM Applicant UNION SELECT gmail FROM Employer";
    db.query(sql, (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({result: results.find(result => result.gmail === 'testing2@gmail.com') || []});
    });
  });

app.get("/api/applicant", (req, res) => {
  const sql = "SELECT * FROM Applicant";
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({result:results});
  });
});

app.get("/api/employer", (req, res) => {
    const sql = "SELECT * FROM Employer";
    db.query(sql, (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({result:results});
    });
  });

app.post("/api/applicant/register", (req, res) => {
  db.query(
    "SELECT gmail FROM Applicant UNION SELECT gmail FROM Employer",
    (err, result) => {
      if (err) {
        res.json({ status: "error", msg: err.message });
        return;
      }

      if (result.find(result => result.gmail === `${req.body.gmail}`)) {
        res.json({ msg: "The email has already been taken", status: "error",result_data:result});
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

      if (result.find(result => result.gmail === `${req.body.gmail}`)) {
        res.json({ msg: "The email has already been taken", status: "error",result:result });
      } else {
        db.query(
          "INSERT INTO Employer (emp_id, citizen_id, gmail, password, tel, req_skill, req_edu, req_age) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)",
          [
            req.body.citizen_id,
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

app.post("/api/login",(req,res)=>{
    db.query("SELECT * FROM Applicant UNION SELECT * FROM Employer",(err,results)=>{
        if (err) {
            res.json({ msg: err.message, status: "error" });
            return;
        }

        let emailValidate=results.find(result => result.gmail === `${req.body.gmail}`)
        if(emailValidate){
            if(emailValidate.password==req.body.password){
                res.json({msg:"Login success",status:"success"})
            }
            else{
                res.json({msg:"Incorrect gmail or password, please check and try again",status:"error"})
            }
        }
        else{
            res.json({msg:"Couldn't find your gmail or your account has been deleted, please register first",status:"error"})
        }
    })
})

app.get("/", (req, res) => {
  res.json("Hello World");
});

// app.listen(process.env.PORT, function(err){
//     if (err) console.log("Error in server setup")
//     console.log("Server listening on Port", process.env.PORT);
// })

module.exports = app;

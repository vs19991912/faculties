const { query } = require('express');
var express = require('express');
var router = express.Router();
var pool = require("./pool")
var upload = require("./multer")
/* GET home page. */
router.get('/facultyinterface',
  function (req, res, next) {
    res.render('facultiesinterfaces', { msg: '' });
  }
);

router.get('/fetchallcities', function (req, res, next) {
  console.log(req.query)
  pool.query("select * from cities where stateid=?", [req.query.stateid], function (error, result) {

    if (error) {
      console.log(error)
      res.status(500).json([])
    }
    else {
      res.status(200).json(result)


    }
  })

})



router.get('/fetchallstates', function (req, res, next) {
  pool.query("select * from states", function (error, result) {

    if (error) {
      console.log(error)
      res.status(500).json([])
    }
    else {
      res.status(200).json(result)
    }

  })
});

router.post('/submitfaculty', upload.single("image"), function (req, res, next) {
  console.log("BODY:", req.body)
  console.log("FILE:", req.file)
  pool.query("insert into faculty(firstname,lastname,birthdate,gender,mobileno,email,address,state,city,zipcode,qualification,department,image)values(?,?,?,?,?,?,?,?,?,?,?,?,?)", [req.body.firstname, req.body.lastname, req.body.birthdate, req.body.gender, req.body.mobileno, req.body.email, req.body.address, req.body.city, req.body.state, req.body.zipcode, req.body.qualification, req.body.department, req.file.originalname], function (error, result) {

    if (error) {
      console.log(error)
      res.render("facultiesinterface", { msg: 'Server Error' })
    }
    else {
      res.render('facultiesinterface', { msg: 'Record Submitted' })
    }

  })
});

module.exports = router;

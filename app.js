const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const mailchimp = require("@mailchimp/mailchimp_marketing");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

mailchimp.setConfig({
  apiKey: "7bb9fc7a72f46a33b352d40ecc54cc5d-us18",
  server: "us18",
});

app
  .route("/")
  .get(function (req, res) {
    res.sendFile(__dirname + "/signup.html");
  })

  .post(function (req, res) {
    let FNAME = req.body.firstName;
    let LNAME = req.body.lastName;
    let email_address = req.body.eMail;

    const listId = "3fd2412580";
    const userData = {
      FNAME,
      LNAME,
      email_address,
    };
    console.log(userData);
    async function run() {
      const response = await mailchimp.lists.addListMember(listId, {
        email_address: userData.email,
        status: "subscribed",
        merge_fields: {
          FNAME: userData.firstName,
          LNAME: userData.lastName,
        },
      });
    }
    res.sendFile(__dirname + "/success.html");
    run().catch((e) => res.sendFile(__dirname + "/failure.html"));
  });

app.listen(process.env.PORT || 3000, function () {
  console.log("server 3000 started");
});

// API KEY
//7bb9fc7a72f46a33b352d40ecc54cc5d-us18

// ID LIST
// 3fd2412580

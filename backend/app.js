const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("./userDetails");
const dotenv = require("dotenv");

const app = express();
app.use(express.json());
app.use(cors());

// Configuring environment variables
dotenv.config({
  path: "./.env",
});

app.use(express.urlencoded({ extended: false }));

const JWT_SECRET = process.env.JWT_SECRET;

const mongoUrl = process.env.mongoUrl;

console.log(JWT_SECRET);
console.log(mongoUrl);

mongoose
  .connect(mongoUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

// Declare var
let sortField="fname";

//Register user
app.post("/register", async (req, res) => {
  const { fname, lname, email, password, userType } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.json({ error: "User Exists" });
    }
    await User.create({
      fname,
      lname,
      email,
      password: encryptedPassword,
      userType,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

//Login user
app.post("/login-user", async (req, res) => {
  const { email, password, t } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: "15m",
    });

    if (res.status(201)) {
      await User.updateOne({ email: email }, { $set: { lastLogin: t } });
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "InvAlid Password" });
});

app.post("/updateField",async(req,res)=>{
  const { updateField } = req.body;
  sortField=updateField;

})

//Get all users data
app.get("/getAllUser", async (req, res) => {
  try {
    const allUser = await User.find({}).sort({[sortField]:1});
    
    res.send({ status: "ok", data: allUser });
  } catch (error) {
    console.log(error);
  }
});

///
app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    console.log(user);
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }

    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

// Update progress
app.post("/updateProgress", async (req, res) => {
  const { clueNo, currUserEmail, currentTime } = req.body;
  const user = await User.findOne({ email: currUserEmail });

  if (clueNo === 0) {
    await User.updateMany(
      { email: currUserEmail },
      {
        $set: {
          noOfStageCompleted: clueNo,
          clue1CompTime: null,
          clue2CompTime: null,
          clue3CompTime: null,
          clue4CompTime: null,
          clue5CompTime: null,
          totalTime: null,
        },
      }
    );
  }

  if (clueNo === 1) {
    const clue1Time = currentTime - user.lastLogin;
    console.log(currentTime);
    console.log(clue1Time);

    await User.updateMany(
      { email: currUserEmail },
      { $set: { noOfStageCompleted: clueNo, clue1CompTime: clue1Time } }
    );
  }
  if (clueNo === 2) {
    const clue2Time = currentTime - user.clue1CompTime - user.lastLogin;
    console.log(currentTime);
    console.log(user.clue1CompTime);
    console.log(clue2Time);

    await User.updateMany(
      { email: currUserEmail },
      { $set: { noOfStageCompleted: clueNo, clue2CompTime: clue2Time } }
    );
  }
  if (clueNo === 3) {
    const clue3Time =
      currentTime - user.clue1CompTime - user.clue2CompTime - user.lastLogin;
    console.log(currentTime);
    console.log(user.clue2CompTime);
    console.log(clue3Time);

    await User.updateMany(
      { email: currUserEmail },
      { $set: { noOfStageCompleted: clueNo, clue3CompTime: clue3Time } }
    );
  }
  if (clueNo === 4) {
    const clue4Time =
      currentTime -
      user.clue1CompTime -
      user.clue2CompTime -
      user.clue3CompTime -
      user.lastLogin;
    console.log(currentTime);
    console.log(user.clue3CompTime);
    console.log(clue4Time);

    await User.updateMany(
      { email: currUserEmail },
      { $set: { noOfStageCompleted: clueNo, clue4CompTime: clue4Time } }
    );
  }
  if (clueNo === 5) {
    const clue5Time =
      currentTime -
      user.clue1CompTime -
      user.clue2CompTime -
      user.clue3CompTime -
      user.clue4CompTime -
      user.lastLogin;

    await User.updateMany(
      { email: currUserEmail },
      {
        $set: {
          noOfStageCompleted: clueNo,
          clue5CompTime: clue5Time,
        },
      }
    );

    totalTime =
      user.clue1CompTime +
      user.clue2CompTime +
      user.clue3CompTime +
      user.clue4CompTime +
      user.clue5CompTime;

    await User.updateOne(
      { email: currUserEmail },
      {
        $set: {
          totalTime: totalTime,
        },
      }
    );
  }
});



//Listening to port
app.listen(8000, () => {
  console.log("Listening to port 8000!! ");
});

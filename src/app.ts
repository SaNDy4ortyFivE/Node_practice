import express from "express";
import bodyParser from "body-parser";

//functional imports
import {generateAccessToken, generateRefreshToken} from "./authentication";
import {checkToken} from "./middleware";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello world");
})

//Normal login(1st time)
app.post("/login", (req, res) => {
  //Password check must be done using mongo
  //later if correct user_id should be retrieved for that user
  let user = {"user_id" : req.body.user_id};
  //Generate access token
  let access_token = generateAccessToken(user);
  //Generate refresh token
  let refresh_token = generateRefreshToken(user);
  //Send new refresh and access tokens
  res.json({ accessToken: access_token, refreshToken: refresh_token });

})

//Using middleware to check JWT Tokens
//If passed through middleware then login is successfull
app.post("/checktoken", checkToken,(req, res) => {
	res.send("Login Successfull");
})

app.listen(5001);
console.log("Server running...");


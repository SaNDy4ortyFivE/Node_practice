//function imports
import { sign, verify, JwtPayload } from 'jsonwebtoken';

//constant imports
import { ACCESS_TOKEN, REFRESH_TOKEN} from "./auth_tokens";

interface iuser{
        user_id:string;
}

//Generates a Access token based on user_id provided
function generateAccessToken(user: iuser):string{
  return sign(user, process.env.ACCESS_SECRET, { expiresIn: '5m' })
}

//Generates a Refresh token based on user_id provided
function generateRefreshToken(user: iuser):string{
  //Expires in 15mins
  return sign(user, process.env.REFRESH_SECRET, { expiresIn: '15m' })
}

//Decodes token to extract user_id
//If invalid returns error
//Not used anywhere!!!
function getUserIdFromAccessToken(access_token:string){
	var user_id:string = "";
	verify(access_token, process.env.ACCESS_SECRET, function(err, decoded) {
  		if(err){
			user_id = err!.name;
		}else{
			user_id = decoded!.user_id;
		}
	});
	return user_id;
}

function checkRefreshToken(refresh_token: string):string{
  var user_id:string = "";

  if(refresh_token !== null || refresh_token !== undefined){
	  verify(refresh_token, process.env.REFRESH_SECRET, function(err, decoded) {
  		if(err){
			console.log("Invalid Refresh Token");
			console.log(err!.name);
		}else{
			user_id = decoded!.user_id;
		}
	});
  }

  return user_id;
}

function checkAccessToken(access_token: string):string{
  var user_id:string = "";

  if(access_token != null || access_token !== undefined || access_token !== ""){
	  verify(access_token, ACCESS_TOKEN, function(err, decoded) {
  		if(err){
			console.log("Invalid Access Token");
			console.log(err!.name);
		}else{
			user_id = decoded!.user_id;
		}
	});
  }

  return user_id;
}

export {generateAccessToken, generateRefreshToken, getUserIdFromAccessToken, checkRefreshToken, checkAccessToken};

//function imports
import { sign, verify, JwtPayload } from 'jsonwebtoken';

//constant imports
import { ACCESS_TOKEN, REFRESH_TOKEN} from "./auth_tokens";

//interfaces impport
import { iuser, decoded_payload } from "./intf";


//Generates a Access token based on user_id provided
function generateAccessToken(user: iuser):string{
  return sign(user, ACCESS_TOKEN, { expiresIn: '5m' })
}

//Generates a Refresh token based on user_id provided
function generateRefreshToken(user: iuser):string{
  //Expires in 15mins
  return sign(user, REFRESH_TOKEN, { expiresIn: '15m' })
}

//Decodes token to extract user_id
//If invalid returns error
//Not used anywhere!!!
function getUserIdFromAccessToken(access_token:string){
	var user_id:string = "";
	verify(access_token, ACCESS_TOKEN, function(err, decoded) {
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
	  verify(refresh_token, REFRESH_TOKEN, function(err, decoded) {
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
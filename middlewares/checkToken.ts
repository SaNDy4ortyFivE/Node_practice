import { Request, Response, NextFunction } from 'express';

import {generateAccessToken, checkRefreshToken, checkAccessToken} from "./authentication";

function checkToken(req: Request, res: Response, next: NextFunction){
	//Get tokens for header
		const authHeader = req.headers['authorization']!;
		var refresh_token:string = ""
		var access_token:string = "";
		if(authHeader !== null || authHeader !== undefined){
			let split_string:string[] = authHeader.split(' ');
			refresh_token = split_string[2];
			access_token = split_string[1];
		}
	//Check refresh token
	var user_id_from_refresh:string = checkRefreshToken(refresh_token);
	//If token empty, ask to login
	if(user_id_from_refresh === ""){
		res.status(401).send("Please login to access the site");
	}else{
		//Check Access token
		var user_id_from_access:string = checkAccessToken(access_token);
		//If invalid access token, generate new token
		if(user_id_from_access === ""){
			res.send({"access_token": generateAccessToken({"user_id" : user_id_from_refresh})});
		}else{
			req.body.userId = user_id_from_refresh;
			req.body.isAuthorized = true;
			next();
		}
	}
}

export {checkToken}

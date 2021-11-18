import { Request, Response, NextFunction } from 'express';

import {generateAccessToken, checkRefreshToken, checkAccessToken} from "./authentication";

function checkToken(req: Request, res: Response, next: NextFunction){
	//Check refresh token
	var user_id_from_refresh:string = checkRefreshToken(req.body["refresh_token"]);
	//If token empty, ask to login
	if(user_id_from_refresh === ""){
		res.status(401).send("Please login to access the site");
	}else{
		//Get Access token for header
		const authHeader:string = req.headers['authorization']!;
		var access_token:string = "";
		if(authHeader !== null || authHeader !== undefined){
			access_token = authHeader && authHeader.split(' ')[1];
		}
		//Check Access token
		var user_id_from_access:string = checkAccessToken(access_token);
		//If invalid access token, generate new token
		if(user_id_from_access === ""){
			res.send({"access_token": generateAccessToken({"user_id" : user_id_from_refresh})});
		}else{
			req.body.userId = user_id_from_refresh;
			next();
		}
	}
}

export {checkToken}
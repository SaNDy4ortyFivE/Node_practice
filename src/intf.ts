interface iuser{
    user_id:string;
}

interface decoded_payload{
	user_id:string;
	iat:number;
	exp:number;
}

interface iusercollection{
    name:string;
    phone:number;
    email:string;
    password:string;
    role:string;
    user_id:string;
}

export {iuser, iusercollection, decoded_payload};
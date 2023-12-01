import axios from "axios";
import { AUTH_CONFIG } from "./authConfig";

const fs = require('fs');
const crypto = require('crypto');

/**
 * Defines expected JSON input to /create_session API endpoint
 */
interface sessionIdRequest {
    "email_addr": string, //Email of user
    "token": string       // API token to authorize action
}

/**
 * Defines results from calling /create_session API endpoint
 */
interface sessionIdResponse {
    "session_id": string // User's session ID (specific to email, unique across login instances)
}

/**
 * Defines results from calling getSessionId()
 */
interface getSessionIdResponse {
    success: boolean,   //Whether or not we were able to get user's info
    error_msg: string,  //If failed, provide error message. Else, empty string.
    session_id: string,      //If success, provide user email. Else, empty string.
}

async function getSessionId(email: string): Promise<getSessionIdResponse> {

    const results: getSessionIdResponse = { //Initialize our return type
        success: true,
        error_msg: "",
        session_id: ""
    };

    results.session_id = crypto.randomUUID();
    return Promise.resolve(results);
}

// async function getSessionId(email: string): Promise<getSessionIdResponse> {
//     const results: getSessionIdResponse = { //Initialize our return type
//         success: true,
//         error_msg: "",
//         session_id: ""
//     };

//     const requestJSON: sessionIdRequest = {
//         email_addr: email,
//         token: "YOUR_SHARED_SECRET_HERE" //Note: For security, the API endpoint to get a new session ID
//                                          //should take in some kind of shared secret (could be keys or 
//                                          //a known string secret) and validate it.
                                         
//                                          //Otherwise, anyone can just get a session to your application
//                                          //and effectively be logged in.
//     };

//     let response;
//     try {
//         response = await axios.post<sessionIdResponse>(AUTH_CONFIG.session_id_uri, requestJSON);
//         results.session_id = response.data.session_id; //Get session ID from JSON object
//     } catch (error) {
//         results.success = false;
//         results.error_msg = "Failed to get a new Session ID for this user";
//         results.session_id = "";
//     }

//     return results;
// }

export { getSessionId };

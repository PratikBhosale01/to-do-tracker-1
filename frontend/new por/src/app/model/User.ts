import { userprofile } from "./UserProfile"

export type user ={
   
        emailId?:string,
        username?:string,
        password?:string,
        // firstName?:string,
        // lastName?:string,
        // contact?:string,
        // uploadImage?:string,
        userProfile?:userprofile;
        tasks?:[],
        archive?:[],
        completed?:[]
      
}
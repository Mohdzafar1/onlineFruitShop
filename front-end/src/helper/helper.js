export const setAuthToken=(token)=>{
   const tokres= localStorage.setItem('Auth_Token',token)
   return tokres
}

export const getAuthToken=()=>{
    const token= localStorage.getItem('Auth_Token')
    return token
 }

 export const setCredential = ({email,token}) => {
   if (!token) throw new Error("Token is required");
   localStorage.setItem("email", email);
   return true; // Indicate success
 };
 
 // Retrieve the authentication token from localStorage
 export const getCredential = () => {
   const token = localStorage.getItem("email");
   return token || null; // Return null if no token is found
 };
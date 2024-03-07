import axios  from "axios";

const checkJwt = async() => {
  const jwt = localStorage.getItem('jwt');
  if(jwt) {
    try{
      await axios.post(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/auth/verifyjwt`, {jwt});
      return true;
      }
      catch(err) {
        console.log(err);
        localStorage.removeItem('jwt');
        return false;
      }
    }
    return false;
  }

export default checkJwt;
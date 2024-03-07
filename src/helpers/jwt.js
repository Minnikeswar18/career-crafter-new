import axios  from "axios";

const checkJwt = async() => {
    const jwt = localStorage.getItem('jwt');
    if(jwt) {
      try{
        await axios.post('http://localhost:8000/auth/verifyjwt', {jwt});
        return true;
      }
      catch(err) {
        console.log(err.response.data);
        localStorage.removeItem('jwt');
        return false;
      }
    }
    return false;
  }

export default checkJwt;
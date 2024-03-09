import axios  from "axios";

const checkJwt = async() => {
  const jwt = localStorage.getItem('jwt');
  if(jwt) {
    try{
        await axios.post(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/auth/verifyjwt`, {jwt});
        axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
        return true;
      }
      catch(err) {
        console.log(err);
        return false;
      }
    }
    return false;
  }

export default checkJwt;
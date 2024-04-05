import axios  from "axios";

const checkJwt = async() => {
  const jwt = localStorage.getItem('jwt');
  if(jwt) {
    try{
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/verifyjwt`, {jwt});
        axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
        return response.data;
      }
      catch(err) {
        console.log(err);
        return null;
      }
    }
    return null;
  }

export default checkJwt;
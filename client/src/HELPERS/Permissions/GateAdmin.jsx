import { useSelector } from 'react-redux';
import CONST from '../../CONSTANTS/CONST';
import jwtDecode from 'jwt-decode';

const GateAdmin = ({children}) => {
  const auth = useSelector(state => state.userStore);

  /* if (!auth?.user.role === CONST.ADMIN) {
    return '';
  } */

  const token = JSON.parse(localStorage.getItem('auth'))?.token;

  // if: guest
  if (!token) return <></>

  // if: token exist and it's admin
  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.role !== CONST.ADMIN) {
      return <></>
    }
  }

  return (
    <>
    { children }
    </>
  )
}

export default GateAdmin;
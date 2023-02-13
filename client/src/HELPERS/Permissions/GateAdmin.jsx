import { useSelector } from 'react-redux';
import CONST from '../../CONSTANTS/CONST';

const GateAdmin = ({children}) => {
  const auth = useSelector(state => state.userStore);

  if (!auth?.user.role === CONST.ADMIN) {
    return '';
  }

  return (
    <>
    { children }
    </>
  )
}

export default GateAdmin;
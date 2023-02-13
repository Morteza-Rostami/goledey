import { useSelector } from 'react-redux';

const GateAuth = ({children}) => {
  const auth = useSelector(state => state.userStore);

  if (!auth?.token) {
    return '';
  }

  return (
    <>
    { children }
    </>
  )
}

export default GateAuth;
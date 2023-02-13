import { useSelector } from 'react-redux';

const GateGuest = ({children}) => {
  const auth = useSelector(state => state.userStore);

  if (auth?.token) {
    return '';
  }

  return (
    <>
    { children }
    </>
  )
}

export default GateGuest;
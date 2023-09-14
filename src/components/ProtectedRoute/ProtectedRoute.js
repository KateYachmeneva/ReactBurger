import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';

export function ProtectedRoute({ onlyUnAuth, children}) {
  const { authChecked } = useSelector((store) => store.auth)
  console.log(authChecked)
  const { email } = useSelector((store) => store.userData);
  console.log(email);
  const location = useLocation();
  const myState = location.state 

  if (!authChecked) {
    return <h1>Данные загружаются!</h1>
  }

  if (onlyUnAuth && email) {
    const { from } = myState || { from: { pathname: "/" } }
    return <Navigate to={from.pathname} />
  }

  if (!onlyUnAuth && !email) {
    return <Navigate to="/login" state={{ from: location }} />
  }

  return <>{children}</>
}
ProtectedRoute.propTypes = {
 onlyUnAuth: PropTypes.bool,
children: PropTypes.object
};

export default ProtectedRoute
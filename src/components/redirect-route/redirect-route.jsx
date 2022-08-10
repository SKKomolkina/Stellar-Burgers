import {useDispatch, useSelector} from "react-redux";
import {Redirect, Route, useLocation} from "react-router-dom";
import {useEffect} from "react";
import {getUser} from "../../services/actions/user";

const RedirectRoute = ({children}) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const {user, isAuth} = useSelector((state) => ({
        user: state.user.user,
        isAuth: state.user.isAuth,
    }));

    const pathName = location.state && location.state.from ? location.state.from.pathname : '/';

    useEffect(() => {
        dispatch(getUser())
    });

    return (
        <Route render={({location}) =>
            !user ? (
                children
            ) : (
                <Redirect to={{pathname: pathName, state: {from: location},}}/>
            )}
        />
    )
}

export default RedirectRoute;

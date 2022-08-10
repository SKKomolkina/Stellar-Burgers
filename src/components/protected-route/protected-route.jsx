import {Redirect, Route} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../services/actions/user";
import {useEffect} from "react";

const ProtectedRoute = ({children, path}) => {
    const dispatch = useDispatch();

    const {user} = useSelector(state => ({
        user: state.user.user.user,
    }));

    useEffect(() => {
        dispatch(getUser())
    }, []);

    return (
        <Route
            exact
            path={path}
            render={({ location }) =>
                user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/sign-in',
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    )
}

export default ProtectedRoute;

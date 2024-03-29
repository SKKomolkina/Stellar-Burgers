import React, {useEffect} from "react";

import {Redirect, Route} from "react-router-dom";
import {RouteProps} from "react-router";
import {useDispatch, useSelector} from "../../services/hooks";
import {getUser} from "../../services/actions/user";

const ProtectedRoute: React.FC<RouteProps> = ({children, path}) => {
    const dispatch = useDispatch();

    const {user} = useSelector((state: any) => ({
        user: state.user.authSuccess,
    }));

    // useEffect(() => {
    //     dispatch(getUser())
    // }, []);

    return (
        <Route
            exact
            path={path}
            // @ts-ignore
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

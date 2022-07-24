import {useEffect, useState} from "react";
import {getItems} from "../../services/actions/ingredients";
import {useDispatch, useSelector} from "react-redux";

import styles from './app.module.css';

import AppHeader from "../app-header/app-header";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";

import Main from "../../pages/main/main";
import {Redirect, Route, Switch, useHistory, useLocation} from "react-router-dom";
import SignIn from "../../pages/auth/sign-in/sign-in";
import SignUp from "../../pages/auth/sign-up/sign-up";
import ForgotPassword from "../../pages/auth/forgot-password/forgot-password";
import ResetPassword from "../../pages/auth/reset-password/reset-password";
import ProtectedRoute from "../protected-route/protected-route";
import {getUser} from "../../services/actions/user";
import Profile from "../../pages/profile/profile";
import {getCookie} from "../../utils/utils";
import {updateTokenRequest} from "../../utils/auth";
import IngredientPage from "../ingredient-page/ingredient-page";


function App() {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const background = location.state && location.state.background;

    const {userState} = useSelector(state => ({
        userState: state.user.authSuccess,
    }));

    const [openOrder, setOpenOrder] = useState(false);
    const [openInfo, setOpenInfo] = useState(false);

    const closeAllModals = () => {
        setOpenInfo(false);
        setOpenOrder(false);
        history.push('/');
    }

    useEffect(() => {
        dispatch(getItems())
    }, [dispatch]);

    useEffect(() => {
        dispatch(getUser())
    }, []);

    useEffect(() => {
        if (!userState && getCookie('accessToken')) {
            dispatch(getUser())
        }
    }, [dispatch, userState])

    return (
        <div className={styles.app}>
            <AppHeader/>
            <Switch location={background || location}>
                <ProtectedRoute exact={true} path='/'>
                    <Main openInfoModal={setOpenInfo} openOrderModal={setOpenOrder}/>
                </ProtectedRoute>
                <Route exact={true} path='/sign-in'>
                    {!userState ? <SignIn/> : <Redirect to='/'/>}
                </Route>
                <Route exact={true} path='/sign-up'>
                    {!userState ? <SignUp/> : <Redirect to='/'/>}
                </Route>
                <Route exact={true} path='/forgot-password'>
                    {!userState ? <ForgotPassword/> : <Redirect to='/'/>}
                </Route>
                <Route exact={true} path='/reset-password'>
                    <ResetPassword/>
                </Route>
                <ProtectedRoute exact={true} path='/profile'>
                    <Profile/>
                </ProtectedRoute>

                <Route path='/ingredients/:id' exact={true}>
                    <IngredientPage />
                </Route>
            </Switch>

            {background && (
                <Switch>
                    <Route path='/ingredients/:id'>
                        {openInfo ?
                            (<Modal setIsOpen={setOpenInfo} isOpen={openInfo} close={closeAllModals}>
                                <IngredientDetails/>
                            </Modal>)
                            : null}
                    </Route>

                    <Route path='/order-details'>
                        {openOrder ?
                            (<Modal setIsOpen={setOpenOrder} isOpen={openOrder} close={closeAllModals}>
                                <OrderDetails/>
                            </Modal>)
                            : null}
                    </Route>
                </Switch>
            )}
        </div>
    );
}

export default App;

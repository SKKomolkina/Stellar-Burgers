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

    const {userState, forgotPassword} = useSelector(state => ({
        userState: state.user.authSuccess,
        forgotPassword: state.user.forgotPassword,
    }));

    const [openOrder, setOpenOrder] = useState(false);
    const [openInfo, setOpenInfo] = useState(false);

    const [resetPassword, setResetPassword] = useState(false);

    const closeAllModals = () => {
        setOpenInfo(false);
        setOpenOrder(false);
        history.push('/');
    }

    useEffect(() => {
        dispatch(getItems())
    }, [dispatch]);

    useEffect(() => {
        if (!userState && getCookie('accessToken')) {
            dispatch(getUser())
        }
    }, [dispatch, userState]);

    return (
        <div className={styles.app}>
            <AppHeader/>
            <Switch location={background || location}>
                <Route exact={true} path='/'>
                    <Main openInfoModal={setOpenInfo} openOrderModal={setOpenOrder}/>
                </Route>
                <Route exact={true} path='/sign-in'>
                    <SignIn/>
                </Route>
                <Route exact={true} path='/sign-up'>
                    {!userState ? <SignUp/> : <Redirect to='/'/>}
                </Route>
                <Route exact={true} path='/forgot-password'>
                    {!userState ? <ForgotPassword setResetPassword={setResetPassword}/> : <Redirect to='/'/>}
                </Route>
                <Route exact={true} path='/reset-password'>
                    {forgotPassword ? <ResetPassword/> : <Redirect to='/forgot-password'/>}
                </Route>
                <ProtectedRoute exact={true} path='/profile'>
                    <Profile/>
                </ProtectedRoute>

                <Route path='/ingredients/:id' exact={true}>
                    <IngredientPage/>
                </Route>
            </Switch>

            {background && (
                <>
                    <Route path='/ingredients/:id'>
                        {openInfo ?
                            (<Modal setIsOpen={setOpenInfo} isOpen={openInfo} close={closeAllModals}>
                                <IngredientDetails/>
                            </Modal>)
                            : null}
                    </Route>
                </>
            )}

            {openOrder ? (
                <Modal setIsOpen={setOpenOrder} isOpen={openOrder} close={closeAllModals}>
                    <OrderDetails/>
                </Modal>
            ) : null}
        </div>
    );
}

export default App;

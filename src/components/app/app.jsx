import {useEffect, useState} from "react";
import {getItems} from "../../services/actions/ingredients";
import {useDispatch, useSelector} from "react-redux";

import styles from './app.module.css';

import AppHeader from "../app-header/app-header";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";

import Main from "../../pages/main/main";
import {Redirect, Route, Switch, useHistory} from "react-router-dom";
import SignIn from "../../pages/auth/sign-in/sign-in";
import SignUp from "../../pages/auth/sign-up/sign-up";
import ForgotPassword from "../../pages/auth/forgot-password/forgot-password";
import ResetPassword from "../../pages/auth/reset-password/reset-password";
import ProtectedRoute from "../protected-route/protected-route";
import {getUser} from "../../services/actions/user";


function App() {
    const dispatch = useDispatch();
    const history = useHistory();

    // const {user} = useSelector(state => ({
    //     user: state.user.user.user,
    // }));

    const [openOrder, setOpenOrder] = useState(false);
    const [openInfo, setOpenInfo] = useState(false);

    const closeAllModals = () => {
        setOpenInfo(false);
        setOpenOrder(false);
    }

    useEffect(() => {
        dispatch(getItems())
    }, [dispatch]);

    // useEffect(() => {
    //     dispatch(getUser())
    // }, []);

    return (
        <div className={styles.app}>
            <AppHeader/>
            <Switch>
                <ProtectedRoute exact path='/'>
                    <Main openInfoModal={setOpenInfo} openOrderModal={setOpenOrder}/>
                </ProtectedRoute>
                <Route path='/sign-in'>
                    <SignIn/>
                </Route>
                <Route path='/sign-up'>
                    <SignUp/>
                </Route>
                <Route path='/forgot-password'>
                    <ForgotPassword/>
                </Route>
                <Route path='/reset-password'>
                    <ResetPassword/>
                </Route>
            </Switch>

            {openOrder ?
                (<Modal setIsOpen={setOpenOrder} isOpen={openOrder} close={closeAllModals}>
                    <OrderDetails/>
                </Modal>)
                : null}

            {openInfo ?
                (<Modal setIsOpen={setOpenInfo} isOpen={openInfo} close={closeAllModals}>
                    <IngredientDetails/>
                </Modal>)
                : null}
        </div>
    );
}

export default App;

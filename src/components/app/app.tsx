import {useEffect, useState} from "react";
import {getItems} from "../../services/actions/ingredients";
import {useDispatch, useSelector} from "../../services/hooks";
import {Redirect, Route, Switch, useHistory, useLocation} from "react-router-dom";
import {Location} from "history";
import styles from './app.module.css';

import AppHeader from "../app-header/app-header";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Main from "../../pages/main/main";
import SignIn from "../../pages/auth/sign-in/sign-in";
import SignUp from "../../pages/auth/sign-up/sign-up";
import ForgotPassword from "../../pages/auth/forgot-password/forgot-password";
import ResetPassword from "../../pages/auth/reset-password/reset-password";
import ProtectedRoute from "../protected-route/protected-route";
import {getUser} from "../../services/actions/user";
import Profile from "../../pages/profile/profile";
import {getCookie} from "../../utils/utils";
import IngredientPage from "../ingredient-page/ingredient-page";
import Feed from "../../pages/feed/feed";
import FeedPage from "../../pages/feed-page/feed-page";
import FeedProfile from "../../pages/auth/feed-profile/feed-profile";
import FeedPageDetails from "../../pages/feed-page/feed-page-details";

const App = ():JSX.Element => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation<{background: Location}>();
    const background = location.state && location.state.background;

    const {userState, forgotPassword} = useSelector((state) => ({
        userState: state.user.authSuccess,
        forgotPassword: state.user.forgotPassword,
    }));

    const [openOrder, setOpenOrder] = useState<boolean>(false);
    const [openInfo, setOpenInfo] = useState<boolean>(false);
    const [openFeed, setOpenFeed] = useState<boolean>(false);

    const closeAllModals = () => {
        setOpenInfo(false);
        setOpenOrder(false);
        setOpenFeed(false);
        history.goBack();
    }

    useEffect(() => {
        dispatch(getItems())
    }, [dispatch]);

    useEffect(() => {
        // if (!userState && getCookie('accessToken')) {
        //     dispatch(getUser())
        // }
        if (!userState) {
            dispatch(getUser())
        }
    }, [userState]);

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
                    {!userState ? <ForgotPassword /> : <Redirect to='/'/>}
                </Route>

                <Route exact={true} path='/reset-password'>
                    {forgotPassword ? <ResetPassword/> : <Redirect to='/forgot-password'/>}
                </Route>

                <ProtectedRoute exact={true} path='/profile'>
                    <Profile/>
                </ProtectedRoute>

                <ProtectedRoute exact path='/profile/orders'>
                    <FeedProfile openFeedModal={setOpenFeed} />
                </ProtectedRoute>

                <ProtectedRoute exact path='/profile/orders/:id'>
                    <FeedPage/>
                </ProtectedRoute>

                <Route path='/ingredients/:id' exact={true}>
                    <IngredientPage/>
                </Route>

                <Route path='/feed' exact>
                    <Feed openFeedModal={setOpenFeed} />
                </Route>

                <Route path='/feed/:id' exact={true}>
                    <FeedPage/>
                </Route>
            </Switch>

            {background && (
                <Switch>
                    <Route path='/ingredients/:id' children={
                        <Modal setIsOpen={setOpenInfo} isOpen={openInfo} close={closeAllModals}>
                            <IngredientDetails />
                        </Modal>
                    }/>

                    <Route path='/feed/:id' children={
                        <Modal setIsOpen={setOpenFeed} isOpen={openInfo} close={closeAllModals}>
                            <FeedPageDetails />
                        </Modal>
                    }/>

                    <Route path='/profile/orders/:id' children={
                        <Modal setIsOpen={setOpenFeed} isOpen={openInfo} close={closeAllModals}>
                            <FeedPageDetails />
                        </Modal>
                    }/>
                </Switch>
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

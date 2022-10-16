import styles from "../../pages/profile/profile.module.css";
import {NavLink, useHistory} from "react-router-dom";
import React from "react";
import {useDispatch} from "../../services/hooks";
import {logOut} from "../../services/actions/user";

const ProfileNav = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const handleLogOut = (evt: React.FormEvent) => {
        evt.preventDefault();

        dispatch(logOut());
    }

    return (
        <div className={styles.navigation}>
            <NavLink className={`text text_type_main-medium text_color_inactive ${styles.link}`}
                     activeClassName={`text text_type_main-medium ${styles.activeLink}`}
                     to='/profile'
            exact>
                Профиль
            </NavLink>
            <NavLink to='/profile/orders' className={`text text_type_main-medium text_color_inactive  ${styles.link}`}
                     activeClassName={`text text_type_main-medium ${styles.activeLink}`}>
                История заказов
            </NavLink>
            <NavLink to='/sign-in'
                     className={`text text_type_main-medium text_color_inactive ${styles.link}`}
                     activeClassName={`text text_type_main-medium ${styles.activeLink}`}
                     onClick={(evt) => handleLogOut(evt)}>
                Выход
            </NavLink>
        </div>
    )
}

export default ProfileNav;

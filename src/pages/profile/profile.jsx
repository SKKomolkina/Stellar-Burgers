import styles from './profile.module.css';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {logOut, updateUser} from "../../services/actions/user";
import {useState} from "react";
import {NavLink, useHistory} from "react-router-dom";

const Profile = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.user.user);

    const [nameValue, setNameValue] = useState(user.name);
    const [emailValue, setEmailValue] = useState(user.email);
    const [passwordValue, setPasswordValue] = useState('');

    const handleChange = (evt) => {
        if (evt.target.name === 'email') {
            setEmailValue(evt.target.value);
        } else {
            setNameValue(evt.target.value);
        }
    }

    const handleLogOut = (evt) => {
        evt.preventDefault();

        dispatch(logOut());
    }

    const handleChangeInfo = (evt, email, name) => {
        evt.preventDefault();

        dispatch(updateUser(email, name));
    }

    const handleCancel = (evt) => {
        evt.preventDefault();

        setNameValue(user.name);
        setEmailValue(user.email);
    }

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <div className={styles.navigation}>
                    <NavLink className={`text text_type_main-medium ${styles.link}`}
                             activeClassName={`text text_type_main-medium text_color_inactive text_color_inactive ${styles.activeLink}`}
                             to='/profile'>
                        Профиль
                    </NavLink>
                    <NavLink to='/list' className={`text text_type_main-medium ${styles.link}`}
                             activeClassName={`text text_type_main-medium text_color_inactive  ${styles.activeLink}`}>
                        История заказов
                    </NavLink>
                    <NavLink to='/sign-in'
                             className={`text text_type_main-medium ${styles.link}`}
                             activeClassName={`text text_type_main-medium text_color_inactive  ${styles.activeLink}`}
                             onClick={(evt) => handleLogOut(evt)}>
                        Выход
                    </NavLink>
                </div>

                <form onSubmit={(evt) => handleChangeInfo(evt, emailValue, nameValue)} className={styles.form}>
                    <Input onChange={(evt) => handleChange(evt)}
                           placeholder='Имя'
                           value={nameValue}
                           name='name'
                           icon={"EditIcon"}
                    />
                    <Input
                        onChange={(evt) => handleChange(evt)}
                        placeholder='Логин'
                        value={emailValue}
                        name='email'
                        icon={"EditIcon"}
                    />
                    <Input
                        placeholder='Пароль'
                        value={passwordValue}
                        name='password'
                        icon={"HideIcon"}
                    />

                    <Button
                            size={"medium"}>
                        Сохранить
                    </Button>
                    <Button onClick={(evt) => handleCancel(evt)}
                            size={"medium"}>
                        Отменить
                    </Button>
                </form>
            </div>
        </main>
    )
}

export default Profile;

import styles from './profile.module.css';
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Button} from "../../components/button-ui";
import {useDispatch, useSelector} from "react-redux";
import {logOut, updateUser} from "../../services/actions/user";
import React, {useState} from "react";
import {NavLink, useHistory} from "react-router-dom";

const Profile = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {user} = useSelector((state: any) => state.user.user);

    const [nameValue, setNameValue] = useState<string>(user.name);
    const [emailValue, setEmailValue] = useState<string>(user.email);
    const [passwordValue, setPasswordValue] = useState<string>('');

    // const handleChange = (evt) => {
    //     if (evt.target.name === 'email') {
    //         setEmailValue(evt.target.value);
    //     } else if (evt.target.name === 'password') {
    //         setPasswordValue('')
    //     } else {
    //         setNameValue(evt.target.value);
    //     }
    // }

    const handleLogOut = (evt: React.FormEvent) => {
        evt.preventDefault();

        // @ts-ignore
        dispatch(logOut());
    }

    const handleChangeInfo = (evt: React.FormEvent, email: string, name: string) => {
        evt.preventDefault();

        // @ts-ignore
        dispatch(updateUser(email, name));
    }

    const handleCancel = (evt: React.FormEvent) => {
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
                    <Input onChange={(evt) => setNameValue(evt.target.value)}
                           placeholder='Имя'
                           value={nameValue}
                           name='name'
                           icon={"EditIcon"}
                    />
                    <Input
                        onChange={(evt) => setEmailValue(evt.target.value)}
                        placeholder='Логин'
                        value={emailValue}
                        name='email'
                        icon={"EditIcon"}
                    />
                    <Input
                        onChange={(evt) => setPasswordValue(evt.target.value)}
                        placeholder='Пароль'
                        value=''
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

import {useState, useRef, useEffect, useCallback} from "react";

import styles from '../auth.module.css';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";

import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUser, login} from "../../../services/actions/user";

const SignIn = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    // const {user} = useSelector(state => ({
    //     user: state.user.user.user,
    // }));
    //
    // useEffect(() => {
    //     dispatch(getUser())
    // }, []);

    const [emailValue, setEmailValue] = useState('');
    const emailRef = useRef(null);

    const [passwordValue, setPasswordValue] = useState('');
    const passwordRef = useRef(null);

    const [disabledButton, setDisabledButton] = useState(false);

    const handleChange = (evt) => {
        if (evt.target.name === 'email') {
            setEmailValue(evt.target.value);
        } else {
            setPasswordValue(evt.target.value);
        }
        setDisabledButton(false);
    }

    const handleSignIn = (evt, email, password) => {
        evt.preventDefault();

        dispatch(login(email, password));
        setDisabledButton(true);
        history.push({pathname: '/'});
    }

    useEffect(() => {
        setDisabledButton(false);
    }, []);

    return (
        <main className={styles.main}>
            <form className={styles.form}>
                <h1 className={'text text_type_main-medium mb-2'}>Вход</h1>
                <Input
                    ref={emailRef}
                    value={emailValue}
                    onChange={(evt) => handleChange(evt)}
                    placeholder='E-mail'
                    name='email'
                    type={"email"}
                />
                <Input
                    ref={passwordRef}
                    value={passwordValue}
                    onChange={(evt) => handleChange(evt)}
                    placeholder='Password'
                    name='password'
                    icon={"HideIcon"}
                    type={"password"}
                />

                <Button disabled={disabledButton} onClick={(evt) => handleSignIn(evt, emailValue, passwordValue)} type="primary" size="medium">
                    Вход
                </Button>

                <p className="text text_type_main-default text_color_inactive mt-10">
                    Вы — новый пользователь?
                    <Link
                        className={`${styles.link} text text_type_main-default text_color_inactive ml-2`}
                        to='/sign-up'>
                        Зарегистрироваться
                    </Link>
                </p>

                <p className="text text_type_main-default text_color_inactive">
                    Забыли пароль?
                    <Link
                        className={`${styles.link} text text_type_main-default text_color_inactive ml-2`}
                        to='/forgot-password'>
                        Восстановить пароль
                    </Link>
                </p>
            </form>
        </main>
    )
}

export default SignIn;

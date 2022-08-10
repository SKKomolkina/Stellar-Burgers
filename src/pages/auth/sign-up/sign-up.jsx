import {useState, useRef, useEffect} from "react";
import {registration} from "../../../services/actions/user";

import styles from '../auth.module.css';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

const SignUp = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const {user} = useSelector(store => store.user);
    const {userState} = useSelector(state => ({
        userState: state.user.authSuccess,
    }));

    const [nameValue, setNameValue] = useState('');
    const nameRef = useRef(null);

    const [emailValue, setEmailValue] = useState('');
    const emailRef = useRef(null);

    const [passwordValue, setPasswordValue] = useState('');
    const passwordRef = useRef(null);

    const handleChange = (evt) => {
        if (evt.target.name === 'email') {
            setEmailValue(evt.target.value);
        } else if (evt.target.name === 'name') {
            setNameValue(evt.target.value);
        } else {
            setPasswordValue(evt.target.value);
        }
    }

    const handleSignUp = (evt, email, password, name) => {
        evt.preventDefault();

        dispatch(registration(email, password, name))
        history.push('/sign-in');
    }

    if (userState) {
        return <Redirect to={history?.location?.state?.from || '/'} />;
    }

    // useEffect(() => {
    //     setNameValue('');
    //     setEmailValue('');
    //     setPasswordValue('');
    // }, []);

    return (
        <main className={styles.main}>
            <form onSubmit={(evt) => handleSignUp(evt, emailValue, passwordValue, nameValue)} className={styles.form}>
                <h1 className={'text text_type_main-medium mb-2'}>Регистрация</h1>
                <Input
                    ref={nameRef}
                    value={nameValue}
                    onChange={(evt) =>handleChange(evt)}
                    placeholder='Имя'
                    name='name'
                    type={"text"}
                />
                <Input
                    ref={emailRef}
                    value={emailValue}
                    onChange={(evt) =>handleChange(evt)}
                    placeholder='E-mail'
                    name='email'
                    type={"email"}
                />
                <Input
                    ref={passwordRef}
                    value={passwordValue}
                    onChange={(evt) =>handleChange(evt)}
                    placeholder='Password'
                    name='password'
                    icon={"HideIcon"}
                    type={"password"}
                />

                <Button type="primary" size="medium">
                    Зарегистрироваться
                </Button>

                <p className="text text_type_main-default text_color_inactive mt-15">
                    Уже зарегистрированы?
                    <Link
                        className={`${styles.link} text text_type_main-default text_color_inactive ml-2`}
                        to='/sign-in'
                    >
                        Войти
                    </Link>
                </p>
            </form>
        </main>
    )
}

export default SignUp;

import {useState, useRef, useEffect} from "react";
import {forgotPasswordRequest} from "../../../utils/auth";
import {useHistory, useLocation} from "react-router-dom";

import styles from '../auth.module.css';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {forgotPassword} from "../../../services/actions/user";

const ForgotPassword = ({setResetPassword}) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const {forgotPasswordState} = useSelector(state => ({forgotPasswordState: state.user.forgotPassword}))

    const [emailValue, setEmailValue] = useState('');
    const emailRef = useRef(null);

    const handleChange = (evt) => {
        setEmailValue(evt.target.value);
    }

    const sendForgotPasswordRequest = (evt, email) => {
        evt.preventDefault();

        dispatch(forgotPassword(email))
    }

    useEffect(() => {
        setEmailValue('');
    }, []);

    useEffect(() => {
        if (forgotPasswordState) {
            history.push('/reset-password');
        }
    }, [forgotPasswordState])

    return (
        <main className={styles.main}>
            <form onSubmit={(evt) => sendForgotPasswordRequest(evt, emailValue)} className={styles.form}>
                <h1 className={'text text_type_main-medium mb-2'}>Восстановление пароля</h1>
                <Input
                    ref={emailRef}
                    value={emailValue}
                    onChange={handleChange}
                    placeholder='Укажите e-mail'
                    name='email'
                    type={"email"}
                    required={true}
                />

                <Button
                        type="primary" size="medium">
                    Восстановить
                </Button>

                <p className="text text_type_main-default text_color_inactive mt-10">
                    Вспомнили пароль?
                    <Link to='/sign-in' className={`${styles.link} text text_type_main-default text_color_inactive ml-2`}>
                        Войти
                    </Link>
                </p>
            </form>
        </main>
    )
}

export default ForgotPassword;

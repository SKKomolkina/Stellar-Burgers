import React, {useState, useRef, useEffect} from "react";

import styles from '../auth.module.css';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {resetPassword} from "../../../services/actions/user";

const ResetPassword = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [passwordValue, setPasswordValue] = useState<string>('');
    const passwordRef = useRef<HTMLInputElement>(null);

    const [codeValue, setCodeValue] = useState<string>('');
    const codeRef = useRef<HTMLInputElement>(null);

    // const handleChange = (evt) => {
    //     if (evt.target.name === 'password') {
    //         setPasswordValue(evt.target.value)
    //     } else {
    //         setCodeValue(evt.target.value);
    //     }
    // }

    const sendResetPasswordRequest = (evt: React.FormEvent, password: string, token: string) => {
        evt.preventDefault();

        // @ts-ignore
        dispatch(resetPassword(password, token))
        history.push('/sign-in');
    }

    useEffect(() => {
        setPasswordValue('');
        setCodeValue('');
    }, []);

    return (
        <main className={styles.main}>
            <form onSubmit={(evt) => sendResetPasswordRequest(evt, passwordValue, codeValue)}  className={styles.form}>
                <h1 className={'text text_type_main-medium mb-2'}>Восстановление пароля</h1>
                <Input
                    ref={passwordRef}
                    value={passwordValue}
                    onChange={(evt) => setPasswordValue(evt.target.value)}
                    placeholder='Введите новый пароль'
                    name='password'
                    icon={"HideIcon"}
                    type={"password"}
                />
                <Input
                    ref={codeRef}
                    value={codeValue}
                    onChange={(evt) => setCodeValue(evt.target.value)}
                    placeholder='Введите код из письма'
                    name='code'
                    type={"text"}
                />

                {/* @ts-ignore */}
                <Button type="primary" size="medium">
                    Сохранить
                </Button>

                <p className="text text_type_main-default text_color_inactive mt-10">
                    Вспомнили пароль?
                    <Link to='/sign-up' className={`${styles.link} text text_type_main-default text_color_inactive ml-2`}>
                        Войти
                    </Link>
                </p>
            </form>
        </main>
    )
}

export default ResetPassword;

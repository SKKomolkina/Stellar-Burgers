import styles from './profile.module.css';
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Button} from "../../components/button-ui";
import {useDispatch, useSelector} from "../../services/hooks";
import {logOut, updateUser} from "../../services/actions/user";
import React, {useState} from "react";
import {NavLink, useHistory} from "react-router-dom";
import ProfileNav from "../../components/profile-nav/profile-nav";

const Profile = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {user} = useSelector((state: any) => ({
        user: state.user,
    }));

    console.log(user);

    const [nameValue, setNameValue] = useState<string>(user.user.name);
    const [emailValue, setEmailValue] = useState<string>(user.user.email);
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

    const handleChangeInfo = (evt: React.FormEvent, email: string, name: string) => {
        evt.preventDefault();

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
                <ProfileNav/>

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

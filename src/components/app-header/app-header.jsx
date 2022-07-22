import React from "react";

import styles from './app-header.module.css';

import NavItem from "../nav-item/nav-item";
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";

const AppHeader = () => {
    return (
        <header className={`${styles.header}`}>
            <div className={styles.wrapper}>
                <nav className={`${styles.navigation}`}>
                    <NavItem text='Конструктор'>
                        <BurgerIcon type={'secondary'}/>
                    </NavItem>
                    <NavItem text='Лента заказов'>
                        <ListIcon type={'secondary'}/>
                    </NavItem>
                </nav>

                <div className={styles.logo}>
                    <Link to='/'><Logo/></Link>
                </div>

                <NavItem text='Личный кабинет'>
                    <ProfileIcon type={'secondary'}/>
                </NavItem>
            </div>
        </header>
    )
}

export default AppHeader;

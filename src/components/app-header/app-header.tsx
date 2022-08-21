import React from "react";

import styles from './app-header.module.css';

import NavItem from "../nav-item/nav-item";
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";

const AppHeader: React.FC = () => {
    return (
        <header className={`${styles.header}`}>
            <div className={styles.wrapper}>
                <nav className={`${styles.navigation}`}>
                    {/* @ts-ignore */}
                    <NavItem to='/' text='Конструктор'>
                        <BurgerIcon type={'secondary'}/>
                    </NavItem>
                    {/* @ts-ignore */}
                    <NavItem to='/' text='Лента заказов'>
                        <ListIcon type={'secondary'}/>
                    </NavItem>
                </nav>

                <div className={styles.logo}>
                    <Link to='/'><Logo/></Link>
                </div>

                {/* @ts-ignore */}
                <NavItem text='Личный кабинет' link='/profile'>
                    <ProfileIcon type={'secondary'}/>
                </NavItem>
            </div>
        </header>
    )
}

export default AppHeader;

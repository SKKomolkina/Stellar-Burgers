import styles from './nav-item.module.css';
import {Link} from "react-router-dom";
import React from "react";

interface INavItem {
    children: any;
    text: string;
    link: string;
}

const NavItem: React.FC<INavItem> = ({children, text, link}) => {
    return (
        <div className={styles.wrapper}>
            <Link className={styles.link} to={link ? link : '/'}>
                {children}
                <p className='text text_type_main-default text_color_inactive ml-4'>{text}</p>
            </Link>
        </div>
    )
}

export default NavItem;

import PropTypes from "prop-types";

import styles from './nav-item.module.css';
import {Link} from "react-router-dom";

const NavItem = ({children, text, link}) => {
    return (
        <div className={styles.wrapper}>
            <Link className={styles.link} to={link ? link : '/'}>
                {children}
                <p className='text text_type_main-default text_color_inactive ml-4'>{text}</p>
            </Link>
        </div>
    )
}

NavItem.prototype = {
    children: PropTypes.element.isRequired,
    link: PropTypes.string,
    text: PropTypes.string,
}

export default NavItem;

import styles from './nav-item.module.css';

const NavItem = ({children, text, }) => {
    return (
        <div className={styles.wrapper}>
            <a className={styles.link} href='#'>
                {children}
                <p className='text text_type_main-default text_color_inactive ml-4'>{text}</p>
            </a>
        </div>
    )
}

export default NavItem;

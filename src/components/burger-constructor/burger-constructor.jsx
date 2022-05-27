import PropTypes from "prop-types";

import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './burger-constructor.module.css';

const BurgerConstructor = ({selected, sauce, main, openModal}) => {
    return (
        <section className={`${styles.main} pl-4 pr-4`}>
            <div className={'mt-25 mb-10'}>
                <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${selected.name} (верх)`}
                        price={selected.price}
                        thumbnail={selected.image}
                    />
                    <ul className={styles.list}>
                        {sauce.map((item) => {
                            return (
                                <li key={item.name} className={`${styles.item} mb-4`}>
                                    <ConstructorElement
                                        text={item.name}
                                        price={item.price}
                                        thumbnail={item.image}
                                    />
                                </li>
                            )
                        })}
                        {main.map((item) => {
                            return (
                                <li key={item.name} className={`${styles.item} mb-4`}>
                                    <ConstructorElement
                                        text={item.name}
                                        price={item.price}
                                        thumbnail={item.image}
                                    />
                                </li>
                            )
                        })}
                    </ul>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${selected.name} (низ)`}
                        price={selected.price}
                        thumbnail={selected.image}
                    />
                </div>
            </div>

            <div className={styles.counter}>
                <div className={`${styles.price} mr-10`}>
                    <p className='text text_type_main-medium'>1234</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button onClick={() => openModal(true)} type="primary" size="medium">Оформить заказ</Button>
            </div>
        </section>
    )
}

BurgerConstructor.propTypes = {
    selected: PropTypes.object,
    sauce: PropTypes.array,
    main: PropTypes.array,
    openModal: PropTypes.func,
}

export default BurgerConstructor;

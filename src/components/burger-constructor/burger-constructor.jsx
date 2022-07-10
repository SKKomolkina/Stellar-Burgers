import PropTypes from "prop-types";

import React, {useEffect, useRef, useState} from "react";
import {useDrop} from "react-dnd";
import {useDispatch, useSelector} from "react-redux";
import {v4 as uuidv4} from 'uuid';

import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './burger-constructor.module.css';

import {addBun, addIngredient, resetConstructor} from "../../services/actions/constructor";
import AddedIngredient from "../added-ingredient/added-ingredient";
import {sendItems} from "../../services/actions/order";

const BurgerConstructor = ({openModal}) => {
    const dispatch = useDispatch();
    const {bun, ingredients} = useSelector(store => store.orderConstructor);

    const ref = useRef(null);

    const [disabledButton, setDisabledButton] = useState(true);

    const [{handlerId}, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(item) {
            onDrop(item);
        }
    });

    const sendOrderRequest = () => {
        openModal(true);

        const ingredientsId = ingredients.map(i => i._id);
        const bunId = bun._id;
        const idArr = [...ingredientsId, bunId];

        dispatch(sendItems(idArr))
        dispatch(resetConstructor());
    };

    const onDrop = (item) => {
        const uuid = uuidv4();
        if (item.type !== 'bun') {
            dispatch(addIngredient(item, uuid));
        } else {
            dispatch(addBun(item, uuid));
        }
    }

    const priceCounter = React.useMemo(() => {
        return (
            (bun ? bun.price * 2 : 0) + ingredients.reduce((a, b) => a + b.price, 0)
        )
    }, [bun, ingredients]);

    useEffect(() => {
        if (ingredients.length >= 1 && bun) {
            setDisabledButton(false);
        } else {
            setDisabledButton(true);
        }
    }, [ingredients, bun]);

    return (
        <section className={`${styles.main} pl-4 pr-4`}>
            <div className={'mt-25 mb-10'}>
                <div ref={dropTarget} style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                    {bun ? (
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={`${bun.name} (верх)`}
                                price={bun.price}
                                thumbnail={bun.image}
                            />
                        ) :
                        (
                            <div className={styles.noBunsTop}>
                                <p className={'text text_type_main-default'}>Выберите булку</p>
                            </div>
                        )
                    }

                    <ul className={styles.list}>
                        {!ingredients.length &&
                            (<li className={`${styles.item} mb-4`}>
                                <div className={styles.noIngredient}>
                                    <p className={'text text_type_main-default'}>Добавьте ингредиент</p>
                                </div>
                            </li>)}
                        {ingredients.length ?
                            (ingredients.map((item, index) =>
                                <AddedIngredient key={item.uuid} item={item} index={index}/>
                            )) : null}
                    </ul>

                    {bun ? (
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={`${bun.name} (низ)`}
                                price={bun.price}
                                thumbnail={bun.image}
                            />
                        ) :
                        (
                            <div className={styles.noBunsBottom}>
                                <p className={'text text_type_main-default'}>Выберите булку</p>
                            </div>
                        )
                    }
                </div>
            </div>

            <div className={styles.counter}>
                <div className={`${styles.price} mr-10`}>
                    <p className='text text_type_main-medium'>
                        {priceCounter}
                    </p>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button disabled={disabledButton} onClick={sendOrderRequest} type="primary" size="medium">Оформить
                    заказ</Button>
            </div>
        </section>
    )
}

BurgerConstructor.propTypes = {
    openModal: PropTypes.func.isRequired,
}

export default BurgerConstructor;

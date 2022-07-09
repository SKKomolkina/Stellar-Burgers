import PropTypes from "prop-types";

import React, {useRef, useState} from "react";
import {useDrop} from "react-dnd";
import {useDispatch, useSelector} from "react-redux";
import {v4 as uuidv4} from 'uuid';

import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './burger-constructor.module.css';

import {addBun, addIngredient} from "../../services/actions/constructor";
import AddedIngredient from "../added-ingredient/added-ingredient";

const BurgerConstructor = ({openModal}) => {
    const dispatch = useDispatch();
    const {bun, ingredients} = useSelector(store => store.orderConstructor);

    const ref = useRef(null);

    const [{handlerId}, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(item) {
            onDrop(item);
        }
    })

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
                        {ingredients.length === 0 &&
                            (<li className={`${styles.item} mb-4`}>
                                <div className={styles.noIngredient}>
                                    <p className={'text text_type_main-default'}>Добавьте ингредиент</p>
                                </div>
                            </li>)}
                        {ingredients.length > 0 &&
                            (ingredients.map((item, index) =>
                                <AddedIngredient key={item.uuid} item={item} index={index}/>
                            ))}
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
                        {(bun === null || ingredients.length < 1) ? 0 : priceCounter}
                    </p>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button onClick={() => openModal(true)} type="primary" size="medium">Оформить заказ</Button>
            </div>
        </section>
    )
}

BurgerConstructor.propTypes = {
    openModal: PropTypes.func.isRequired,
}

export default BurgerConstructor;

import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import {useDrop} from "react-dnd";
import {useDispatch, useSelector} from "../../services/hooks";
import {v4 as uuidv4} from 'uuid';

import {ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Button} from "../button-ui";
import styles from './burger-constructor.module.css';

import {addBun, addIngredient, removeIngredient, resetConstructor} from "../../services/actions/constructor";
import AddedIngredient from "../added-ingredient/added-ingredient";
import {sendItems} from "../../services/actions/order";
import {useHistory} from "react-router-dom";
import {IIngredient} from "../../utils/interface/interface";
import {getCookie} from "../../utils/utils";

interface IBurgerConstructorProps {
    openModal: Dispatch<SetStateAction<boolean>>;
}

const BurgerConstructor: React.FC<IBurgerConstructorProps> = ({openModal}): JSX.Element => {
    const dispatch = useDispatch();
    const history = useHistory();

    const {bun, ingredients} = useSelector((state: any) => state.orderConstructor);
    const {authSuccess} = useSelector((state) => ({authSuccess: state.user.authSuccess}));

    const ref = useRef(null);

    const [disabledButton, setDisabledButton] = useState(true);

    const [, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(item: IIngredient) {
            onDrop(item);
        }
    });

    const sendOrderRequest = () => {
        if (authSuccess) {
            const ingredientsId = ingredients.map((i: IIngredient) => i._id);
            const bunId = bun._id;
            const idArr = [...ingredientsId, bunId];

            dispatch(sendItems(idArr, openModal));
        } else {
            history.push('/sign-in');
        }
    };

    const onDrop = (item: IIngredient) => {
        const uuid = uuidv4();
        if (item.type !== 'bun') {
            dispatch(addIngredient(item, uuid));
        } else {
            dispatch(addBun(item, uuid));
        }
    }

    const priceCounter = React.useMemo(() => {
        return (
            (bun ? bun.price * 2 : 0) + ingredients.reduce((a: number, b: IIngredient) => a + b.price, 0)
        )
    }, [ingredients, bun]);

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
                    {bun._id ? (
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={`${bun.name} (верх)`}
                                price={bun.price}
                                thumbnail={bun.image}
                            />
                        ) : (
                            <div className={styles.noBunsTop}>
                                <p className={'text text_type_main-default'}>Выберите булку</p>
                            </div>
                        )
                    }

                    <ul className={styles.list}>
                        {!ingredients.length ?
                            (<li className={`${styles.item} mb-4`}>
                                <div className={styles.noIngredient}>
                                    <p className={'text text_type_main-default'}>Добавьте ингредиент</p>
                                </div>
                            </li>) :
                            (ingredients.map((item: IIngredient, index: number) =>
                                <AddedIngredient key={item.uuid} item={item} index={index}/>
                            ))}
                    </ul>

                    {bun._id ? (
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

            {
                (ingredients.length > 0 && bun._id) &&

                <div className={styles.counter}>
                    <div className={`${styles.price} mr-10`}>
                        <p className='text text_type_main-medium'>
                            {priceCounter}
                        </p>
                        <CurrencyIcon type="primary"/>
                    </div>
                    <Button disabled={disabledButton} onClick={sendOrderRequest} type="primary" size="medium">
                        Оформить заказ
                    </Button>
                </div>
            }
        </section>
    )
}

export default BurgerConstructor;

import styles from './feed-page.module.css';
import React, {FC, useEffect} from "react";
import {useLocation, useParams, useRouteMatch} from "react-router-dom";
import {useDispatch, useSelector} from "../../services/hooks";
import {IIngredient, IOrder} from "../../utils/interface/interface";
import {number} from "prop-types";
import {getDate, getDetails, getPrice} from "../../utils/functions";
import {wsConnectionStartAction, wsConnectionStopAction} from "../../services/actions/ws";
import {getCookie} from "../../utils/utils";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {wsAll, wsOrders} from "../../utils/urls";

const FeedPageDetails:FC = () => {
    const dispatch = useDispatch();

    const feed = useSelector(state => state.feed.feed);
    const {ingredients} = useSelector(state => state.ingredients);

    const location = useLocation<any>();
    const {id} = useParams<{id: string}>();

    const profilePage = useRouteMatch<any>('/profile');
    const feedPage = useRouteMatch<any>('/feed');

    const getOrder = feed.map(i => {
        i.details = getDetails(ingredients, i.ingredients);
        return i;
    })

    const selected = getOrder.find(selected => selected._id === id);

    const getStatus = (status: 'created' | 'pending' | 'done'): JSX.Element => {
        switch (status) {
            case 'created':
                return (<p className='text text_type_digits-default mb-6'>Оформлен</p>);
            case 'pending':
                return (<p className='text text_type_digits-default mb-6'>Готовится</p>);
            case "done":
                return (<p className={`text text_type_digits-default mb-6 ${styles.done}`}>Готов</p>);
            default:
                return (<p className='text text_type_digits-default mb-6'>Нет данных</p>);
        }
    }

    useEffect(() => {
        const back = location.state && location.state.background;
        const token = getCookie('accessToken');

        !back && feedPage && dispatch(wsConnectionStartAction(`${wsAll}`));

        // @ts-ignore
        !back && profilePage && dispatch(wsConnectionStartAction(`${wsOrders.url}?token=${token.split(' ')[1]}`));

        return () => {
            back && dispatch(wsConnectionStopAction());
        }
    }, [dispatch])

    return selected ? (
        <section className={styles.details}>
            <p className='text text_type_digits-default'>{`#${selected.number}`}</p>
            <h4 className='text text_type_main-medium'>{selected.name}</h4>
            {selected.status && getStatus(selected.status)}

            <p className='text text_type_digits-default'>Состав:</p>
            {selected.details && selected.details.map(i => (
                <div className={styles.item} key={i._id}>
                    <img className={styles.itemImage} src={i.image_mobile} alt={i.name}/>
                    <p className='text_type_main-default'>{i.name}</p>

                    <div className={styles.price}>
                        <p className='text text_type_digits-default'>{i.count} x </p>
                        <p className='text text_type_digits-default'> {i.price}</p>
                    </div>
                </div>
            ))}

            <div className={styles.value}>
                <p className='text text_type_main-default text_color_inactive'>{getDate(selected.createdAt)}</p>
                <div>
                    <CurrencyIcon type="primary" />
                    <p className='text text_type_digits-default'>{selected.details && getPrice(selected.details)}</p>
                </div>
            </div>
        </section>
    ) : null
}

export default FeedPageDetails;

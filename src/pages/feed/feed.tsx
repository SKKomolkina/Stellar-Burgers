import styles from './feed.module.css';
import {useDispatch, useSelector} from "../../services/hooks";
import React, {useEffect} from "react";
import {wsConnectionStartAction, wsConnectionStopAction} from "../../services/actions/ws";
import FeedItem from "../../components/feed-item/feed-item";
import {IIngredient, IOrder} from "../../utils/interface/interface";
import FeedItemInfo from "../../components/feed-item/feed-item-info";
import {number} from "prop-types";
import {useLocation} from "react-router-dom";
import {getDetails} from "../../utils/functions";

const Feed: React.FC = () => {
    const location = useLocation<any>();
    const dispatch = useDispatch();

    const {feed, total, totalToday, wsConnect} = useSelector(state => state.feed);
    const {ingredients} = useSelector(state => state.ingredients)

    const getOrder = feed.map(i => {
        // console.log(ingredients)
        i.details = getDetails(ingredients, i.ingredients);
        return i;
    });

    const getOrdersNum = (items: IOrder[]): number[] => {
        return items.map(item => item.number);
    }

    const getDoneNum = getOrdersNum(feed.filter(i => i.status === 'done'));
    const getPendingNum = getOrdersNum(feed.filter(i => i.status === 'pending'));

    useEffect(() => {
        dispatch(wsConnectionStartAction('wss://norma.nomoreparties.space/orders/all'));

        return () => {
            dispatch(wsConnectionStopAction())
        };
    }, [dispatch]);

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h1 className={`${styles.title} text text_type_main-medium`}>
                    Лента заказов
                </h1>

                <ul className={styles.itemsContainer}>
                    { wsConnect &&
                        getOrder.map((item: any) =>
                            <FeedItem key={item._id} path='feed' background={location} item={item}/>
                        )
                    }
                </ul>

                <FeedItemInfo done={getDoneNum} pending={getPendingNum} total={total} totalToday={totalToday}/>
            </div>
        </main>
    )
}

export default Feed;

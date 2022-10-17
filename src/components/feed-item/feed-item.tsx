import styles from './feed-item.module.css';
import React from "react";
import {Link} from "react-router-dom";
import {IIngredient, IOrder} from "../../utils/interface/interface";
import FeedItemImages from "./feed-item-images";
import {getDate} from "../../utils/functions";


const FeedItem: React.FC<{ item: IOrder, path: 'feed' | 'profile/orders', background: any }> =
    ({item, path, background}): JSX.Element => {

        const getStatus = (status: 'created' | 'pending' | 'done'): JSX.Element => {
            switch (status) {
                case 'created':
                    return (<p className={`text text_type_main-default mb-2`}>Создан</p>);
                case 'pending':
                    return (<p className='text text_type_main-default mb-2'>Готовится</p>);
                case "done":
                    return (<p style={{color: 'aquamarine'}} className={`text text_type_main-default mb-2`}>Выполнен</p>);
                default:
                    return (<p className='text text_type_main-default mb-2'>Нет данных</p>);
            }
        }

        let count = item.details && item.details.length - 6;
        if (count && count < 1) count = undefined;

        const overlay = Boolean(count);
        // console.log(item);

        return (
            <Link className={styles.link} to={{pathname: `/${path}/${item._id}`, state: background}}>
                <li key={item._id} className={styles.item}>
                    <div className={styles.info}>
                        <p className='text text_type_digits-default'>{`#${item.number}`}</p>
                        <p className='text text_type_main-default text_color_inactive'>{getDate(item.createdAt)}</p>
                    </div>

                    <h3 className='text text_type_main-medium'>{item.name}</h3>

                    {getStatus(item.status)}

                    <div className={styles.imagesContainer}>
                        {item.details && item.details.slice(0, 6).map((i: any, index: number) => {
                            if (overlay && index === 0) {
                                return (
                                    <FeedItemImages key={index} image={i.image_mobile} name={i.name} count={count}/>
                                )
                            } else {
                                return (
                                    <FeedItemImages key={index} image={i.image_mobile} name={i.name}/>
                                )
                            }
                        })}
                    </div>
                </li>
            </Link>
        )
    }

export default FeedItem;

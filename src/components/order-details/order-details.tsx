import styles from './order-details.module.css';
import done from "../../images/done.svg";

import {useSelector} from "react-redux";

const OrderDetails = () => {
    const {orderNumber, orderName} = useSelector((state: any) => ({
        ...state,
        orderName: state.order.order.name,
        orderNumber: state.order.order.order.number,
    }))

    return (
        <div className={`${styles.info} pb-30 pt-30`}>
            <h2 className={`${styles.title} text text_type_digits-large`}>{orderNumber}</h2>
            <p className='text text_type_main-default mt-8'>идентификатор заказа</p>
            <img className='mt-15 mb-15' src={done} alt=''/>
            <p className='text text_type_main-small mb-2'>Ваш
                <span className={styles.span}> {orderName} </span>
                начали готовить
            </p>
            <p className='text text_type_main-small text_color_inactive'>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

export default OrderDetails;

import styles from './feed-item.module.css';
import {FC} from "react";

const FeedItemInfo: FC<{ done: number[], pending: number[], total: number, totalToday: number }> =
    ({done, pending, totalToday, total}) => {
    return (
        <div className={styles.infoContainer}>
            <div className={styles.inWork}>
                <div className={styles.inWorkTable}>
                    <h4 className={`${styles.inWorkTitle} text text_type_main-medium`}>Готовы:</h4>
                    <ul className={styles.inWorkText}>
                        {done.map((num, index) =>
                            <li key={index}><p className={`text text_type_digits-default ${styles.colorText}`}>{num}</p></li>
                        )}
                    </ul>
                </div>

                <div className={styles.inWorkTable}>
                    <h4 className={`${styles.inWorkTitle} text text_type_main-medium`}>В работе:</h4>

                    <ul className={styles.inWorkText}>
                        {pending.map((num, index) =>
                            <li key={index}><p className='text text_type_digits-default'>{num}</p></li>
                        )}
                    </ul>
                </div>
            </div>

            <div className={styles.infoTotal}>
                <h4 className={`${styles.inWorkTitle} text text_type_main-medium`}>Выполнено за все время:</h4>
                <p className='text text_type_digits-large'>{total}</p>
            </div>

            <div className={styles.infoTotal}>
                <h4 className={`${styles.inWorkTitle} text text_type_main-medium`}>Выполнено за сегодня:</h4>
                <p className='text text_type_digits-large'>{totalToday}</p>
            </div>
        </div>
    )
}

export default FeedItemInfo;

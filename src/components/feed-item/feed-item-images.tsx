import styles from './feed-item.module.css';
import {FC} from "react";

const FeedItemImages: FC<{image: string, name: string, count?: number}> = ({image, count, name}) => {
    // console.log(count);
    return (
        <div className={styles.imageContainer}>
            <div className={count ? styles.overlayOff : styles.overlayOn}>
                {count && <span className={`text text_type-default ${styles.span}`}>
                    {`+${count}`}
                </span>}
                <img className={styles.image} alt={name} src={image}/>
            </div>
        </div>
    )
}

export default FeedItemImages;

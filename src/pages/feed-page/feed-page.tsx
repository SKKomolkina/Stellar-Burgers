import styles from './feed-page.module.css';
import {useParams} from "react-router-dom";
import {FC} from "react";
import FeedPageDetails from "./feed-page-details";

const FeedPage: FC = () => {
    const {id} = useParams<{ id: string }>();

    return (
        <div className={styles.main}>
            <FeedPageDetails/>
        </div>
    )
}

export default FeedPage;

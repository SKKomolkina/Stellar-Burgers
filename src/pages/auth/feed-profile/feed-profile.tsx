import styles from './feed-profile.module.css';
import {Dispatch, FC, SetStateAction, useEffect} from "react";
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "../../../services/hooks";
import {IOrder} from "../../../utils/interface/interface";
import feed from "../../feed/feed";
import {getDetails} from "../../../utils/functions";
import FeedItem from "../../../components/feed-item/feed-item";
import ProfileNav from "../../../components/profile-nav/profile-nav";
import {wsConnectionStartAction, wsConnectionStopAction} from "../../../services/actions/ws";
import {getCookie} from "../../../utils/utils";
import {wsOrders} from "../../../utils/urls";

interface IFeedProfileProps {
    openFeedModal: Dispatch<SetStateAction<boolean>>;
}

const FeedProfile: FC<IFeedProfileProps> = ({openFeedModal}) => {
    const location = useLocation<any>();
    const dispatch = useDispatch();

    const {feed, wsConnect} = useSelector(state => state.feed);
    const {ingredients} = useSelector(state => state.ingredients);

    const feedArr: IOrder[] = feed.map(item => {
        item.details = getDetails(ingredients, item.ingredients);
        return item;
    });

    useEffect(() => {
        const token = getCookie('accessToken');
        // @ts-ignore
        dispatch(wsConnectionStartAction(`${wsOrders.url}?token=${token.split(' ')[1]}`));

        return () => {
            dispatch(wsConnectionStopAction());
        }
    }, [dispatch])

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <ProfileNav/>
                {feed ? (
                    <ul className={styles.feed}>
                        {feedArr.map(i => <FeedItem openModal={openFeedModal} item={i} path='profile/orders' key={i._id} background={location}/>)}
                    </ul>
                ) : null}
            </div>
        </div>
    )
}

export default FeedProfile;

import styles from "./ingredient-item.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import {useDispatch} from "react-redux";
import {useDrag} from "react-dnd";
import {getSelectedItem} from "../../services/actions/ingredients";
import {Link, useLocation} from "react-router-dom";

const IngredientItem = ({item, openModal, count}) => {
    const dispatch = useDispatch();
    const location = useLocation();
    // const { ingredients, bun } = useSelector(store => store.orderConstructor)

    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: item,
    })

    const id = item['_id'];

    return (
        <Link key={item._id}
              onClick={() => {
                  dispatch(getSelectedItem(item));
                  openModal(true);
              }}
              ref={dragRef} className={styles.link}
              to={{
                  pathname: `/ingredients/${id}`,
                  state: {background: location}
              }}
        >
            <li key={item._id} className={`${styles.item} mb-8`}>
                {!count ? null : (
                    <Counter count={count} size='small'/>
                )}

                <img src={item.image} alt={item.name}/>
                <div className={styles.price}>
                    <p className='text text_type_digits-default mt-2 mb-2 mr-2'>{item.price}</p>
                    <CurrencyIcon type={"secondary"}/>
                </div>
                <p className={`${styles.name} text text_type_main-default`}>{item.name}</p>
            </li>
        </Link>
    )
}

export default IngredientItem;

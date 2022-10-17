import styles from "./ingredient-item.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import {useDispatch, useSelector} from "../../services/hooks";
import {useDrag} from "react-dnd";
import {getSelectedItem} from "../../services/actions/ingredients";
import {Link, useLocation} from "react-router-dom";
import React, {Dispatch, SetStateAction, useMemo} from "react";
import {IIngredient} from "../../utils/interface/interface";

interface IIngredientItem {
    item: IIngredient;
    openModal: Dispatch<SetStateAction<boolean>>;
}

const IngredientItem: React.FC<IIngredientItem> = ({item, openModal}) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const burgerConstructor = useSelector((state: any) => state.orderConstructor);
    // const { ingredients, bun } = useSelector(store => store.orderConstructor)

    const ingredientsCounter = useMemo(() => {
        const {bun, ingredients} = burgerConstructor;
        let counter = 0;

        if (item.type !== 'bun') {
            ingredients.map((el: IIngredient) => {
                if (el._id === item._id) {
                    counter++;
                }
            });
        } else {
            if (bun._id === item._id) {
                return (counter += 2)
            }
        }

        return counter;
    }, [burgerConstructor]);

    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: item,
    })

    const id = item['_id'];

    return (
        <Link key={item._id}
              onClick={() => {
                  dispatch(getSelectedItem(item));
                  // @ts-ignore
                  openModal(true);
              }}
              ref={dragRef} className={styles.link}
              to={{
                  pathname: `/ingredients/${id}`,
                  state: {background: location}
              }}
        >
            <li key={item._id} className={`${styles.item} mb-8`}>
                {ingredientsCounter > 0 && (
                    <Counter count={ingredientsCounter} size='small'/>
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

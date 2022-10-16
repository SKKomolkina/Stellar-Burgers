import React, {Dispatch, SetStateAction, useMemo} from "react";

import styles from './ingredients-list.module.css';

import IngredientItem from "../ingredient-item/ingredient-item";
import {IIngredient} from "../../utils/interface/interface";

interface IIngredientsList {
    title: string;
    ingredientsList: IIngredient[];
    openModal: Dispatch<SetStateAction<boolean>>;
    ref: any;
}

const IngredientsList = React.forwardRef<HTMLUListElement, IIngredientsList>(({title, ingredientsList, openModal}, ref) => {

    return (
        <div className={`${styles.wrapper} mt-10`}>
            <h2 className='text text_type_main-medium'>{title}</h2>
            <ul className={`${styles.list} mt-6 mb-10`} ref={ref}>
                {ingredientsList.map((item) => {
                    return (
                        <IngredientItem
                            // count={ingredientsCounter[item._id]}
                            openModal={openModal}
                            key={item._id}
                            item={item}
                        />
                    )
                })}
            </ul>
        </div>
    )
});

export default IngredientsList;

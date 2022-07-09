import React, {useMemo} from "react";
import PropTypes from "prop-types";

import styles from './ingredients-list.module.css';

import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {addIngredient} from "../../services/actions/ingredients";
import {useDrag} from "react-dnd";

import IngredientItem from "../ingredient-item/ingredient-item";

const IngredientsList = React.forwardRef(({title, ingredientsList, openModal}, ref) => {
    const burgerConstructor = useSelector(state => state.orderConstructor);

    const ingredientsCounter = useMemo(() => {
        const {bun, ingredients} = burgerConstructor;
        const counter = {};

        ingredients.forEach((item) => {
            if (!counter[item._id]) counter[item._id] = 0;
            counter[item._id]++;
        });

        if (bun) counter[bun._id] = 2;
        return counter;
    }, [burgerConstructor]);

    return (
        <div className={`${styles.wrapper} mt-10`}>
            <h2 className='text text_type_main-medium'>{title}</h2>
            <ul className={`${styles.list} mt-6 mb-10`} ref={ref}>
                {ingredientsList.map((item) => {
                    return (
                        <IngredientItem
                            count={ingredientsCounter[item._id]}
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

IngredientsList.propTypes = {
    title: PropTypes.string,
    ingredientsList: PropTypes.array.isRequired,
    openModal: PropTypes.func.isRequired,
}

export default IngredientsList;

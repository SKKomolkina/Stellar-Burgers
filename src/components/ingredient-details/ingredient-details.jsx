import PropTypes from "prop-types";

import styles from './ingredient-details.module.css';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import {getItems} from "../../services/actions/ingredients";

const IngredientDetails = () => {
    const [ingredient, setIngredient] = useState({});

    const dispatch = useDispatch();
    const {ingredients} = useSelector(state => ({ingredients: state.ingredients.items}));
    const {id} = useParams();

    // const selected = useMemo(() => {
    //     return ingredients.find((i) => i._id === ingredientId);
    // }, [ingredientId, ingredients]);

    useEffect(() => {
        if(!id || ingredients.ingredients < 1) return;
        const selected = ingredients.find(i => i._id === id);
        selected && setIngredient(selected);
    }, [id, ingredients]);

    return (
        <div className={`${styles.order} pl-10 pr-10 pt-15 pb-15`}>
            <h2 className={`${styles.title} text text_type_main-large`}>Детали ингредиента</h2>
            <img src={ingredient.image} alt={ingredient.name} />
            <p className='text text_type_main-medium mt-4 mb-8'>{ingredient.name}</p>

            <ul className={styles.description}>
                <li className={styles.item}>
                    <p className='text text_type_main-default text_color_inactive'>Калории,ккал</p>
                    <p className='text text_type_main-default text_color_inactive'>{ingredient.calories}</p>
                </li>
                <li className={styles.item}>
                    <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
                    <p className='text text_type_main-default text_color_inactive'>{ingredient.proteins}</p>
                </li>
                <li className={styles.item}>
                    <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
                    <p className='text text_type_main-default text_color_inactive'>{ingredient.fat}</p>
                </li>
                <li className={styles.item}>
                    <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
                    <p className='text text_type_main-default text_color_inactive'>{ingredient.carbohydrates}</p>
                </li>
            </ul>
        </div>
    )
}

IngredientDetails.propTypes = {
}

export default IngredientDetails;

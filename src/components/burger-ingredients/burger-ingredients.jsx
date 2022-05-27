import React from "react";
import PropTypes from "prop-types";

import styles from './burger-ingredients.module.css';

import MainTab from "../main-tab/main-tab";
import IngredientsList from "../ingredients-list/ingredients-list";

const BurgerIngredients = ({bun, main, sauce, setSelected, openModal}) => {
    return (
        <section className={styles.main}>
            <h1 className='text text_type_main-large mb-10'>Соберите бургер</h1>
            <MainTab/>
            <ul className={styles.list}>
                <li><IngredientsList openModal={openModal} setSelected={setSelected} ingredientsList={bun} title='Булки'/></li>
                <li><IngredientsList openModal={openModal} setSelected={setSelected} ingredientsList={sauce} title='Соусы'/></li>
                <li><IngredientsList openModal={openModal} setSelected={setSelected} ingredientsList={main} title='Начинки'/></li>
            </ul>
        </section>
    )
}

BurgerIngredients.propTypes = {
    bun: PropTypes.array,
    main: PropTypes.array,
    sauce: PropTypes.array,
    setSelected: PropTypes.func,
    openModal: PropTypes.func,
}

export default BurgerIngredients;

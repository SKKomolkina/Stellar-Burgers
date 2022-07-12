import PropTypes from "prop-types";
import React, {useState} from "react";
import {useInView} from "react-intersection-observer";
import {useSelector} from "react-redux";

import styles from './burger-ingredients.module.css';

import MainTab from "../main-tab/main-tab";
import IngredientsList from "../ingredients-list/ingredients-list";

const BurgerIngredients = ({openModal}) => {
    const {ingredients} = useSelector(state => ({
        ingredients: state.ingredients.items,
    }));

    const [bun, setBun] = React.useState([]);
    const [main, setMain] = React.useState([]);
    const [sauce, setSauce] = React.useState([]);

    const [currentTab, setCurrentTab] = useState('buns');

    const [bunsRef, inViewBuns] = useInView({
        threshold: 0,
    });
    const [mainsRef, inViewMains] = useInView({
        threshold: 0,
    });
    const [saucesRef, inViewSauces] = useInView({
        threshold: 0,
    });

    const filterIngredients = (arr, itemType) => {
        return arr.filter(item => item.type === itemType);
    }

    React.useEffect(() => {
        if (inViewBuns) {
            setCurrentTab('buns');
        } else if (inViewSauces) {
            setCurrentTab('sauces');
        } else if (inViewMains) {
            setCurrentTab('mains');
        }
    }, [inViewSauces, inViewBuns, inViewMains]);

    React.useEffect(() => {
        setCurrentTab('buns');
    }, []);

    React.useEffect(() => {
        setMain(filterIngredients(ingredients, 'main'));
        setBun(filterIngredients(ingredients, 'bun'));
        setSauce(filterIngredients(ingredients, 'sauce'));
    }, [ingredients]);

    return (
        <section className={styles.main}>
            <h1 className='text text_type_main-large mb-10'>Соберите бургер</h1>
            <MainTab currentTab={currentTab} setCurrentTab={setCurrentTab}/>

            <ul className={styles.list}>
                <li className={styles.listItem}>
                    <IngredientsList
                        ref={bunsRef}
                        openModal={openModal}
                        ingredientsList={bun}
                        title='Булки'
                    />
                </li>
                <li className={styles.listItem}>
                    <IngredientsList
                        ref={saucesRef}
                        openModal={openModal}
                        ingredientsList={sauce}
                        title='Соусы'
                    />
                </li>
                <li className={styles.listItem}>
                    <IngredientsList
                        ref={mainsRef}
                        openModal={openModal}
                        ingredientsList={main}
                        title='Начинки'
                    />
                </li>
            </ul>

        </section>
    )
}

BurgerIngredients.propTypes = {
    openModal: PropTypes.func.isRequired,
}

export default BurgerIngredients;

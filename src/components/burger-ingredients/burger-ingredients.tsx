import React, {Dispatch, SetStateAction, useRef, useState} from "react";
import {useInView} from "react-intersection-observer";
import {useSelector} from "react-redux";

import styles from './burger-ingredients.module.css';

import MainTab from "../main-tab/main-tab";
import IngredientsList from "../ingredients-list/ingredients-list";
import {IIngredient} from "../../interface/interface";

interface IBurgerIngredientsProps {
    openModal: Dispatch<SetStateAction<boolean>>;
}

const BurgerIngredients: React.FC<IBurgerIngredientsProps> = ({openModal}) => {
    const {ingredients} = useSelector((state: any) => ({
        ingredients: state.ingredients.items,
    }));

    const sectionRef = useRef(null);

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

    const filterIngredients = (arr: [], itemType: string) => {
        return arr.filter((item: IIngredient) => item.type === itemType);
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
            <MainTab currentTab={currentTab} />

            <ul className={styles.list} ref={sectionRef}>
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

export default BurgerIngredients;

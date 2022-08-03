import styles from './ingredient-page.module.css';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState, useMemo} from "react";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {getItems} from "../../services/actions/ingredients";

const IngredientPage = () => {
    const [ingredient, setIngredient] = useState({});

    const {id} = useParams();
    const dispatch = useDispatch();
    const {ingredients} = useSelector(state => ({ingredients: state.ingredients.items}));

    // useEffect(() => {
    //     dispatch(getItems());
    // }, [dispatch]);

    useEffect(() => {
        if(!id || ingredients.ingredients < 1) return;
        const selected = ingredients.find(i => i._id === id);
        selected && setIngredient(selected);
    }, [id, ingredients]);

    // console.log(ingredientId)
    //
    // const view = useMemo(() => {
    //     let details = false;
    //
    //     if (ingredients) {
    //         ingredients.forEach((i) => {
    //             if (i._id === id) {
    //                 details = true;
    //             }
    //         })
    //     }
    //
    //     return details;
    // }, [id, ingredients]);

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                {/*{view && <IngredientDetails/>}*/}
                <IngredientDetails />
            </div>
        </main>
    )
}

export default IngredientPage;

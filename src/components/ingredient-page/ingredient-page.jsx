import styles from './ingredient-page.module.css';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useMemo} from "react";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {getItems} from "../../services/actions/ingredients";

const IngredientPage = () => {
    const {ingredientId} = useParams();
    const dispatch = useDispatch();
    const {ingredients} = useSelector(state => ({ingredients: state.ingredients.items}));

    useEffect(() => {
        dispatch(getItems());
    }, [dispatch]);

    // console.log(ingredientId)
    //
    // const view = useMemo(() => {
    //     let details = false;
    //
    //     if (ingredients) {
    //         ingredients.forEach((i) => {
    //             if (i._id === ingredientId) {
    //                 details = true;
    //             }
    //         })
    //     }
    //
    //     return details;
    // }, [ingredientId, ingredients]);

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

import styles from './ingredient-page.module.css';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useMemo} from "react";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {getItems} from "../../services/actions/ingredients";

const IngredientPage = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const {ingredients} = useSelector(state => ({ingredients: state.ingredients.items}));

    useEffect(() => {
        dispatch(getItems());
    }, [dispatch]);

    const view = useMemo(() => {
        let details = false;

        if (ingredients) {
            ingredients.forEach((i) => {
                if (i._id === id) {
                    details = true;
                }
            })
        }

        return details;
    }, [id, ingredients]);

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                {view && <IngredientDetails/>}
            </div>
        </main>
    )
}

export default IngredientPage;

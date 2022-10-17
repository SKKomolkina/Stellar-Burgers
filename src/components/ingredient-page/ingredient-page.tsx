import styles from './ingredient-page.module.css';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "../../services/hooks";
import {useEffect, useState, useMemo} from "react";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {getItems} from "../../services/actions/ingredients";
import {IIngredient} from "../../utils/interface/interface";

const IngredientPage = () => {
    const [ingredient, setIngredient] = useState<IIngredient>({
        _id: "",
        calories: 0,
        carbohydrates: 0,
        fat: 0,
        image: "",
        image_large: "",
        image_mobile: "",
        name: "",
        price: 0,
        proteins: 0,
        type: "",
        uuid: ''
    });

    const {id} = useParams<any>();
    const dispatch = useDispatch();
    const {ingredients} = useSelector((state: any) => ({ingredients: state.ingredients.ingredients}));

    // useEffect(() => {
    //     dispatch(getItems());
    // }, [dispatch]);

    useEffect(() => {
        if(!id || ingredients.ingredients < 1) return;
        const selected = ingredients.find((i: IIngredient) => i._id === id);
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

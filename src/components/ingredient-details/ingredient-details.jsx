import PropTypes from "prop-types";

import styles from './ingredient-details.module.css';

const IngredientDetails = ({selected}) => {
    return (
        <div className={`${styles.order} pl-10 pr-10 pt-15 pb-15`}>
            <h2 className={`${styles.title} text text_type_main-large`}>Детали ингредиента</h2>
            <img src={selected.image_large} alt={selected.name} />
            <p className='text text_type_main-medium mt-4 mb-8'>{selected.name}</p>

            <ul className={styles.description}>
                <li className={styles.item}>
                    <p className='text text_type_main-default text_color_inactive'>Калории,ккал</p>
                    <p className='text text_type_main-default text_color_inactive'>{selected.calories}</p>
                </li>
                <li className={styles.item}>
                    <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
                    <p className='text text_type_main-default text_color_inactive'>{selected.proteins}</p>
                </li>
                <li className={styles.item}>
                    <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
                    <p className='text text_type_main-default text_color_inactive'>{selected.fat}</p>
                </li>
                <li className={styles.item}>
                    <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
                    <p className='text text_type_main-default text_color_inactive'>{selected.carbohydrates}</p>
                </li>
            </ul>
        </div>
    )
}

IngredientDetails.propTypes = {
    selected: PropTypes.object.isRequired,
}

export default IngredientDetails;

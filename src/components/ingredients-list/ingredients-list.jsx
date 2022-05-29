import PropTypes from "prop-types";

import styles from './ingredients-list.module.css';

import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientsList = ({title, ingredientsList, setSelected, openModal}) => {
    return (
        <div className={`${styles.wrapper} mt-10`}>
            <h2 className='text text_type_main-medium'>{title}</h2>
            <ul className={`${styles.list} mt-6 mb-10`}>
                {ingredientsList.map((item) => {
                    return (
                        <li
                            onClick={() => {
                                setSelected(item);
                                openModal(true);
                            }}
                            key={item._id} className={`${styles.item} mb-8`}>
                            <img src={item.image} alt={item.name}/>
                            <div className={styles.price}>
                                <p className='text text_type_digits-default mt-2 mb-2 mr-2'>{item.price}</p>
                                <CurrencyIcon type={"secondary"}/>
                            </div>
                            <p className={`${styles.name} text text_type_main-default`}>{item.name}</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

IngredientsList.propTypes = {
    title: PropTypes.string,
    ingredientsList: PropTypes.array.isRequired,
    setSelected: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
}

export default IngredientsList;

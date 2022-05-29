import React from "react";
import {getIngredients} from "../../utils/api";

import styles from './app.module.css';

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";

function App() {
    const [openOrder, setOpenOrder] = React.useState(false);
    const [openInfo, setOpenInfo] = React.useState(false);

    const [ingredients, setIngredients] = React.useState([]);
    const [selected, setSelected] = React.useState({});

    const [bun, setBun] = React.useState([]);
    const [main, setMain] = React.useState([]);
    const [sauce, setSauce] = React.useState([]);

    const filterIngredients = (arr, itemType) => {
        return arr.filter(item => item.type === itemType);
    }

    const closeAllModals = () => {
        setOpenInfo(false);
        setOpenOrder(false);
    }

    React.useEffect(() => {
        setMain(filterIngredients(ingredients, 'main'));
        setBun(filterIngredients(ingredients, 'bun'));
        setSauce(filterIngredients(ingredients, 'sauce'));
    }, [ingredients]);

    React.useEffect(() => {
        getIngredients()
            .then(ingredients => {
                setIngredients(ingredients);
                setSelected(ingredients[0])
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <div className={styles.app}>
            <AppHeader/>
            <main className={styles.main}>
                <BurgerIngredients openModal={setOpenInfo} setSelected={setSelected} bun={bun} sauce={sauce}
                                   main={main}/>
                <BurgerConstructor openModal={setOpenOrder} selected={selected} sauce={sauce} main={main}/>
            </main>

            {openOrder ?
                (<Modal setIsOpen={setOpenOrder} isOpen={openOrder} close={closeAllModals}>
                    <OrderDetails/>
                </Modal>)
                : null}

            {openInfo ?
                (<Modal setIsOpen={setOpenInfo} isOpen={openInfo} close={closeAllModals}>
                    <IngredientDetails selected={selected}/>
                </Modal>)
                : null}
        </div>
    );
}

export default App;

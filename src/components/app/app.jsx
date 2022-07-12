import React from "react";
import {HTML5Backend} from 'react-dnd-html5-backend';
import {DndProvider} from 'react-dnd';
import {getItems} from "../../services/actions/ingredients";
import {useDispatch} from "react-redux";

import styles from './app.module.css';

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";


function App() {
    const dispatch = useDispatch();

    const [openOrder, setOpenOrder] = React.useState(false);
    const [openInfo, setOpenInfo] = React.useState(false);

    const closeAllModals = () => {
        setOpenInfo(false);
        setOpenOrder(false);
    }

    React.useEffect(() => {
        dispatch(getItems())
    }, [dispatch]);

    return (
        <div className={styles.app}>
            <AppHeader/>

            <main className={styles.main}>

                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients
                        openModal={setOpenInfo}
                    />

                    <BurgerConstructor
                        openModal={setOpenOrder}
                    />
                </DndProvider>

            </main>

            {openOrder ?
                (<Modal setIsOpen={setOpenOrder} isOpen={openOrder} close={closeAllModals}>
                    <OrderDetails />
                </Modal>)
                : null}

            {openInfo ?
                (<Modal setIsOpen={setOpenInfo} isOpen={openInfo} close={closeAllModals}>
                    <IngredientDetails />
                </Modal>)
                : null}
        </div>
    );
}

export default App;

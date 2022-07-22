import styles from "./main.module.css";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";

import React from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

const Main = ({openInfoModal, openOrderModal}) => {
    return (
        <main className={styles.main}>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients
                    openModal={openInfoModal}
                />
                <BurgerConstructor
                    openModal={openOrderModal}
                />
            </DndProvider>
        </main>
    )
}

export default Main;

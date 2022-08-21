import styles from "./main.module.css";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";

import React, {SetStateAction} from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {Dispatch} from "react";

interface IMainProps {
    openInfoModal: Dispatch<SetStateAction<boolean>>;
    openOrderModal: Dispatch<SetStateAction<boolean>>;
}

const Main: React.FC<IMainProps> = ({openInfoModal, openOrderModal}) => {
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

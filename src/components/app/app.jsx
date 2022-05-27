import React from "react";
import {getIngredients} from "../../utils/api";

import styles from './app.module.css';

import Header from "../header/header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import Info from "../info/info";
import Order from "../order/order";

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
        getIngredients().then(r => {
            setIngredients(r);
            setSelected(r[0])
        })
    }, []);

    React.useEffect(() => {
        const closeByEsc = (evt) => {
            if (evt.key === 'Escape') {
             closeAllModals();
            }
        }

        document.addEventListener('keydown', closeByEsc)

        return () => document.removeEventListener('keydown', closeByEsc)
    });

    return (
        <div className={styles.app}>
            <Header/>
            <main className={styles.main}>
                <BurgerIngredients openModal={setOpenInfo} setSelected={setSelected} bun={bun} sauce={sauce}
                                   main={main}/>
                <BurgerConstructor openModal={setOpenOrder} selected={selected} sauce={sauce} main={main}/>
            </main>

            {openOrder ?
                (<Modal setIsOpen={setOpenOrder} isOpen={openOrder} close={closeAllModals}>
                    <Info />
                </Modal>)
                : null}

            {openInfo ?
                (<Modal setIsOpen={setOpenInfo} isOpen={openInfo} close={closeAllModals}>
                    <Order selected={selected}/>
                </Modal>)
                : null}
        </div>
    );
}

export default App;

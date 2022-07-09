import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useEffect} from "react";

const MainTab = ({currentTab, setCurrentTab}) => {
    return (
        <div style={{ display: 'flex' }}>
            <Tab active={currentTab === 'buns'} value='buns'>
                Булки
            </Tab>
            <Tab active={currentTab === 'sauces'} value='sauces'>
                Соусы
            </Tab>
            <Tab active={currentTab === 'mains'} value='mains'>
                Начинки
            </Tab>
        </div>
    )
}

export default MainTab;

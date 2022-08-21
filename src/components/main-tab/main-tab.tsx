import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useEffect} from "react";

interface IMainTab {
    currentTab: string;
}

const MainTab: React.FC<IMainTab> = ({currentTab}) => {
    return (
        <div style={{ display: 'flex' }}>
            {/* @ts-ignore */}
            <Tab active={currentTab === 'buns'} value='buns'>
                Булки
            </Tab>
            {/* @ts-ignore */}
            <Tab active={currentTab === 'sauces'} value='sauces'>
                Соусы
            </Tab>
            {/* @ts-ignore */}
            <Tab active={currentTab === 'mains'} value='mains'>
                Начинки
            </Tab>
        </div>
    )
}

export default MainTab;

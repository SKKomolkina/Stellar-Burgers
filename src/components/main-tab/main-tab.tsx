import React from "react";
import {Tab} from "../tab-ui";

interface IMainTab {
    currentTab: string;
    setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
}

const MainTab: React.FC<IMainTab> = ({currentTab, setCurrentTab}) => {
    return (
        <div style={{ display: 'flex' }}>
            <Tab onClick={() => setCurrentTab('buns')} active={currentTab === 'buns'} value='buns'>
                Булки
            </Tab>
            <Tab onClick={() => setCurrentTab('sauces')} active={currentTab === 'sauces'} value='sauces'>
                Соусы
            </Tab>
            <Tab onClick={() => setCurrentTab('mains')} active={currentTab === 'mains'} value='mains'>
                Начинки
            </Tab>
        </div>
    )
}

export default MainTab;

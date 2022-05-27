import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";

const MainTab = () => {
    const [current, setCurrent] = React.useState('');
    return (
        <div style={{ display: 'flex' }}>
            <Tab active={current === 'one'} value='one' onClick={setCurrent}>
                Булки
            </Tab>
            <Tab active={current === 'two'} value='two' onClick={setCurrent}>
                Соусы
            </Tab>
            <Tab active={current === 'three'} value='three' onClick={setCurrent}>
                Начинки
            </Tab>
        </div>
    )
}

export default MainTab;

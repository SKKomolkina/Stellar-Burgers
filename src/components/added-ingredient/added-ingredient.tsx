import styles from "../burger-constructor/burger-constructor.module.css";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";

import {useDispatch} from "../../services/hooks";
import React, {useRef} from "react";

import {removeIngredient, sortIngredients} from "../../services/actions/constructor";
import {useDrag, useDrop} from "react-dnd";
import type {Identifier, XYCoord} from 'dnd-core';

import {IIngredient} from '../../utils/interface/interface';

interface IAddedIngredient {
    item: IIngredient;
    index: number;
}

const AddedIngredient: React.FC<IAddedIngredient> = ({item , index}) => {
    const dispatch = useDispatch();

    const ref = useRef<HTMLDivElement>(null);

    const [{handlerId}, drop] = useDrop<IIngredient & {index: number}, void, {handlerId: Identifier | null}>({
        accept: 'constructor',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: IIngredient & { index: number }, monitor) {
            if (!ref.current) {
                return;
            }

            const dragIndex:number = item.index;
            const hoverIndex:number = index;

            if (Number(dragIndex) === hoverIndex) {
                return;
            }

            const hoverBoundingRect: DOMRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();

            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            dispatch(sortIngredients(dragIndex, hoverIndex));
            // dispatch({
            //     type: SORT_ITEMS,
            //     payload: {
            //         from: dragIndex,
            //         to: hoverIndex,
            //     }
            // });
            item.index = hoverIndex;
        }
    });

    const [{isDragging}, drag] = useDrag({
        type: 'constructor',
        item: () => {
            return {item, index};
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));

    const handleDelete = (uuid: string) => {
        dispatch(removeIngredient(uuid));
    }

    return (
        <div ref={ref} style={{opacity}} className={`${styles.item} mb-4`}>
            <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                handleClose={() => handleDelete(String(item.uuid))}
            />
        </div>
    )
}

export default AddedIngredient;

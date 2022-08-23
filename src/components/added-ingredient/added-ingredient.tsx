import styles from "../burger-constructor/burger-constructor.module.css";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";

import {useDispatch} from "react-redux";
import React, {useRef} from "react";

import {removeIngredient, SORT_ITEMS} from "../../services/actions/constructor";
import {useDrag, useDrop} from "react-dnd";

import {IIngredient} from '../../interface/interface';

interface IAddedIngredient {
    item: IIngredient;
    index: number;
}

const AddedIngredient: React.FC<IAddedIngredient> = ({item , index}) => {
    const dispatch = useDispatch();

    const ref = useRef<HTMLDivElement>(null);

    const [, drop] = useDrop({
        accept: ['SORT_INGREDIENT'],
        // collect(monitor) {
        //     return {
        //         handlerId: monitor.getHandlerId(),
        //     }
        // },
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

            let hoverClientY: number | undefined;

            if (clientOffset) {
                hoverClientY = clientOffset.y - hoverBoundingRect.top;
            }

            if (hoverMiddleY && hoverIndex && dragIndex) {
                // @ts-ignore
                if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                    return;
                }
                // @ts-ignore
                if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                    return;
                }
            } else {
                return;
            }

            dispatch({
                type: SORT_ITEMS,
                payload: {
                    from: dragIndex,
                    to: hoverIndex,
                }
            });
            item.index = hoverIndex;
        }
    });

    const [{isDragging}, drag] = useDrag({
        type: 'SORT_INGREDIENT',
        item: () => {
            return {item, index};
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 :1;
    drag(drop(ref));

    const handleDelete = (uuid: number) => {
        dispatch(removeIngredient(uuid))
    }

    return (
        <div ref={ref} style={{opacity}} className={`${styles.item} mb-4`}>
            <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                handleClose={() => handleDelete(item.uuid)}
            />
        </div>
    )
}

export default AddedIngredient;

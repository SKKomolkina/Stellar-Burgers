import styles from "../burger-constructor/burger-constructor.module.css";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";

import {useDispatch} from "react-redux";
import {useRef} from "react";

import {removeIngredient, SORT_ITEMS} from "../../services/actions/constructor";
import {useDrag, useDrop} from "react-dnd";

const AddedIngredient = ({item, index}) => {
    const dispatch = useDispatch();

    const ref = useRef(null);

    const [{handlerId}, drop] = useDrop({
        accept: ['SORT_INGREDIENT'],
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
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

    const handleDelete = (uuid) => {
        dispatch(removeIngredient(uuid))
    }

    return (
        <li ref={ref} style={{opacity}} className={`${styles.item} mb-4`}>
            <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                handleClose={() => handleDelete(item.uuid)}
            />
        </li>
    )
}

export default AddedIngredient;

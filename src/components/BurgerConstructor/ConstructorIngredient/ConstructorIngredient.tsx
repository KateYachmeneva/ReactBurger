import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import React, { useRef, FC } from 'react';
import { TIngredientData } from "../../../utils/types";
import { XYCoord,Identifier} from "dnd-core";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "../../../services/hooks";
import {
  deleteconstrIngredient,
  updateconstrIngredients,
} from "../../../services/slices/constrIngredientsSlice";


type ConstructorIngredientPropsType = {
  ingredient: TIngredientData;
  index: number;
}

interface DragItem {
  index:number;
  id:string;
}
interface CollectedProps {
  handlerId: Identifier | null
}
const ConstructorIngredient:FC<ConstructorIngredientPropsType> = ({ ingredient, index }) => {
  const dispatch = useDispatch();

  const ref = useRef<HTMLLIElement>(null);
  const [{ handlerId }, drop] = useDrop<DragItem,void,CollectedProps>({
    accept: ["UPDATE_CONSTRUCTOR_INGREDIENTS"],
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item:DragItem, monitor: DropTargetMonitor) {
      const dragIndex:number = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
     if (!ref.current){
      return;
     }
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      const newData = {
        from: dragIndex,
        to: hoverIndex,
      };
      dispatch(updateconstrIngredients(newData));
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "UPDATE_CONSTRUCTOR_INGREDIENTS",
    item: () => {
      return { ingredient, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <li style={{ opacity }} data-handler-id={handlerId} ref={ref}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => {
          dispatch(deleteconstrIngredient(ingredient));
        }}
      />
    </li>
  );
}

export default ConstructorIngredient;

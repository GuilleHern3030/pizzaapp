import Counter from "../counter/Counter";
import ShoppingCartIcon from "../icon/ShoppingCartIcon";
import styles from "./ShoppingCart.module.css";

import { useSelector } from "react-redux";
import { getSelectedArticlesAmount } from "../../../redux/reducers/articles/articlesSelector";

export default function ShoppingCart(
        {
            onClicked=(...params)=>{},
            animation=true,
            size = 1,
            posX = -2.5,
            posY = 20,
            iconBackgroundColor = "#d5d5a7",
            hoverStyle = {borderColor:"#2d2b2b", backgroundColor:"#c6c6a0"}
        }) {
    
    const counter = useSelector(getSelectedArticlesAmount());

    return (<>
        <ShoppingCartIcon
            size={size}
            animation={animation}
            onClicked={onClicked}
            position={iconPosition(posX, posY)}
            backgroundColor={iconBackgroundColor}
            hoverStyle={hoverStyle}
        />
        <Counter 
            amount={counter} 
            position={iconPosition(posX, posY)}
            size={size}
        />
    </>);
}

const iconPosition = (x, y) => {
    if (x >= 0) x = { left: `${x}%` }
    else if (x < 0) x = { right: `${-x}%` }
    if (y >= 0) y = { top: `${y}%` }
    else if (y < 0) y = { bottom: `${-y}%` }
    return { ...x, ...y }
}
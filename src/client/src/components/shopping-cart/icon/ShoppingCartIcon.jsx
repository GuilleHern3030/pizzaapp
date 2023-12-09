import { useState, useRef, useLayoutEffect, useEffect } from "react";
import cartIcon from "../../../assets/icons/shoppingcart.webp";
import styles from "./ShoppingCartIcon.module.css";

export default function ShoppingCartIcon(
        {
            onClicked=(...params)=>{},
            animation=true,
            size = 1,
            position,
            backgroundColor = "#d5d5a7",
            hoverStyle = {borderColor:"#2d2b2b", backgroundColor:"#c6c6a0"}
        }) {
    
    const [hover, setHover] = useState();
    const [actived, setActived] = useState();
    const [iconSize, setIconSize] = useState();
    const iconRef = useRef();
    useLayoutEffect(() => { setIconSize(iconRef.current.clientHeight * size) }, [])
    
    const handleCartClick = e => {
        const activated = actived === undefined ? true : !actived;
        if (animation) setActived(activated);
        if (onClicked) onClicked(animation ? activated : true);
    };

    const zIndex = actived === true ? {zIndex: 250} : {}
    
    return (<>
        <div 
        id="shopping-cart" 
        className={styles.container} 
        style={{ ...position, ...zIndex }}
        >
            <div
            ref={iconRef} 
            onMouseEnter={()=>setHover(hoverStyle)}
            onMouseLeave={()=>setHover({})}
            onClick={handleCartClick}
            style={{height:iconSize, width:iconSize, backgroundColor, ...hover}}
            className={actived === true ? styles.shoppingcartIcon__active : actived === false ? styles.shoppingcartIcon__inactive : ""}
            > <img src={cartIcon} /> </div>
        </div>
    </>);
}
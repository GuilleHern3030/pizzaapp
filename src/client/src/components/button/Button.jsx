import { useEffect, useState } from "react";

export default function Button({
    style = {},
    styleHover = {},
    onClick,
    onDoubleClick,
    onAuxClick,
    className,
    ref,
    key,
    margin = "0.7em",
    color = "#ffffffde",
    colorHover = "#e8e8e8de",
    borderRadius = "8px",
    backgroundColor = "#1a438b",
    backgroundColorHover = "#1d4b99",
    outline = "1px solid black",
    outlineHover = "4px auto #646cff",
    border = "1px solid transparent",
    borderHover = "1px solid transparent",
    fontSize = "1em",
    padding = "0.25em 0.55em",
    textAlign = "center",
    cursor = "pointer",
    animationTime = 0.25, // seconds
    scaleHover = 1.1,
    children
}) {
    const [ hovered, setHovered ] = useState(false)
    const [ styles, setStyles ] = useState(style)
    useEffect(() => setStyles(hovered ? styleHover : style), [hovered])
    
    return <button
        style={{
            color: hovered ? colorHover : color,
            backgroundColor: hovered ? backgroundColorHover : backgroundColor,
            border: hovered ? borderHover : border,
            outline: hovered ? outlineHover : outline,
            transition: `transform ${animationTime}s`,
            transform: hovered ? `scale(${scaleHover})` : 'scale(1)',
            borderRadius,
            fontSize,
            margin,
            cursor,
            textAlign,
            padding,
            ...styles
        }}
        key={key}
        ref={ref}
        className={className}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        onAuxClick={onAuxClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
    >{children}</button>
}
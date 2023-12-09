export function isTransparent (color, umbral=1) {
    if (isColor(color)) {
        if (color.startsWith('rgb')) return rgbTransparent(color, umbral);
        else if (color.startsWith('#')) return rgbTransparent(hexToRgba(color), umbral);
    }
    return false;
}

export function isColor (color) {
    if (color.startsWith('rgb')
        || color.startsWith('#') && color.length <= 9
    ) return true;
    else return false;
}

const rgbTransparent = (color, umbral=1) => {
    try {
        color = color.replace(/\s/g, '').toLowerCase();
        if (color.startsWith('rgba(')) {
            const alpha = parseFloat(color.substring(color.lastIndexOf(',') + 1, color.lastIndexOf(')')));
            return alpha < umbral;
        }
    } catch(e) { }
    return false;
}

const hexToRgba = hexColor => {
    let r = 0, g = 0, b = 0, a = 1;

    if (hexColor.length <= 5 && hexColor.length > 0) {
        let color = "#";
        for (const h of hexColor) {
            if (h === '#') continue;
            color += `${h}${h}`;
        }
        hexColor = color;
    }

    if (hexColor.length === 9) {
        r = parseInt(hexColor.substring(1, 3), 16);
        g = parseInt(hexColor.substring(3, 5), 16);
        b = parseInt(hexColor.substring(5, 7), 16);
        a = parseInt(hexColor.substring(7, 9), 16) / 255;
        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }

    else if (hexColor.length === 7) {
        r = parseInt(hexColor.substring(1, 3), 16);
        g = parseInt(hexColor.substring(3, 5), 16);
        b = parseInt(hexColor.substring(5, 7), 16);
        return `rgb(${r}, ${g}, ${b})`;
    }

    return undefined;
}
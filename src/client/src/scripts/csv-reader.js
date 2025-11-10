/**
 * Establece la conexión con un archivo CSV
 * @returns {Promise} Devuelve una promesa con un objeto JSON con la información del CSV
 */
export default async(csvPath, id="id", separator=",") => {
    
    return await fetch(csvPath)
    .then(response => response.text())
    .then(data => {

        console.log("data:", data)

        let content = data.split(/\r?\n/);
        console.log(content)

        const headers = ((content).shift()).split(`"${separator}"`).map(item => item.replace(/"/g, ''));
        const rows = [];

        while(content.length > 0) {
            const line = content.shift();
            if (typeof line === 'string' && line.length > 0) {
                const arrayLine = [];
                let l = 0;
                while(l < line.length) {
                    if (line.substring(l, l+1).includes('"')) {
                        const end = line.substring(l+1).indexOf('"') + l + 1;
                        arrayLine.push(line.substring(l+1, end));
                        l = end + 2;
                    } else { // null
                        arrayLine.push(null);
                        l += 5;
                    }
                }
                rows.push(arrayLine);
            }
        }

        console.log(headers, rows)
        
        return [headers, rows];
    })
    .then(([headers, content]) => {
        let elements = {}
        for (let i = 0; i < content.length; i++) {
            elements[i] = {};
            elements[i][id] = (i + 1);
            for (let h = 0; h < headers.length; h++) 
                elements[i][headers[h]] = content[i][h];
        }
        elements = Object.keys(elements).map(key => elements[key]) // parse json to array
        return elements;
    })
    .catch(e => "Data not found.\n" + e);
}
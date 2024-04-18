function recieveData(csvText, sep = ","){
    let matrix = [];
    let csvLines = csvText.split('\n');
    for (let i = 0; i < csvLines.length - 1; i++){
        let line = csvLines[i];
        let cells = line.split(sep);
        requiredLine = [];

        for (let j = 0; j < cells.length; j++) {
            cells[j] = cells[j].trim();
            if (cells[j].length === 0 || cells[j] === undefined) {
                alert("Файл не должен содержать пропуски");
                return;
            }
            requiredLine.push(cells[j]);
        }
        matrix.push(requiredLine);   
    }
    
    return matrix;
}

let treeRoot = document.getElementById("root");
const FILE = document.getElementById('file_input');

let flag = true;
let root;

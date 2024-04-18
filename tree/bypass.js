async function makeDecision() {
    let string = document.getElementById('input_data').value;
    let array = string.split(",");
    for (let i = 0; i < array.length; i++)
        array[i] = array[i].trim();

    let currentNode = root;
    let counter = root.data[0].length; 

    while(currentNode != undefined) {

        if (!currentNode.visited) {
            currentNode.visited = true;
            await gradient('rgb(97, 240, 105)', currentNode);
            await sleep(100);
            if (currentNode.finalA !== undefined) {
				await gradientForFinal('rgb(97, 240, 105)', currentNode.finalA);
				await sleep(100);
			}
        }

        if (doubleDecision(currentNode, array) != -1) currentNode = currentNode.children[doubleDecision(currentNode, array)];

        else if (currentNode!= undefined) {

            for (let j = 0; j < currentNode.children.length; j++) {
                if (array.includes(currentNode.children[j].name) || currentNode.decisionMaker === root.data[0][root.data[0].length - 1] || currentNode.decisionMaker === root.data[0][root.data]) {
                    currentNode = currentNode.children[j];
                    break;
                }
            } 
        }

        if (currentNode != undefined && currentNode.name !== "START" && currentNode.parent.decisionMaker === root.data[0][root.data[0].length-1] && ! currentNode.visited)  {
            currentNode.visited = true;
            await gradient('rgb(97, 240, 105)', currentNode);
            break;
        }

        counter--;
        if (counter < 0) {
            alert("Введите корректно обход")
            break;
        }
    }
}

function doubleDecision(currentNode, array) {
    if (currentNode != undefined && currentNode.children[0] != undefined)
        if (currentNode.children[0].name[0] === "<") {
            let num = currentNode.children[0].name;
            num = num.replace('<', '');
            for (let j = 0; j < array.length; j++) 
                if (!isNaN(parseFloat(array[j]))) 
                    if (parseFloat(array[j]) < parseFloat(num)) return 0;
                    else return 1;
        } 
        else return -1;
}
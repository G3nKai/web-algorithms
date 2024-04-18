async function gradientForFinal(RGB, finalA) {
    let rgb = getRGB(RGB);
    finalA.style.backgroundColor = 'rgb('+ rgb[0] +','+ rgb[1] +','+ rgb[2] +')';
    await sleep(70);
}

function getRGB(str) {
    let regex = /\d{1,3}/;
    let rgb = [];
    for(let i = 0; i<3; i++) {
        rgb[i] = parseFloat(regex.exec(str));
        str = str.replace(regex, "")
    }
    return rgb
}

async function gradient(RGB, node) {
    let rgb = getRGB(RGB);
    node.a.style.backgroundColor = 'rgb('+ rgb[0] +','+ rgb[1] +','+ rgb[2] +')';
    await sleep(70);
}

function drawTree(currentNode, treeElement) {
    let li = document.createElement("li");
    let a = document.createElement("a");
    currentNode.a = a;
    a.href = "#";
    let nodeName = currentNode.name;
    if (nodeName === "START") a.textContent = nodeName;
    else {
        let feature = currentNode.parent.decisionMaker;
        a.textContent = feature + " : " + nodeName;
    }
    
    li.appendChild(a);
    treeElement.appendChild(li);
    if (currentNode.isleaf || currentNode.finalLeaf()) { 
        let finalUl = document.createElement("ul");
        let finalLi = document.createElement("li");
        let finalA = document.createElement("a");
        finalA.href = "#";
        finalA.textContent = currentNode.value;
        finalLi.appendChild(finalA);
        finalUl.appendChild(finalLi);
        li.appendChild(finalUl);

        return;
    }

    let ul = document.createElement("ul");
    li.appendChild(ul);

    for (let i = 0; i < currentNode.children.length; i++) 
        drawTree(currentNode.children[i], ul);
}
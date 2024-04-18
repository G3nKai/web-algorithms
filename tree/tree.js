class TreeNode {
    constructor (data, name) {
        this.data = data;
        this.name = name;
        this.children = [];
        this.parent;
        this.value;
        this.decisionMaker;
        this.percentage = undefined;
        this.visited = false;
        this.isleaf = false;
        this.a;
    };
    
    finalLeaf() {
        if (this.children == undefined) return true; 

        if (this.children.length == 0)  return true;
        
        return false;
    }
}

function sleep(ms) { 
    return new Promise(resolve => setTimeout(resolve, ms));
} 

var celSet = new Set();

function createTree() {
    treeRoot = removeTree();
    let dataBase = FILE.files[0];
    let reader = new FileReader();
    reader.readAsText(dataBase);
    reader.onload = function () {
        dataBase = recieveData(reader.result);
        building(dataBase);
        drawTree(root, treeRoot);
    }
    flag = true;
} 

function building(matrix) {
    root = new TreeNode(matrix, "START");
    buildTree(root);
}

function buildTree (node) {
    let splittingParameter = decideToSplit(node.data);
    node.value = splittingParameter["data"]["value"]["maxValue"];

    node.percentage = splittingParameter["data"]["value"]["assurance"];
    node.decisionMaker = splittingParameter["feature"];

    for (featureVal in splittingParameter["data"]["arrays"]) {
        let treeNode = new TreeNode(splittingParameter["data"]["arrays"][featureVal]["array"], featureVal);
        treeNode.parent = node;

        if (treeNode.data[0].length > 2 && splittingParameter["data"]['entropy'] !== 999) buildTree(treeNode);

        else {
            treeNode.isleaf = true;
            treeNode.percentage = 1;
            treeNode.value = treeNode.data[1][treeNode.data[1].length - 1];
        }

        node.children.push(treeNode);
    }
    
}

function decideToSplit(matrix) {
    let featuresList = {};

    for(let i = 1; i < matrix.length ; i++){
        celSet.add(matrix[i][matrix[i].length-1]);
    }

    let currValue = decisionValue();

    for(let j = 0; j < matrix[0].length - 1; j++){
        let featureDict = {};

        featureDict["isDouble"] = (isDouble(j));
        featureDict["entropy"] = undefined;
        featureDict["value"] = currValue;
        if (featureDict["isDouble"] === true) {
            let doubleResult = doubleData(j);

            featureDict["entropy"] = doubleResult["entropy"];
            if (featureDict["entropy"] !== 999) {
                let leftName = "<" + doubleResult["splittingParameter"], rightName = ">=" + doubleResult["splittingParameter"];
                featureDict["arrays"] = [];
                featureDict["arrays"][leftName] = {"array" : []};
                featureDict["arrays"][rightName] = {"array" : []};

                let il = 0, ir = 0;
                for (let i = 1; i < matrix.length; i++) {
                    if (i === doubleResult["indexes"]["leftIndexes"][il] + 1) {
                        featureDict["arrays"][leftName]["array"].push(matrix[i]);
                        il++;
                    } else {
                        featureDict["arrays"][rightName]["array"].push(matrix[i]);
                        ir ++;
                    }
                }
                if ( featureDict["arrays"][leftName]["array"].length < 2) {
                    featureDict["arrays"].splice(leftName, 1);
                }
                if ( featureDict["arrays"][rightName]["array"].length < 2) {
                    featureDict["arrays"].splice(rightName, 1);
                }
                featureDict["arrays"][leftName]["array"].splice(0, 0, matrix[0]);
                featureDict["arrays"][rightName]["array"].splice(0, 0, matrix[0]);
            }

        } else {
            featureDict["entropy"] = 0;
            featureDict["arrays"] = [];
            for(let i = 1; i < matrix.length; i++){
            
                let featureVal = matrix[i][j];
                let celVal = matrix[i][matrix[0].length - 1];
                if (featureDict["arrays"][featureVal] === undefined) {
                    let celDict = {};
                    for(let val of celSet){
                        celDict[val] = 0;
                    }
                    celDict["array"] = [];
                    featureDict["arrays"][featureVal] = celDict;
                }
                featureDict["arrays"][featureVal][celVal] += 1;
                let neededArray = new Array(matrix[i].length);
                for (let k = 0; k < matrix[i].length; k ++) {
                    neededArray[k] = matrix[i][k];
                }
                neededArray.splice(j, 1);
                
                featureDict["arrays"][featureVal]["array"].push(neededArray);
            }
            let neededArray = new Array(matrix[0].length);
                for (let k = 0; k < matrix[0].length; k ++) {
                    neededArray[k] = matrix[0][k];
                }
                neededArray.splice(j, 1);
            for (let featureVal in featureDict["arrays"]) {
                featureDict["arrays"][featureVal]["array"].splice(0, 0, neededArray);
            }
            featureDict["entropy"] += stringEntropy(featureDict);
        }
        featuresList[ matrix[0][j]] = { "data" : featureDict, "feature" : matrix[0][j]};
    }


    let finalEntropy = 1000;
    let finalDecisionMaker = undefined;
    for(let feature in featuresList) {
        if (featuresList[feature]["data"]["entropy"] < finalEntropy) {
            finalEntropy = featuresList[feature]["data"]["entropy"];
            finalDecisionMaker = featuresList[feature];
        }

    }
    return finalDecisionMaker;



    function getBaseLog(base, num) {
        if (num === 0 || base === 0) return 0;
        return Math.log(num) / Math.log(base);
    }


        
    function doubleData(columnIngex) {
        class NumElem {
            constructor(value, celElem) {
                this.value = parseFloat(value);
                this.celElem = celElem;
            }
        };

        let numsSorted = [];
        let nums = []
        for (let i = 1; i < matrix.length; ++ i) {
            nums.push(new NumElem(matrix[i][columnIngex], matrix[i][matrix[0].length - 1]));
            numsSorted.push(new NumElem(matrix[i][columnIngex], matrix[i][matrix[0].length - 1]));
        }
        
        numsSorted.sort((a,b)=>a.value -b.value);

        deleteCopies(numsSorted);
        
        let part1 = [], part2 = [];
        for (let i = 1; i < numsSorted.length; ++ i) {
            part2.push(numsSorted[i]);
        }

        part1.push(numsSorted[0]);
        let finalEntropy = 999;
        let borderIndex = undefined;

        for (let i = 1; i < numsSorted.length; ++ i) {

            if (numsSorted[i].celElem !== numsSorted[i-1].celElem) {
                let currEntropy = part1.length / numsSorted.length * doubleEntropy(part1) + part2.length / numsSorted.length * doubleEntropy(part2);
                if (currEntropy < finalEntropy) {
                    finalEntropy = currEntropy;
                    borderIndex = i;
                }
            }
            part2.splice(0, 1);
            part1.push(numsSorted[i]);
        }
        let result = {};

        result["entropy"] = finalEntropy;
        result["indexes"] = {"rightIndexes" : [], "leftIndexes" : []};
        if (borderIndex === undefined) {
          borderIndex = 1;
        }
        if (numsSorted.length < 2) {
            return result;
        }
        result["splittingParameter"] = (numsSorted[borderIndex].value + numsSorted[borderIndex - 1].value) / 2;
        for (let i = 0; i < nums.length; ++i) {
            if (nums[i].value < result["splittingParameter"]) {
                result["indexes"]["leftIndexes"].push(i);
            } else {
                result["indexes"]["rightIndexes"].push(i);
            }
        }
        return(result);
    }

    function doubleEntropy (nums) {
        let cels = {};
        for(let val of celSet){
            cels[val] = 0;
        }
        for (let i = 0; i < nums.length; ++ i) {
            cels[nums[i].celElem] += 1;
        }

        let localEntropy = 0;

        for(let val of celSet){
            localEntropy -= (cels[val] / nums.length) * getBaseLog(2, cels[val] / nums.length);
        }

        return localEntropy;
    }

    function deleteCopies(numsSorted) {

        for (let i = 1; i < numsSorted.length; ++i) {
            if (numsSorted[i - 1].value === numsSorted[i].value) {
                if (numsSorted[i - 1].celVal === numsSorted[i].celVal) {
                    numsSorted.splice(i, 1);
                    i--;
                }
            }
        }
    }


    function stringEntropy(featureDict) {

        let finalEntropy = 0;
        
        let size = 0;
        
        for (let val in featureDict["arrays"]) 
            size += featureDict["arrays"][val]["array"].length;
          
        
        for (let val in featureDict["arrays"])
            for (let celVal of celSet)
                finalEntropy -= (featureDict["arrays"][val][celVal] / size) * getBaseLog(2, featureDict["arrays"][val][celVal] / size) * featureDict["arrays"][val]["array"].length / size;

        return finalEntropy;
    }

    function decisionValue() {
        let celDict = {};
        let maxCount = -1;
        let maxVal = undefined;

        for(let val of celSet){
            celDict[val] = 0;
        }

        for (let i = 1; i < matrix.length; i++) {
            celDict[matrix[i][matrix[0].length - 1]] ++;
        }
        
        let assurance = 0;
        for (let val of celSet) {
            if (celDict[val] > maxCount) {
                maxVal = val;
                maxCount = celDict[val];
                assurance = celDict[val] / (matrix.length - 1);
            }
        }
        let value = {"maxValue": maxVal, "assurance": assurance};

        return value;
    }

    function isDouble(columnIngex) {
        for (let i = 1; i < matrix.length; ++ i) {
            if (isNaN(parseFloat(matrix[i][columnIngex]))) {
                return false;
            }
        }
        return true;
    }
}
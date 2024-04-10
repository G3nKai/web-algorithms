var minPTSD = document.getElementById("PTS");
var selectedPTS = document.getElementById("SelectedPTS");

var minPTS = minPTSD.value;
selectedPTS.textContent = minPTS;

minPTSD.addEventListener("input", function() {
    minPTS = this.value;
    selectedPTS.textContent = minPTS;
});


var preValueEps = document.getElementById("eps");
var SelectedEps = document.getElementById("SelectedEps");

var eps = preValueEps.value;
SelectedEps.textContent = eps;

preValueEps.addEventListener("input", function() {
    eps = this.value;
    SelectedEps.textContent = eps;
});

//minPTS && eps считываются с мейн страницы
//сюда передаются var points, eps, minPTS 
//в этой функции точки у которых точек >= minPTS принадлежат кластерам
//если меньше, то просто шум (noise)
function DBSCAN() {
    
}
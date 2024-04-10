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

//(DB, distFunc, Q, epsilon) DB===points[] Q===dot  dist===euclidianDistance epsilon===задается на сайте пользователем
function RangeQuery() {
    let neighbours = [];
    for (let i = 0, len = points.length; i < len; i++) {

    }
}
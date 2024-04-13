var runner = document.getElementById('start');

function run() {
    let temp = runner.value;
    if (temp == 'kmeans') kmeans();
    else if (temp == 'jerarch') jerach();
    else DBSCAN();
}
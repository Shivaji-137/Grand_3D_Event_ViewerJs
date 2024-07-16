/* 

This code, written by Shivaji Chaulagain, gives the exact output as given by getinshowerplane in mix.py"

*/
function subtractCore(pos, core) {
    const core_ = core.map(i => {
        return [i]
    });
    return pos.map((vector,index) => vector.map(value => value - core_[index][0]));
}
function computeB(inclination, declination) {
    return [
        Math.sin(inclination) * Math.cos(declination),
        Math.sin(inclination) * Math.sin(declination),
        Math.cos(inclination)
    ];
}

function crossProduct(a, b) {
    return [
        a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0]
    ];
}

function normalize(v) {
    let norm = Math.sqrt(v.reduce((sum, vi) => sum + vi ** 2, 0));
    return v.map(vi => vi / norm);
}

function dotProduct(x, y) {
        let dotmatrix = y[0].map((_, i) => x.reduce((acc, _, j) => acc + x[j] * y[j][i], 0));
        return dotmatrix

};

function getInShowerPlane(posArray, k, core, inclination, declination) {
    let pos = subtractCore(posArray, core);
    console.log("pos after core subtraction:\n", pos);
    console.log(pos.length)

    let B = computeB(inclination, declination);
    console.log("B vector:\n", B);
    let kxB = normalize(crossProduct(k, B));
    console.log("kxB vector (normalized):\n", kxB);

    let kxkxB = normalize(crossProduct(k, kxB));
    console.log("kxkxB vector (normalized):\n", kxkxB);

    const result = [
        dotProduct(kxB, pos),
        dotProduct(kxkxB, pos),
        dotProduct(k, pos)
    ];
    return result
}

//Lane Snively
class Graph { //represents graph with up to 52 nodes
    constructor() {
        this.nodes = new Array(); //list of all node names: in input order
        this.nodenames = new Map(); //list of all node names with index number
        this.numnodes = 0; //node count
        this.graph = new Map(); //weighted graph with node names
    }
    addNode(name) { //node name
        this.nodes.push(name);
        this.nodenames.set(name, this.numnodes);
        this.numnodes++;
        this.graph.set(name, new Map());
    }
    addEdge(from, to, weight) { //from node to node 
        this.graph.get(from).set(to, weight);
    }
    matrixToGraph(distance_matrix) { //used to initialize Graph with matrix
        var cities = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r",
            "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
            "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        for (var i = 0; i < distance_matrix.length && distance_matrix.length <= 52; i++) this.addNode(cities[i]);
        for (var i = 0; i < distance_matrix.length && distance_matrix.length <= 52; i++) {
            for (var j = 0; j < distance_matrix.length && distance_matrix.length <= 52; j++)
                this.addEdge(this.nodes[i], this.nodes[j], distance_matrix[i][j]);
        }
    }
    generateGraph(size) { //used to initialize Graph with random values, size up to 52
        var cities = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r",
            "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
            "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        for (var i = 0; i < size && size <= 52; i++) this.addNode(cities[i]);
        for (var i = 0; i < size && size <= 52; i++) {
            for (var j = 0; j < size && size <= 52; j++) {
                if (i != j) {
                    var value = Math.round(Math.random() * 9);
                    this.addEdge(this.nodes[i], this.nodes[j], value);
                    this.addEdge(this.nodes[j], this.nodes[i], value);
                }
            }
        }
    }
    adjMatrixToString() { //used to print adjacency matrix of graph
        var matrix = new Array(this.numnodes + 1);
        for (var i = 0; i < matrix.length; i++) {
            matrix[i] = new Array(this.numnodes + 1);
            for (var j = 0; j < matrix.length; j++) matrix[i][j] = 0;
        } //initialize 2D matrix with 0.
        var horiz = 1, vertic = 1;
        for (var i of this.graph.keys()) {
            matrix[horiz][0] = i; //fill top row of nodes
            horiz++;
        }
        for (var i of this.graph.keys()) {
            matrix[0][vertic] = i; //fill left column of nodes
            vertic++;
        }
        for (var i of this.graph.keys()) {
            for (var j of this.graph.get(i).keys()) {
                var asdf = 0, fdsa = 0;
                while (this.nodenames.get(i) != asdf && asdf < this.numnodes) { asdf++; }
                while (this.nodenames.get(j) != fdsa && fdsa < this.numnodes) { fdsa++; }
                matrix[asdf + 1][fdsa + 1] = this.graph.get(i).get(j);
            }
        } //fill array with values corresponding to graph edges
        var asdf = "";
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix.length; j++) { asdf += " " + matrix[i][j]; }
            asdf += "\n";
        } return asdf; //array to string
    }
} //end of graph class
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//driver code below
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
function generateMatrix(size) { //undirected weighted adjMatrix
    var matrix = new Array();
    for (var i = 0; i < size; i++) {
        matrix[i] = new Array();
        for (var j = 0; j < size; j++) { matrix[i].push(0); } //fill with 0
    }
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            if (i != j) {
                var value = Math.round(Math.random() * 9);
                matrix[i][j] = value; //fill with random values. 
                matrix[j][i] = value; //making a symmetric matrix
            }
        }
    } return matrix;
}
function matrixToString(matrix) { //for printing matrix
    var asdf = "";
    for (var i = 0; i < matrix.length; i++) {
        asdf += "["
        for (var j = 0; j < matrix.length - 1; j++) {
            asdf += matrix[i][j] + ",";
        } asdf += matrix[i][j] + "]";
        asdf += "\n";
    } return asdf; //array to string
}
function testa(size) {
    console.log("~~~~~~generated graph test~~~~~~");
    var g = new Graph();
    g.generateGraph(size);
    console.log(g.adjMatrixToString());
    console.log("~~~~~~end test~~~~~~");
}
function testb(size) {
    console.log("~~~~~~generated matrix test~~~~~~");
    var matrix = generateMatrix(size);
    console.log(matrixToString(matrix));
    var g = new Graph();
    g.matrixToGraph(matrix);
    console.log(g.adjMatrixToString());
    console.log("~~~~~~end test~~~~~~");
}
function test() {
    for (var i = 0; i <= 52; i++) {
        testa(i);
        testb(i);
    }
}
console.log("experimental results for test: " + test());
console.log("done");
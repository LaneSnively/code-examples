// https://www.geeksforgeeks.org/implementation-graph-javascript/

class Graph {
    constructor(nOfVertices) {
        this.nOfVertices = nOfVertices;
        this.adjList = new Map();
    }
    addVertex(v) {
        this.adjList.set(v, []);
    }
    addEdge(v, w) {
        this.adjList.get(v).push(w);
        this.adjList.get(w).push(v);
    }
    printGraph() {
        var get_keys = this.adjList.keys();
        for (var i of get_keys) {
            var get_values = this.adjList.get(i);
            var conc = "";
            for (var j of get_values) {
                conc += j + " ";
            }
            console.log(i + " -> " + conc);
        }
    }
    bfs(startingNode) {
        var visited = [];
        for (var i = 0; i < this.nOfVertices; i++) {
            visited[i] = false;
        }
        var q = new Queue();
        visited[startingNode] = true;
        q.enqueue(startingNode);
        while (!q.isEmpty()) {
            var getQueueElement = q.dequeue();
            console.log(getQueueElement);
            var get_list = this.adjList.get(getQueueElement);
            for (var i in get_list) {
                var neigh = get_list[i];
                if (!visited[neigh]) {
                    visited[neigh] = true;
                    q.enqueue(neigh);
                }
            }
        }
    }
    dfs(startingNode) {
        var visited = [];
        for (var i = 0; i < this.nOfVertices; i++) {
            visited[i] = false;
        }
        this.DFSUtil(startingNode, visited);
    }
    DFSUtil(vert, visited) {
        visited[vert] = true;
        console.log(vert);
        var get_neighbors = this.adjList.get(vert);
        for (var i in get_neighbors) {
            var get_elem = get_neighbors[i];
            if (!visited[get_elem]) this.DFSUtil(get_elem, visited);
        }
    }
}
class Queue {
    constructor() {
        this.elements = [];
    }
    enqueue(e) {
        this.elements.push(e);
    }
    dequeue() {
        return this.elements.shift();
    }
    isEmpty() {
        return this.elements.length == 0;
    }
}

var g = new Graph(6);
var vertices = ['A', 'B', 'C', 'D', 'E', 'F'];
for (var i = 0; i < vertices.length; i++) {
    g.addVertex(vertices[i]);
}
g.addEdge('A', 'B');
g.addEdge('A', 'D');
g.addEdge('A', 'E');
g.addEdge('A', 'E');
g.addEdge('B', 'C');
g.addEdge('D', 'E');
g.addEdge('E', 'F');
g.addEdge('E', 'C');
g.addEdge('C', 'F');
g.printGraph();
console.log("BFS");
g.bfs('A');
console.log("DFS");
g.dfs('A');
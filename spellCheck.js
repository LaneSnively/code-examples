// Lane Snively
// spell checking using binary trees
// uses a .txt file as a dictionary reference to compare words to
// the .txt file in need of spell checking

class Node {
    constructor(data, left, right) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor() {
        this.root = null;
    }
    insert(data) {
        var n = new Node(data, null, null);
        if (this.root == null) {
            this.root = n;
        } else {
            var current = this.root;
            var parent;
            while (true) {
                if (current.data === data) {
                    current.count++;
                    break;
                }
                parent = current;
                if (data < current.data) {
                    current = current.left;
                    if (current == null) {
                        parent.left = n;
                        break;
                    }
                } else {
                    current = current.right;
                    if (current == null) {
                        parent.right = n;
                        break;
                    }
                }
            }
        }
    }
    search(node, data) {
        if (node == null) {
            return false;
        } else if (data < node.data) {
            return this.search(node.left, data);
        } else if (data > node.data) {
            return this.search(node.right, data);
        } else return true;
    }
}

class SpellCheck {
    constructor(file) {
        const fs = require('fs');
        var text = fs.readFileSync('./dictionary.txt', 'ascii'); //replace text file name here 
        var textByLine = text.split("\n");
        for (var i = 0; i < textByLine.length; i++) {
            textByLine[i] = textByLine[i].trim();
        }
        this.dictionary = new Array();
        for (var i = 0; i < textByLine.length; i++) {
            var words = textByLine[i].split(" ");
            this.dictionary.push(words);
        }

        text = fs.readFileSync(file, 'ascii');
        textByLine = text.split("\n");
        for (var i = 0; i < textByLine.length; i++) {
            textByLine[i] = textByLine[i].trim();
        }
        this.checkFile = new Array();
        for (var i = 0; i < textByLine.length; i++) {
            var words = textByLine[i].split(" ");
            for (var j = 0; j < words.length; j++) {
                var newWord = words[j].replace(/[^\w\s]|_/g, "");
                newWord = newWord.replace(/[0987654321]/g, "");
                newWord = newWord.toLowerCase();
                if (newWord.length > 0) {
                    var exists = false;
                    for (var k = 0; k < this.checkFile.length; k++) {
                        if (newWord === this.checkFile[k]) {
                            exists = true;
                            break;
                        }
                    }
                    if (!exists) this.checkFile.push(newWord);
                }
            }
        }
    }
    toTree(arr) {
        var tree = new Tree();
        for (var i = 0; i < arr.length; i++) {
            tree.insert(arr[i]);
        }
        return tree;
    }
    spellCheck() {
        var misspelled = new Array();
        var dict = this.toTree(this.dictionary);
        for (var i = 0; i < this.checkFile.length; i++) {
            console.log(this.checkFile[i]);
            if (!dict.search(dict.root, this.checkFile[i])) {
                misspelled.push(this.checkFile[i]);
            }
        }
        return misspelled;
    }
}
/////////////////////////////////////////////////////////////////////////
//Driver code
/////////////////////////////////////////////////////////////////////////
var test = new SpellCheck('./book.txt'); //replace text file name here 
var secOne = Date.now();
var misspelledArr = test.spellCheck();
var secTwo = Date.now();
console.log("dictionary size: " + test.dictionary.length);
console.log("unique words in book: " + test.checkFile.length);
console.log("number of misspelled words: " + misspelledArr.length);
console.log("time to check spelling: " + ((secTwo - secOne) / 1000) + " seconds");
console.log("misspelled words in the book: ");
console.log(misspelledArr);
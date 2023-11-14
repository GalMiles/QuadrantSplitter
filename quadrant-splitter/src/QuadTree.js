
//Tree Node class
class Node {
    constructor(x1, y1, x2, y2, width) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.width = width;
        this.topLeft = null;
        this.topRight = null;
        this.bottomLeft = null;
        this.bottomRight = null;
        this.color = this.getRandomColor();
    }

    //check if the click point is inside the node
    containsPoint(x, y) {
        return x >= this.x1 && x <= this.x2 && y >= this.y1 && y <= this.y2;
    }
    //check if the node is a leaf
    isLeaf() {
        return !this.topLeft && !this.topRight && !this.bottomLeft && !this.bottomRight;
    }

    //generate random color for node
    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
}
//QuadTree class
class QuadTree {
    constructor(x1, y1, x2, y2, width) {
        this.root = new Node(x1, y1, x2, y2, width);
    }

    //get node, (x, y) click and split the node
    split(node, x, y) {
        if (node.isLeaf() && node.containsPoint(x, y)) {
            const halfWidth = node.width / 2;
            node.topLeft = new Node(node.x1, node.y1, node.x2 - halfWidth, node.y2 - halfWidth, halfWidth);
            node.topRight = new Node(node.x1 + halfWidth, node.y1, node.x2, node.y2 - halfWidth, halfWidth);
            node.bottomLeft = new Node(node.x1, node.y1 + halfWidth, node.x2 - halfWidth, node.y2, halfWidth);
            node.bottomRight = new Node(node.x1 + halfWidth, node.y1 + halfWidth, node.x2, node.y2, halfWidth);
        }
    }

    //creating new tree with updated root
    cloneWithUpdatedRoot(newRoot) {
        const newTree = new QuadTree(newRoot.x1, newRoot.y1, newRoot.x2, newRoot.y2, newRoot.width);
        newTree.root = newRoot;
        return newTree;
    }
}
export { Node, QuadTree };
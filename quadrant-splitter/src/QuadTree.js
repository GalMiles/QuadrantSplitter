
class Node {
    constructor(x1,y1,x2, y2, width) {
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

    containsPoint(x, y) {
        return x >= this.x1 && x <= this.x2 && y >= this.y1 && y <= this.y2;
    }
    isLeaf() {
        return !this.topLeft && !this.topRight && !this.bottomLeft && !this.bottomRight;
      }

      getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
}

class QuadTree {
    constructor(x1, y1, x2, y2, width) {
        this.root = new Node(x1, y1, x2, y2, width);
    }

    split(node, x, y){
        if(node.isLeaf() && node.containsPoint(x, y)) {
            const half = node.width / 2;
            node.topLeft = new Node(node.x1, node.y1, node.x2 - half, node.y2-half, half);
            node.topRight = new Node(node.x1 + half, node.y1, node.x2, node.y2 - half, half);
            node.bottomLeft = new Node(node.x1, node.y1 + half, node.x2-half, node.y2, half);
            node.bottomRight = new Node(node.x1 + half, node.y1 + half, node.x2, node.y2, half);
        }
    }

    cloneWithUpdatedRoot(newRoot) {
        const newTree = new QuadTree(newRoot.x1, newRoot.y1, newRoot.x2, newRoot.y2, newRoot.width);
        newTree.root = newRoot; 
        return newTree;
    }
}
export { Node, QuadTree };
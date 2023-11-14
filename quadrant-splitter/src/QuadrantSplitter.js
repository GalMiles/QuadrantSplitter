import React from 'react';
import { QuadTree } from './QuadTree';
import { useState } from 'react';

function QuadrantSplitter() {
    const initialTree = new QuadTree(0,0, 400, 400, 400);
    const [quadTree, setQuadTree] = useState(initialTree);

    const handleQuadrantClick = (e, node) => {
        e.stopPropagation();
        quadTree.split(node, e.clientX, e.clientY);
        const updatedTree = quadTree.cloneWithUpdatedRoot(quadTree.root);
        setQuadTree(updatedTree);
    };

    const renderQuadrants = (node) => {
        if (!node) return null;

        const style = {
            position: 'fixed',
            left: `${node.x1}px`,
            top: `${node.y1}px`,
            width: `${node.width}px`,
            height: `${node.width}px`,
            backgroundColor: `${node.color}`,
        };
        return (
            <div style={style} onClick={(e) => handleQuadrantClick(e, node)}>
                {node.isLeaf() ? null : (
                    <>
                        {renderQuadrants(node.topLeft)}
                        {renderQuadrants(node.topRight)}
                        {renderQuadrants(node.bottomLeft)}
                        {renderQuadrants(node.bottomRight)}
                    </>
                )}
            </div>
        );
    };

    return (
        <div>
            {renderQuadrants(quadTree.root)}
        </div>
    );
}

export default QuadrantSplitter;
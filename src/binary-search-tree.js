const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    const newNode = new Node(data);
    this._root === null ? this._root = newNode : this._addNode(this._root, newNode);
  }

  _addNode(node, newNode) {
    if (newNode.data < node.data) node.left === null ? node.left = newNode : this._addNode(node.left, newNode);
    else node.right === null ? node.right = newNode : this._addNode(node.right, newNode);
  }

  has(data) {
    return this._findNode(data) !== null;
  }

  find(data) {
    return this._findNode(data);
  }

  _findNode(data) {
    let currentNode = this._root;
    
    while (currentNode !== null) {
      if (data === currentNode.data) return currentNode;
      else if (data < currentNode.data) currentNode = currentNode.left;
      else currentNode = currentNode.right;
    }

    return null;
  }

  remove(data) {
    this._root = this._removeNode(this._root, data);
  }

  _removeNode(node, data) {
    if (node === null) return null;

    if (data < node.data) node.left = this._removeNode(node.left, data);
    else if (data > node.data) node.right = this._removeNode(node.right, data);
    else {
      if (node.left === null && node.right === null) return null;
      if (node.left === null) return node.right;
      else if (node.right === null) return node.left;

      const minRightNode = this._findMinNode(node.right);
      node.data = minRightNode.data;
      node.right = this._removeNode(node.right, minRightNode.data);
    }

    return node;
  }

  _findMinNode(node) {
    while (node.left !== null) node = node.left;
    
    return node;
  }

  min() {
    let currentNode = this._root;

    while (currentNode !== null && currentNode.left !== null) currentNode = currentNode.left;

    return currentNode ? currentNode.data : null;
  }

  max() {
    let currentNode = this._root;

    while (currentNode !== null && currentNode.right !== null) currentNode = currentNode.right;

    return currentNode ? currentNode.data : null;
  }
}

module.exports = {
  BinarySearchTree
};
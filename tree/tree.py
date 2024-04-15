from sklearn import datasets
from sklearn.model_selection import train_test_split
import numpy as np 
import pandas as pd

X, y = datasets.make_classification()
X_train, X_test, y_train, y_test = train_test_split(X, y)

class Node:
    def __init__(self, feature=None, threshold=None, left=None, right=None, *, value=None):
        self.feature = feature
        self.threshold = threshold
        self.left = left
        self.right = right
        self.value = value
    def is_leaf_node(self):
        return self.value is not None
    
class DecisionTree:
    def __init__(self, max_depth=100, min_samples=10):
        self.max_depth = max_depth
        self.min_samples = min_samples
        self.tree = None

    def fit(self, X, y):
        self.tree = self.grow_tree(X, y)

    def predict(self, X):
        return np.array([self.travers_tree(x, self.tree) for x in X])
    
    def entropy(self, y):
        hist = np.bincount(y)
        ps = hist / len(y)
        entr = -np.sum([p * np.log2(p) for p in ps if p > 0])
        gin = np.sum([p * (1 - p) for p in ps])
        return entr
    
    def most_common(self, y):
        labels = np.unique(y)
        count = [list(y).count(i) for i in labels]
        return labels[np.argmax(count)]

    def best_split(self, X, y):
        best_feature, best_threshold = None, None
        best_gain = -1

        for i in range(X.shape[1]):
            thresholds = np.unique(X[:, i])
            for threshold in thresholds:
                gain = self.information_gain(X[:, i], y, threshold)
                if gain > best_gain:
                    best_gain = gain
                    best_feature = i
                    best_threshold = threshold
            return best_feature, best_threshold

    def information_gain(self, X_column, y, threshold):
        if len(np.unique(y)) == 1: return 0

        n = len(y)
        parent = self.entropy(y)

        left_indexes = np.argwhere(X_column <= threshold).flatten()
        right_indexes = np.argwhere(X_column > threshold).flatten()

        e_l, n_l = self.entropy(y[left_indexes]), len(left_indexes)
        e_r, n_r = self.entropy(y[right_indexes]), len(right_indexes)

        child = (n_l / n) * e_l + (n_r / n) * e_r
        return parent - child

    def grow_tree(self, X, y, depth=0):
        n_samples = len(y)
        n_labels = len(np.unique(y))

        if n_labels == 1 or depth >= self.max_depth or n_samples <= self.min_samples:
            return Node(value=self.most_common(y))
        
        best_feature, best_threshold = self.best_split(X, y)

        left_indexes = np.argwhere(X[:, best_feature] <= best_threshold).flatten()
        right_indexes = np.argwhere(X[:, best_feature] > best_threshold).flatten()

        left = self.grow_tree(X[left_indexes, :], y[left_indexes], depth+1)
        right = self.grow_tree(X[right_indexes, :], y[right_indexes], depth+1)

        return Node(best_feature, best_threshold, left, right)
    
    def travers_tree(self, x, tree):
        if tree.is_leaf_node():
            return tree.value
        if x[tree.feature] < tree.threshold:
            return self.travers_tree(x, tree.left)
        return self.travers_tree(x, tree.right)
        
pima = pd.read_csv("diabetes.csv")
pima.head()
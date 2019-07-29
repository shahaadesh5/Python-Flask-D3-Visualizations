import json

from flask import Flask, render_template, request, jsonify
import pandas as pd
import csv
from flask_cors import CORS, cross_origin # To avoid CORS issues
from sklearn.cluster import KMeans # for performing K Means clustering
import numpy as np

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

#name of the datasets
datasets = [
    {
        'name': 'Iris',
    },
    {
        'name': 'Red Wine Quality',
    }
]


df = pd.read_csv('iris.csv')

@app.route('/datasetlist', methods=['GET'])
@cross_origin()
def get_datasets():
    return jsonify(datasets)

@app.route('/dataset', methods=['GET'])
@cross_origin()
def load_dataset():
    datasetname = request.args.get('name')
    if datasetname == 'Iris':
        df = pd.read_csv('iris.csv')
        data = df.to_json(orient="records")
        return data
    elif datasetname == 'Red Wine Quality':
        df = pd.read_csv('winequality-red.csv')
        data = df.to_json(orient="records")
        return data
    else:
        return "Dataset not found!"


@app.route("/",methods = ['GET'])
@cross_origin()
def index():
    global df
    data = df.to_json(orient="records")
    return data

@app.route("/kmeans",methods = ['GET'])
@cross_origin()
def kmeans():
    datasetname = request.args.get('name')
    count = request.args.get('count')
    count = int(count)
    if datasetname == 'Iris':
        df = pd.read_csv('iris.csv')
        df = pd.get_dummies(df, columns=['Class'], prefix=['Class'])
        clusters = clusteringKMeans(df, count)
        return clusters
    elif datasetname == 'Red Wine Quality':
        df = pd.read_csv('winequality-red.csv')
        kmeans = KMeans(n_clusters=count)
        kmeans.fit(df)
        labels = kmeans.labels_
        cluster_arr = np.array(labels)
        df['labels']=cluster_arr
        cluster = df.to_json(orient="records")
        return cluster
    else:
        return "Dataset not found!"
    
def clusteringKMeans(df, count):
    kmeans = KMeans(n_clusters=count)
    kmeans.fit(df)
    labels = kmeans.labels_
    cluster_arr = np.array(labels)
    df['labels']=cluster_arr
    cluster = df.to_json(orient="records")
    return cluster

if __name__ == "__main__":
    app.run(debug=True)

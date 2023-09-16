from sentence_transformers import SentenceTransformer, util
#import umap
from sklearn.decomposition import PCA
import numpy
from sklearn.preprocessing import StandardScaler
from sklearn.preprocessing import MinMaxScaler
from mpl_toolkits.mplot3d import Axes3D
import matplotlib.pyplot as plt



def returnEmbedding(sentence):
    model = SentenceTransformer('all-MiniLM-L6-v2')
    embedding = model.encode(sentence)
    return embedding

def reduceDimensions(embeddings):
    output_dimension = 3
    pca = PCA(n_components=output_dimension)
    reduced_embedding = pca.fit_transform(embeddings)
    print(reduced_embedding)
    fig = plt.figure()
    ax = fig.add_subplot(111, projection='3d')
    ax.scatter(reduced_embedding[:, 0], reduced_embedding[:, 1], reduced_embedding[:, 2])
    ax.set_xlabel('Principal Component 1')
    ax.set_ylabel('Principal Component 2')
    ax.set_zlabel('Principal Component 3')
    plt.title('PCA Reduced Data (3D)')
    plt.show()

originalEmbedding = returnEmbedding(['I love Mathematics.',
                                     'I love Mathematics.',
                                     'I drink my sorrows away.',
                                     'Drugs are cool.'])
x = numpy.random.rand(100, 384)  # 100 samples, 384 dimensions
reducedEmbedding = reduceDimensions(originalEmbedding)
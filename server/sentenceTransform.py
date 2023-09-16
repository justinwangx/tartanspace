from sentence_transformers import SentenceTransformer, util
#import umap
from sklearn.decomposition import PCA
import numpy
from sklearn.preprocessing import StandardScaler
from sklearn.preprocessing import MinMaxScaler

def returnEmbedding(sentence):
    model = SentenceTransformer('all-MiniLM-L6-v2')
    embedding = model.encode(sentence)
    #print(embedding.shape)
    return embedding

def reduceDimensions(embeddings):
    output_dimension = 3
    pca = PCA(n_components=output_dimension)
    reduced_embedding = pca.fit_transform(embeddings)
    print(reduced_embedding)
    return reduced_embedding

originalEmbedding = returnEmbedding('I am Jason.')
x = numpy.random.rand(100, 384)  # 100 samples, 384 dimensions
reducedEmbedding = reduceDimensions(x)
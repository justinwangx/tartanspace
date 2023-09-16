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

def reduceDimensions(embedding):
    #print(embedding)
    #print(embedding.reshape(1,-1))

    #scaling the data (not sure if this helps, GPT says it helps )
    scaler = StandardScaler()
    scaled_embedding = scaler.fit_transform(embedding.reshape(-1,1)).reshape(384,)
    #print(scaled_embedding)

    # Define the desired output dimension (e.g., reduce to 128 dimensions)
    #stacking 3 embeddings because PCA requires number of samples to be at least equal to number of components(i.e. 3)
    embeddings = numpy.array([scaled_embedding, scaled_embedding, scaled_embedding])
    output_dimension = 3
    pca = PCA(n_components=output_dimension)
    reduced_embedding = pca.fit_transform(embeddings)
    print(reduced_embedding)
    return reduced_embedding

originalEmbedding = returnEmbedding('I am Jason.')
reducedEmbedding = reduceDimensions(originalEmbedding)
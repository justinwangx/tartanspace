from sentence_transformers import SentenceTransformer, util
#import umap
from sklearn.decomposition import PCA

def returnEmbedding(sentence):
    model = SentenceTransformer('all-MiniLM-L6-v2')
    embedding = model.encode(sentence)
    #print(embedding.shape)
    return embedding

def reduceDimensions(embedding):
    # Define the desired output dimension (e.g., reduce to 128 dimensions)
    output_dimension = 3
    print(embedding.shape)
    # Initialize and fit PCA to reduce dimensionality
    pca = PCA(n_components=output_dimension)
    reduced_embedding = pca.fit_transform(embedding.reshape(384,1))
    print(reduced_embedding)
    return reduced_embedding

originalEmbedding = returnEmbedding('I am Jason.')
reducedEmbedding = reduceDimensions(originalEmbedding)

# similarity_score_model1_01 = util.pytorch_cos_sim(embeddings_1[0], embeddings_1[1])
# similarity_score_model1_02 = util.pytorch_cos_sim(embeddings_1[0], embeddings_1[2])
# similarity_score_model1_03 = util.pytorch_cos_sim(embeddings_1[0], embeddings_1[3])
# similarity_score_model1_12 = util.pytorch_cos_sim(embeddings_1[1], embeddings_1[2])
# similarity_score_model1_13 = util.pytorch_cos_sim(embeddings_1[1], embeddings_1[3])
# similarity_score_model1_23 = util.pytorch_cos_sim(embeddings_1[2], embeddings_1[3])
# print(f"Similarity score for Model 1 between 0 and 1: {similarity_score_model1_01.item()}")
# print(f"Similarity score for Model 1 between 0 and 2: {similarity_score_model1_02.item()}")
# print(f"Similarity score for Model 1 between 0 and 3: {similarity_score_model1_03.item()}")
# print(f"Similarity score for Model 1 between 1 and 2: {similarity_score_model1_12.item()}")
# print(f"Similarity score for Model 1 between 1 and 3: {similarity_score_model1_13.item()}")
# print(f"Similarity score for Model 1 between 2 and 3: {similarity_score_model1_23.item()}")

# print("--- %s seconds ---" % (time.time() - start_time))


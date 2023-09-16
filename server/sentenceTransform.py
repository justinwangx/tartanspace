from sentence_transformers import SentenceTransformer, util
#import umap
from sklearn.decomposition import PCA
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.preprocessing import MinMaxScaler
from mpl_toolkits.mplot3d import Axes3D
import matplotlib.pyplot as plt



def returnEmbedding(group_sentences):
    model = SentenceTransformer('all-MiniLM-L6-v2')
    group_embeddings = [model.encode(group) for group in group_sentences]
    mean_embeddings = np.mean(group_embeddings, axis=0)
    return mean_embeddings

def reduceDimensions(embeddings):
    output_dimension = 3
    pca = PCA(n_components=output_dimension)
    reduced_embedding = pca.fit_transform(embeddings)
    return reduced_embedding
    
if __name__ == "__main__":
    # Open the file in read mode ('r')
    # Read the content of the text file
    with open('samplePersons.txt', 'r') as file:
        lines = file.readlines()

    # Process the content into a nested list
    interests_data = []
    current_person = []

    for line in lines:
        line = line.strip()  # Remove trailing newline characters
        current_person.append(line)
        
        if len(current_person) == 10:  # Each person has 10 sentences
            interests_data.append(current_person)
            current_person = []  # Reset for the next person

    # Now, 'nested_list' contains the data as a nested list


    embedding_list = np.empty((0, 384))  # Assuming you want to append arrays of shape (384,)

    for person in interests_data:
        embedding = returnEmbedding(person)
        #print(embedding.shape)
        embedding_list = np.vstack((embedding_list, embedding))  # Append the embedding as a new row
        #print(embedding_list.shape)
    print(embedding_list.shape)
    # Reduce dimensions using PCA
    reduced_embeddings = reduceDimensions(embedding_list)

    # print(reducedEmbedding)

    #plotting 3D representation of the embedding vectors
    fig = plt.figure()
    ax = fig.add_subplot(111, projection='3d')
    ax.scatter(reduced_embeddings[:, 0], reduced_embeddings[:, 1], reduced_embeddings[:, 2])
    ax.set_xlabel('Principal Component 1')
    ax.set_ylabel('Principal Component 2')
    ax.set_zlabel('Principal Component 3')
    plt.title('PCA Reduced Data (3D)')
    plt.show()


    # # reducedEmbedding = reduceDimensions(originalEmbedding)

    # # Split sentences into groups of 7
    # grouped_sentences = [sentences[i:i+7] for i in range(0, len(sentences), 7)]

    # # Calculate embeddings for each group
    # group_embeddings = [returnEmbedding(group) for group in grouped_sentences]

    # # Calculate the mean embedding for each group
    # mean_embeddings = [np.mean(group, axis=0) for group in group_embeddings]

    # # Reduce dimensions using PCA
    # reduced_embeddings = reduceDimensions(mean_embeddings)

    # # print(reducedEmbedding)
    # fig = plt.figure()
    # ax = fig.add_subplot(111, projection='3d')
    # ax.scatter(reduced_embeddings[:, 0], reduced_embeddings[:, 1], reduced_embeddings[:, 2])
    # ax.set_xlabel('Principal Component 1')
    # ax.set_ylabel('Principal Component 2')
    # ax.set_zlabel('Principal Component 3')
    # plt.title('PCA Reduced Data (3D)')
    # plt.show()
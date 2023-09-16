import numpy as np
from sentence_transformers import SentenceTransformer, util

from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
from sklearn.preprocessing import MinMaxScaler

# from mpl_toolkits.mplot3d import Axes3D
# import matplotlib.pyplot as plt

def get_embedding(sentences: list):
    model = SentenceTransformer('all-MiniLM-L6-v2')
    embeddings = model.encode(sentences)
    mean_embedding = np.mean(embeddings, axis=0)
    return mean_embedding

def reduce_dimensions(embeddings, dim=3):
    pca = PCA(n_components=dim)
    reduced_embedding = pca.fit_transform(embeddings)
    return reduced_embedding

def test_on_fake_data():
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
        embedding = get_embedding(person)
        #print(embedding.shape)
        embedding_list = np.vstack((embedding_list, embedding))  # Append the embedding as a new row
        #print(embedding_list.shape)
    print(embedding_list.shape)
    # Reduce dimensions using PCA
    reduced_embeddings = reduce_dimensions(embedding_list)

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
    
if __name__ == "__main__":
   test_on_fake_data() 
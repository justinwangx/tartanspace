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
    sentences = ['I love Mathematics.',
                                        'I love Mathematics.',
                                        'I drink my sorrows away.',
                                        'Drugs are cool.',
                                        'I love Mathematics.',
                                        'I adore Mathematics.',
                                        'I enjoy studying Mathematics.',
                                        'Mathematics is my passion.',
                                        'I hate Mathematics.']
    embedding = returnEmbedding(sentences)
    print(embedding.shape)
    # sentences = (['I love Mathematics.',
    #                                     'I love Mathematics.',
    #                                     'I drink my sorrows away.',
    #                                     'Drugs are cool.',
    #                                     'I love Mathematics.',
    #                                     'I adore Mathematics.',
    #                                     'I enjoy studying Mathematics.',
    #                                     'Mathematics is my passion.',
    #                                     'I hate Mathematics.',
    #                                     'I dislike Mathematics.',
    #                                     'I loathe Mathematics.',
    #                                     'I can\'t stand Mathematics.',
    #                                     'I drink coffee every morning.',
    #                                     'I start my day with a cup of coffee.',
    #                                     'Coffee is my morning ritual.',
    #                                     'I love tea.',
    #                                     'I enjoy a good cup of tea.',
    #                                     'Tea helps me relax.',
    #                                     'Tea is my favorite beverage.',
    #                                     'I play soccer on weekends.',
    #                                     'I\'m a big fan of tennis.',
    #                                     'Basketball is my favorite sport.',
    #                                     'I enjoy going to the gym.',
    #                                     'I\'m a runner and participate in marathons.',
    #                                     'I follow the NBA closely.',
    #                                     'I watch Formula 1 races regularly.',
    #                                     'I\'m passionate about physics.',
    #                                     'I\'m a computer science major.',
    #                                     'I\'m studying artificial intelligence.',
    #                                     'I excel in mathematics.',
    #                                     'I\'m a history buff.',
    #                                     'I love reading novels in my free time.',
    #                                     'I collect vintage stamps.',
    #                                     'Painting is my creative outlet.',
    #                                     'I\'m an avid gardener.',
    #                                     'I\'m a chess enthusiast.',
    #                                     'I participate in local chess tournaments.',
    #                                     'I enjoy hiking in the mountains.',
    #                                     'Camping is a great way to connect with nature.',
    #                                     'I\'m a birdwatcher and have a vast collection of bird photos.',
    #                                     'I love stargazing and have a telescope.',
    #                                     'I\'m a vegetarian and advocate for animal rights.',
    #                                     'I volunteer at a local animal shelter.',
    #                                     'I\'m a foodie and enjoy trying new cuisines.',
    #                                     'I\'m a wine connoisseur and enjoy wine tasting.',
    #                                     'I\'m a professional chef and own a restaurant.',
    #                                     'I\'m a coffee enthusiast and roast my own beans.',
    #                                     'I\'m a tea sommelier and host tea tasting events.',
    #                                     'I\'m a fashion designer and have my own clothing line.',
    #                                     'I\'m an interior decorator and specialize in minimalist design.',
    #                                     'I\'m a photographer and focus on capturing landscapes.',
    #                                     'I\'m a wildlife photographer and have been published in magazines.',
    #                                     'I\'m a DJ and perform at local clubs.',
    #                                     'I\'m a classically trained pianist.',
    #                                     'I\'m a rock guitarist and play in a band.',
    #                                     'I\'m a songwriter and have released my own music.',
    #                                     'I\'m a comic book collector and have a rare collection.',
    #                                     'I\'m a tabletop RPG enthusiast and host game nights.',
    #                                     'I\'m a competitive video gamer and participate in eSports tournaments.',
    #                                     'I\'m a streamer and have a large online following.',
    #                                     'I\'m a programmer and develop mobile apps.',
    #                                     'I\'m a cybersecurity expert and work in IT.',
    #                                     'I\'m a data scientist and analyze big data for insights.',
    #                                     'I\'m a writer and have published several novels.',
    #                                     'I\'m a poet and perform spoken word poetry.',
    #                                     'I\'m a language enthusiast and speak five languages fluently.',
    #                                     'I\'m a travel blogger and document my adventures.',
    #                                     'I\'m an environmentalist and organize clean-up campaigns.',
    #                                     'I\'m a motivational speaker and inspire others.',
    #                                     'I\'m a magician and perform at children\'s parties.',
    #                                     'I\'m a stand-up comedian and make people laugh.',
    #                                     'I\'m a pilot and fly small planes as a hobby.',
    #                                     'I\'m a scuba diver and explore underwater worlds.',
    #                                     'I\'m a surfer and ride big waves.',
    #                                     'I\'m a snowboarder and enjoy winter sports.',
    #                                     'I\'m a rock climber and tackle challenging peaks.',
    #                                     'I\'m a yoga instructor and promote wellness.',
    #                                     'I\'m a meditation guru and teach mindfulness techniques.',
    #                                     'I\'m a philanthropist and donate to various charities.',
    #                                     'I\'m an entrepreneur and have started multiple businesses.',
    #                                     'I\'m a real estate mogul and invest in properties.',
    #                                     'I\'m a stock trader and follow the financial markets closely.',
    #                                     'I\'m a cryptocurrency enthusiast and mine Bitcoin.',
    #                                     'I\'m a chess grandmaster and coach aspiring players.',
    #                                     'I\'m a science fiction writer and create futuristic worlds.',
    #                                     'I\'m a historian and research ancient civilizations.',
    #                                     'I\'m an archaeologist and excavate historical sites.',
    #                                     'I\'m a paleontologist and study dinosaur fossils.',
    #                                     'I\'m an astronomer and discover new celestial objects.',
    #                                     'I\'m a physicist and work on cutting-edge theories.',
    #                                     'I\'m a neuroscientist and investigate brain functions.',
    #                                     'I\'m a biologist and study ecosystems in remote locations.',
    #                                     'I\'m a marine biologist and explore the depths of the ocean.',
    #                                     'I\'m an astronaut and have been to space.',
    #                                     'I\'m a cosmonaut and trained in Russia.',
    #                                     'I\'m an artist and create abstract paintings.',
    #                                     'I\'m a sculptor and work with various materials.',
    #                                     'I\'m a glassblower and craft intricate glass art.',
    #                                     'I\'m a potter and make unique ceramic pottery.',
    #                                     'I\'m a street artist and create murals in the city.',
    #                                     'I\'m a graffiti artist and leave my mark on urban landscapes.',
    #                                     'I\'m a tattoo artist and design custom tattoos.',
    #                                     'I\'m a body painter and participate in art festivals.'

    #                                      ])
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
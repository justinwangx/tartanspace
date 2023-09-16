from embed_and_reduce import get_embedding
from db import save_document

def generate_and_save(first_name, last_name, sentences: list):
    embedding = get_embedding(sentences)
    data_dict = {
        "first_name": first_name,
        "last_name": last_name,
        "embedding": embedding.tolist(),
    }
    save_document(data_dict)

def main():
    # Example format:
    # generate_and_save("John", "Doe", ["I like dogs", "I like cats"])
    # generate_and_save("Amy", "Salazar", ["Sheesh bro that's crazy", "Let's go golfing!"])

if __name__ == "__main__":
    main()
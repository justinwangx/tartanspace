from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()
db_username = os.getenv("MONGODB_USERNAME")
db_password = os.getenv("MONGODB_PASSWORD")

# Replace the placeholder data with your Atlas connection string
client = MongoClient(f"mongodb+srv://{db_username}:{db_password}@cluster0.iwabec8.mongodb.net/?retryWrites=true&w=majority")

# Perform a basic operation to check connectivity
db = client.get_database('hackcmu')
collection = db['dev']
count = collection.count_documents({})
print(f"The collection has {count} documents.")
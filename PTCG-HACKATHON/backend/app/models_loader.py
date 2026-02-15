import os
import joblib
from sentence_transformers import SentenceTransformer

# Load models once on startup
MODELS_DIR = os.path.join(os.path.dirname(__file__), "models")
os.makedirs(MODELS_DIR, exist_ok=True)

# Shared embedding model for clustering and similarity tasks
# We use a lightweight model for better performance with large datasets
embedding_model = SentenceTransformer('all-MiniLM-L6-v2')

def get_embedding_model():
    return embedding_model

def load_prediction_model(model_name="routing_model.joblib"):
    model_path = os.path.join(MODELS_DIR, model_name)
    if os.path.exists(model_path):
        return joblib.load(model_path)
    return None

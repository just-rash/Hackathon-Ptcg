
# from fastapi import FastAPI, UploadFile, File
# from app.pipeline import process_uploaded_dataset
# import pandas as pd

# app = FastAPI()

# @app.post("/upload-dataset")
# async def upload_dataset(file: UploadFile = File(...)):

#     df = pd.read_csv(file.file)
#     result = process_uploaded_dataset(df)

#     return result
import io
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from app.pipeline import process_uploaded_dataset

app = FastAPI()

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # for testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload-dataset")
async def upload_dataset(file: UploadFile = File(...)):
    contents = await file.read()
    try:
        # Use utf-8-sig to handle files with/without BOM correctly
        df = pd.read_csv(io.StringIO(contents.decode("utf-8-sig")))
    except UnicodeDecodeError:
        # Fallback to latin-1 if utf-8 fails
        df = pd.read_csv(io.StringIO(contents.decode("latin-1")))
    
    # Strip whitespace from all headers immediately
    df.columns = [col.strip() for col in df.columns]

    result = process_uploaded_dataset(df)

    return result

from google import  genai

from app.core.config import GEMINI_API_KEY
from app.db.chroma_client import collection

client = genai.Client(api_key=GEMINI_API_KEY)

# converts texts to numbers->vectors
# def get_embedding(text: str):
#     response = client.models.embed_content(
#         model="models/gemini-embedding-2-preview",
#         contents=text
#     )
#     return response.embeddings[0].values

# converts texts to numbers->vectors -- made it efficient by batching ---
def get_embedding_batch(text: list[str]):
    response = client.models.embed_content(
        model="models/gemini-embedding-2-preview",
        contents=text
    )
    return [emb.values for emb in response.embeddings]

# single embedding (needed for query)
def get_embedding(text: str):
    return get_embedding_batch([text])[0]


# looping through the chunks (chunks = small part of the PDFs)
def store_chunks(chunks, session_id):

    # for i, chunk in enumerate(chunks):
    #     # convert chunks to embedding
    #     embedding = get_embedding(chunk)
    #
    #     collection.add(
    #         documents=[chunk],
    #         embeddings=[embedding],
    #         ids=[f"chunk_{i}"]
    #     )

    # get all batch embedding in one call --
    embeddings = get_embedding_batch(chunks)
    # for i, (chunk, embedding) in enumerate(zip(chunks, embeddings)):
    #     collection.add(
    #         documents=[chunk],
    #         embeddings=[embedding],
    #         ids=[f"{session_id}_chunk_{i}"],
    #         metadatas=[{"session_id": session_id}]
    #     )

    # better than above one ---
    collection.add(
        documents=chunks,
        embeddings=embeddings,
        ids=[f"{session_id}_chunk_{i}" for i in range(len(chunks))],
        metadatas=[{"session_id": session_id} for _ in chunks]
    )

# validating query ---
def query_chunks(question: str, session_id: str):
    # converts question string to embedding
    query_embedding = get_embedding(question)

    # finds the top 3 result
    results = collection.query(
        query_embeddings = [query_embedding],
        n_results = 5,
        where={"session_id": session_id}
    )
    docs = results["documents"][0]
    if not docs or not docs[0]:
        return []
    return docs[0]


# generating answers ----
def generate_answer(question: str, context_chunks: list):
    context = "\n\n".join(context_chunks)

    # only answer to the questions with the particular context --
    prompt = f"""
    You are a helpful assistant.

    Answer the question ONLY from the provided context.
    If the answer is not in the context, say:
    "I could not find the answer in the document."
    
    Context: {context}
    
    Question: {question}
    """

    response = client.models.generate_content(
        model="models/gemini-2.5-flash",
        contents=prompt,
    )

    return response.text

# ask question
def ask_question(question: str, session_id: str):
    chunks = query_chunks(question, session_id)
    answer = generate_answer(question, chunks)

    return {
        "answer" : answer,
        "context": chunks
    }
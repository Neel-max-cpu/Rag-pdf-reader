def chunk_text(text:str, chunk_size=500, overlap=100):
    chunks = []
    start = 0

    while start < len(text):
        # chunk1: 0–500
        # chunk2: 400–900
        # chunk3: 800–1300

        end = start + chunk_size
        chunk = text[start:end]
        chunks.append(chunk)
        start += chunk_size - overlap

    return chunks
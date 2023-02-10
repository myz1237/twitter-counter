import pandas as pd

chunk_size = 100000

with open("result.csv", "r") as f:
    
    header = next(f)
    
    chunks = []
    
    # Read the file in chunks
    for chunk in pd.read_csv(f, chunksize=chunk_size, error_bad_lines=False):
        
        # Remove the first column
        chunk.drop(chunk.columns[0], axis=1, inplace=True)
        
        # Append the chunk to the list
        chunks.append(chunk)
        
# Concatenate the chunks into a single DataFrame
df = pd.concat(chunks)

# Remove duplicates
df.drop_duplicates(inplace=True)

# Save the modified DataFrame to a new CSV file
df.to_csv("file_modified.csv", index=False)

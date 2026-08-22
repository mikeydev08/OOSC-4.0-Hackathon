import os
from dotenv import load_dotenv
from google import genai

# This forces Python to read your .env file
load_dotenv() 

# Now it can safely grab the key we hid in the .env file!
api_key = os.environ.get("GEMINI_API_KEY")

try:
    client = genai.Client(api_key=api_key)
    print("Sending ping to Gemini...")
    
    # Using the updated model to prevent the 400 error!
    response = client.models.generate_content(
        model='gemini-3.5-flash', 
        contents="Reply with the exact phrase: 'Connection successful. I am ready to process the Science PDFs!'"
    )
    
    print("\n--- AI Response ---")
    print(response.text)
    print("-------------------\n")
    print("Test passed! You are ready to load the raw files.")

except Exception as e:
    print(f"Test failed. Error details: {e}")
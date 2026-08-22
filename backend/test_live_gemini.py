import os
from dotenv import load_dotenv
load_dotenv()

key = os.environ.get("GEMINI_API_KEY")
print(f"Key loaded: '{key}' (length {len(key) if key else 0})")

try:
    from google import genai
    client = genai.Client(api_key=key)
    res = client.models.generate_content(
        model="gemini-1.5-flash",
        contents="Say hello!"
    )
    print("SUCCESS calling Gemini via google-genai:")
    print(res.text)
except Exception as e:
    print(f"FAILED google-genai: {e}")

    try:
        from langchain_google_genai import ChatGoogleGenerativeAI
        llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", google_api_key=key)
        res = llm.invoke("Say hello!")
        print("SUCCESS calling ChatGoogleGenerativeAI:")
        print(res.content)
    except Exception as e2:
        print(f"FAILED langchain_google_genai: {e2}")

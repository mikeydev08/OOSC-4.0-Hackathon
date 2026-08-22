import os
from dotenv import load_dotenv
load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

from google import genai
from google.genai import types

gemini_key = os.environ.get("GEMINI_API_KEY")
print("Key available:", bool(gemini_key))

client = genai.Client(api_key=gemini_key)

with open("frontend/public/sample_math_tests/calculus_integration_error.jpg", "rb") as f:
    img_data = f.read()

part = types.Part.from_bytes(data=img_data, mime_type="image/jpeg")

try:
    res = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=[part, "Transcribe exactly what is handwritten on this page and what mistake is made."]
    )
    print("SUCCESSFUL GEMINI IMAGE ANALYSIS:\n", res.text)
except Exception as e:
    print("FAILED:", e)

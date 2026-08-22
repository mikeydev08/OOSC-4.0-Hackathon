"""
Test suite for LangGraph Corrective RAG Socratic AI Tutor backend with Intent Classification & Live Gemini API.
"""
import sys
import os

# Ensure backend package import path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from backend.agent import corrective_rag_app

def run_tests():
    print("=================== TEST 1: CONCEPTUAL INQUIRY (CONVEX LENS BETWEEN OBJECT & SCREEN) ===================")
    state1 = {
        "user_message": "What if a convex lens is placed between an object and a screen?",
        "retry_count": 0,
        "trace_logs": []
    }
    res1 = corrective_rag_app.invoke(state1)
    print(f"Intent Type: {res1.get('intent_type')}")
    print(f"Conceptual Error: {res1.get('conceptual_error')}")
    print(f"Target Chapter: {res1.get('target_chapter')}")
    print(f"Socratic Response:\n{res1.get('socratic_response')}")
    print("-------------------------------------------------------------------------")
    
    assert res1.get("intent_type") == "conceptual_inquiry", "Must classify as conceptual_inquiry!"
    assert res1.get("conceptual_error") is None, "Must not fabricate an error for exploratory inquiry!"
    assert "?" in res1["socratic_response"], "Must contain a Socratic question mark!"
    assert "(Ref: NCERT Chapter" in res1["socratic_response"], "Must contain NCERT citation!"
    print("Test 1 Passed successfully!")

    print("\n=================== TEST 2: PROBLEM ATTEMPT SUBMISSION ===================")
    state2 = {
        "user_message": "A student calculated magnification of a convex lens using m = -v/u with v = +20cm and u = -10cm.",
        "retry_count": 0,
        "trace_logs": []
    }
    res2 = corrective_rag_app.invoke(state2)
    print(f"Intent Type: {res2.get('intent_type')}")
    print(f"Conceptual Error: {res2.get('conceptual_error')}")
    print(f"Socratic Response:\n{res2.get('socratic_response')}")
    print("-------------------------------------------------------------------------")

    assert res2.get("intent_type") == "problem_submission", "Must classify as problem_submission!"
    assert res2.get("conceptual_error") is not None, "Must identify conceptual mistake!"
    assert "?" in res2["socratic_response"], "Must contain a Socratic question mark!"
    print("Test 2 Passed successfully!")

    print("\n=================== TEST 3: OUT-OF-SCOPE FALLBACK ===================")
    state3 = {
        "user_message": "Calculate quantum wave function schrodinger equation for double slit.",
        "preset_id": "unknown_out_of_scope",
        "retry_count": 0,
        "trace_logs": []
    }
    res3 = corrective_rag_app.invoke(state3)
    print(f"Is Context Valid: {res3.get('is_valid')}")
    print(f"Retries: {res3.get('retry_count')}")
    print(f"Fallback Response:\n{res3.get('socratic_response')}")
    print("-------------------------------------------------------------------------")

    assert res3["socratic_response"] == "I couldn't find this specific concept in your current textbook chapters. Could you clarify your drawing?", "Fallback string mismatch!"
    print("Test 3 Passed successfully!")

if __name__ == "__main__":
    run_tests()

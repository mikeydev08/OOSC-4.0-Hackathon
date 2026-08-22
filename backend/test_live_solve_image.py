import requests
import json

url = "http://127.0.0.1:8000/api/tutor/solve"
file_path = "frontend/public/sample_math_tests/calculus_integration_error.jpg"

with open(file_path, "rb") as f:
    files = {"file": ("calculus_integration_error.jpg", f, "image/jpeg")}
    data = {
        "student_name": "Aarav Sharma",
        "class_grade": "Class 12",
        "subject_name": "Mathematics",
        "submission_source": "Uploaded Assignment (PDF/Image)"
    }
    res = requests.post(url, data=data, files=files)
    print("STATUS CODE:", res.status_code)
    json_data = res.json()
    with open("backend/last_image_solve_result.json", "w", encoding="utf-8") as out:
        json.dump(json_data, out, indent=2, ensure_ascii=False)
    print("Saved response to backend/last_image_solve_result.json")

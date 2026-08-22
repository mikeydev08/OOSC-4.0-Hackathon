"""
Pre-populated High-Speed NCERT Class 10 Physics MCQ Question Bank for instant <50ms quiz generation.
Supports background dynamic generation via Gemini AI.
"""
import random
from typing import Dict, Any, List

NCERT_MCQ_BANK: List[Dict[str, Any]] = [
    {
        "chapter_name": "Light - Reflection and Refraction",
        "topic": "Spherical Mirrors & Sign Convention",
        "question": "A concave mirror has a focal length of 15 cm. According to the New Cartesian Sign Convention, what value should be substituted for f in the mirror formula?",
        "options": ["+15 cm", "-15 cm", "+30 cm", "-30 cm"],
        "correct_option": "-15 cm",
        "conceptual_error": "Substituted positive focal length (+15 cm) for a concave mirror instead of negative (-15 cm).",
        "socratic_explanation": "What sign does the Cartesian Sign Convention assign to distances measured in front of a concave mirror?"
    },
    {
        "chapter_name": "Light - Reflection and Refraction",
        "topic": "Lens Formula & Magnification",
        "question": "What is the correct magnification (m) formula for a spherical convex lens in terms of image distance (v) and object distance (u)?",
        "options": ["m = -v / u", "m = +v / u", "m = -u / v", "m = f / (v - u)"],
        "correct_option": "m = +v / u",
        "conceptual_error": "Used spherical mirror magnification formula (m = -v/u) for a lens instead of m = +v/u.",
        "socratic_explanation": "How does the magnification formula sign differ between spherical lenses (m = +v/u) and spherical mirrors (m = -v/u)?"
    },
    {
        "chapter_name": "Light - Reflection and Refraction",
        "topic": "Refractive Index & Speed of Light",
        "question": "Light enters from air into a glass plate having refractive index 1.50. If the speed of light in vacuum is 3 × 10^8 m/s, what is the speed of light in glass?",
        "options": ["3.0 × 10^8 m/s", "2.0 × 10^8 m/s", "1.5 × 10^8 m/s", "4.5 × 10^8 m/s"],
        "correct_option": "2.0 × 10^8 m/s",
        "conceptual_error": "Multiplied vacuum speed by refractive index (c × n) instead of dividing (v = c / n).",
        "socratic_explanation": "What is the mathematical definition of refractive index (n) in terms of speed of light in vacuum (c) and medium (v)?"
    },
    {
        "chapter_name": "Electricity",
        "topic": "Parallel Resistor Circuits",
        "question": "Two resistors R1 = 6Ω and R2 = 3Ω are connected in parallel across a battery. What is the equivalent resistance of the combination?",
        "options": ["9Ω", "4.5Ω", "2Ω", "18Ω"],
        "correct_option": "2Ω",
        "conceptual_error": "Added parallel resistors linearly (R1 + R2 = 9Ω) instead of reciprocal addition (1/Rp = 1/R1 + 1/R2).",
        "socratic_explanation": "When two resistors are connected in parallel, how do we combine their individual resistances to calculate the reciprocal of total resistance?"
    },
    {
        "chapter_name": "Electricity",
        "topic": "Ohm's Law & Resistance Factors",
        "question": "If the length of a uniform metallic wire of resistance R is doubled while keeping its area of cross-section constant, what will be its new resistance?",
        "options": ["R / 2", "R", "2R", "4R"],
        "correct_option": "2R",
        "conceptual_error": "Assumed resistance is inversely proportional to length instead of directly proportional (R ∝ l).",
        "socratic_explanation": "How does the resistance of a conductor depend on its length (l) according to the resistivity formula R = ρ l / A?"
    },
    {
        "chapter_name": "Magnetic Effects of Electric Current",
        "topic": "Force Direction on Conductor",
        "question": "A current-carrying conductor is placed in a magnetic field. Which rule is used to determine the direction of mechanical force acting on the conductor?",
        "options": ["Right-Hand Thumb Rule", "Fleming's Left-Hand Rule", "Fleming's Right-Hand Rule", "Oersted's Rule"],
        "correct_option": "Fleming's Left-Hand Rule",
        "conceptual_error": "Confused Right-Hand Thumb Rule (magnetic field lines) with Fleming's Left-Hand Rule (mechanical force).",
        "socratic_explanation": "Which hand rule specifically predicts the direction of mechanical force on a current-carrying conductor in a magnetic field?"
    },
    {
        "chapter_name": "Magnetic Effects of Electric Current",
        "topic": "Solenoid & Electromagnetic Field",
        "question": "Inside a long straight current-carrying solenoid, what is the nature of the magnetic field lines?",
        "options": ["Zero at the center", "Circular loops", "Parallel straight lines", "Diverging outwards"],
        "correct_option": "Parallel straight lines",
        "conceptual_error": "Thought magnetic field inside a solenoid is zero or circular instead of uniform parallel lines.",
        "socratic_explanation": "What does parallel straight magnetic field lines indicate about the strength and uniformity of the magnetic field inside a solenoid?"
    }
]

def get_fast_mcq(chapter_name: str = "Light - Reflection and Refraction") -> Dict[str, Any]:
    c_lower = chapter_name.lower()
    matching = [
        q for q in NCERT_MCQ_BANK
        if any(w in q["chapter_name"].lower() for w in c_lower.split()) or c_lower in q["chapter_name"].lower()
    ]
    if matching:
        return random.choice(matching)
    return random.choice(NCERT_MCQ_BANK)

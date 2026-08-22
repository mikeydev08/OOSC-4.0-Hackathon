"""
Script to create sample raw NCERT PDF files in backend/data/pdfs/
"""
import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

pdf_dir = os.path.join(os.path.dirname(__file__), "pdfs")
os.makedirs(pdf_dir, exist_ok=True)

styles = getSampleStyleSheet()
title_style = styles['Title']
h1_style = styles['Heading1']
body_style = styles['BodyText']

# Chapter 9: Light - Reflection and Refraction
doc9 = SimpleDocTemplate(os.path.join(pdf_dir, "ncert_ch9_light.pdf"), pagesize=letter)
story9 = [
    Paragraph("NCERT Class 10 Science - Chapter 9: Light - Reflection and Refraction", title_style),
    Spacer(1, 12),
    Paragraph("9.1 Reflection of Light & Laws of Reflection", h1_style),
    Paragraph("Laws of Reflection: (i) The angle of incidence is equal to the angle of reflection (angle i = angle r). (ii) The incident ray, normal at the point of incidence and reflected ray lie in the same plane.", body_style),
    Spacer(1, 12),
    Paragraph("9.2.2 Sign Convention for Spherical Mirrors", h1_style),
    Paragraph("New Cartesian Sign Convention: Pole P is origin. Object distance u is always negative. Focal length f of a concave mirror is ALWAYS negative (-f). Focal length f of a convex mirror is ALWAYS positive (+f).", body_style),
    Spacer(1, 12),
    Paragraph("9.2.3 Mirror Formula and Magnification", h1_style),
    Paragraph("Mirror Formula: 1/f = 1/v + 1/u. Magnification m = h'/h = -v/u. Negative m implies real inverted image. Positive m implies virtual erect image.", body_style),
    Spacer(1, 12),
    Paragraph("9.3 Refraction of Light & Snell's Law", h1_style),
    Paragraph("Snell's Law: The ratio of sine of angle of incidence to sine of angle of refraction is constant: sin(i) / sin(r) = n21 (refractive index). Light traveling from rarer to denser medium bends towards the normal.", body_style),
    Spacer(1, 12),
    Paragraph("9.3.5 Lens Formula and Magnification", h1_style),
    Paragraph("Spherical Lens Formula: 1/f = 1/v - 1/u (Note minus sign!). Lens Magnification m = h'/h = +v/u (Positive sign, unlike mirror formula). Focal length of convex lens is positive, concave lens is negative. Power of lens P = 1/f(metres) in Dioptres (D). For a convex lens placed between an object and a screen, a real inverted image is formed on the screen when u > f.", body_style)
]
doc9.build(story9)

# Chapter 11: Electricity
doc11 = SimpleDocTemplate(os.path.join(pdf_dir, "ncert_ch11_electricity.pdf"), pagesize=letter)
story11 = [
    Paragraph("NCERT Class 10 Science - Chapter 11: Electricity", title_style),
    Spacer(1, 12),
    Paragraph("11.1 Electric Current & Circuit", h1_style),
    Paragraph("Electric Current I = Q / t. SI unit is Ampere (A). 1 Ampere = 1 Coulomb per second. Current flows from positive to negative terminal.", body_style),
    Spacer(1, 12),
    Paragraph("11.4 Ohm's Law & Resistance", h1_style),
    Paragraph("Ohm's Law: Potential difference V across metallic wire is directly proportional to current I: V = I * R. Resistance R = rho * l / A. SI unit is Ohm (Ω).", body_style),
    Spacer(1, 12),
    Paragraph("11.6.1 Resistors in Series", h1_style),
    Paragraph("Equivalent resistance in series R_s = R1 + R2 + R3. Current I remains constant through all series resistors.", body_style),
    Spacer(1, 12),
    Paragraph("11.6.2 Resistors in Parallel", h1_style),
    Paragraph("Reciprocal equivalent resistance in parallel 1/R_p = 1/R1 + 1/R2 + 1/R3. Potential difference V remains constant across each resistor. Remember to invert 1/R_p to find total resistance R_p = (R1 * R2) / (R1 + R2).", body_style),
    Spacer(1, 12),
    Paragraph("11.7 Heating Effect & Joule's Law", h1_style),
    Paragraph("Joule's Law of Heating: Heat produced H = I^2 * R * t. Heat is proportional to square of current, resistance, and time.", body_style)
]
doc11.build(story11)

# Chapter 12: Magnetic Effects of Electric Current
doc12 = SimpleDocTemplate(os.path.join(pdf_dir, "ncert_ch12_magnetic_effects.pdf"), pagesize=letter)
story12 = [
    Paragraph("NCERT Class 10 Science - Chapter 12: Magnetic Effects of Electric Current", title_style),
    Spacer(1, 12),
    Paragraph("12.1 Magnetic Field & Field Lines", h1_style),
    Paragraph("Properties of Magnetic Field Lines: Emerge from North pole and merge at South pole outside magnet. Continuous closed loops. Field lines never intersect each other.", body_style),
    Spacer(1, 12),
    Paragraph("12.2 Right-Hand Thumb Rule", h1_style),
    Paragraph("Right-Hand Thumb Rule: Hold straight conductor in right hand with thumb pointing in direction of current I. Curled fingers show direction of magnetic field lines B. Used for straight wire and solenoid.", body_style),
    Spacer(1, 12),
    Paragraph("12.3 Fleming's Left-Hand Rule", h1_style),
    Paragraph("Fleming's Left-Hand Rule for Force: Stretch thumb, forefinger, and middle finger of LEFT hand perpendicular to each other. Forefinger = Field (B), Middle finger = Current (I), Thumb = Force / Motion (F). Predicts mechanical force on conductor inside magnetic field.", body_style),
    Spacer(1, 12),
    Paragraph("12.5 Electromagnetic Induction & Fleming's Right-Hand Rule", h1_style),
    Paragraph("Electromagnetic Induction: Production of induced current due to changing magnetic flux. Fleming's Right-Hand Rule predicts direction of induced current.", body_style)
]
doc12.build(story12)

print(f"Created sample NCERT PDF files in {pdf_dir}:")
for f in os.listdir(pdf_dir):
    print(f" - {f}")

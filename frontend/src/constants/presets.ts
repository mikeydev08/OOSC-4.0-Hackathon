export interface PresetProblem {
  id: string;
  title: string;
  class_grade: string;
  subject: string;
  description: string;
  expected_formula?: string;
}

export const DEFAULT_PRESETS: Record<string, PresetProblem> = {
  physics_lcr_series: {
    id: "physics_lcr_series",
    title: "⚡ Series LCR AC Circuit: Phasor Voltage & Resonance",
    class_grade: "Class 12",
    subject: "Physics",
    description: "In a series LCR AC circuit, V_R = 30V, V_L = 80V, and V_C = 40V. A student calculated total source voltage by simply adding them algebraically: V = 30 + 80 + 40 = 150V.",
    expected_formula: "V = sqrt(V_R^2 + (V_L - V_C)^2)"
  },
  physics_wave_ydse: {
    id: "physics_wave_ydse",
    title: "🌊 YDSE Wave Optics: Dielectric Sheet Fringe Shift",
    class_grade: "Class 12",
    subject: "Physics",
    description: "In Young's Double Slit Experiment, a transparent mica sheet of thickness t and refractive index mu is placed in front of one slit. A student claims the fringe width beta increases because the path of light got longer.",
    expected_formula: "Fringe shift Delta y = (D/d)*(mu - 1)*t, but Fringe Width beta = lambda*D/d remains unchanged."
  },
  physics_concave_mirror: {
    id: "physics_concave_mirror",
    title: "🔍 Concave Mirror: Real Image & Sign Convention",
    class_grade: "Class 10",
    subject: "Physics",
    description: "An object is placed 15cm in front of a concave mirror of focal length 10cm. A student used the lens formula 1/f = 1/v - 1/u and took focal length as positive +10cm.",
    expected_formula: "Mirror formula: 1/f = 1/v + 1/u with f = -10cm, u = -15cm."
  },
  chem_nernst_galvanic: {
    id: "chem_nernst_galvanic",
    title: "🔋 Galvanic Cell: Nernst Potential & Reaction Quotient",
    class_grade: "Class 12",
    subject: "Chemistry",
    description: "For the cell Zn(s) | Zn2+(0.1M) || Ag+(0.01M) | Ag(s), a student applied Nernst equation as E = E0 - (0.0591/2)*log([Zn2+]/[Ag+]), forgetting the stoichiometric coefficient square on [Ag+].",
    expected_formula: "Q = [Zn2+] / [Ag+]^2 because overall reaction is Zn + 2Ag+ -> Zn2+ + 2Ag."
  },
  chem_redox_k2cr2o7: {
    id: "chem_redox_k2cr2o7",
    title: "🧪 Potassium Dichromate: Chromium Oxidation State",
    class_grade: "Class 11",
    subject: "Chemistry",
    description: "In balancing a redox reaction involving K2Cr2O7 in acidic medium, a student calculated the oxidation state of chromium (Cr) as +12 by not dividing by the two chromium atoms.",
    expected_formula: "2*(+1) + 2x + 7*(-2) = 0 => 2x = +12 => x = +6 per Cr atom."
  },
  math_calculus_rational: {
    id: "math_calculus_rational",
    title: "📐 Rational Calculus: Special Form Integral",
    class_grade: "Class 12",
    subject: "Mathematics",
    description: "To evaluate int (x^2 + 1)/(x^4 + 1) dx, a student attempted direct integration by parts on numerator and denominator separately.",
    expected_formula: "Divide numerator and denominator by x^2: int (1 + 1/x^2) / ((x - 1/x)^2 + 2) dx, then substitute u = x - 1/x."
  },
  math_inverse_trig_derivative: {
    id: "math_inverse_trig_derivative",
    title: "📈 Inverse Trigonometric Derivative Simplification",
    class_grade: "Class 12",
    subject: "Mathematics",
    description: "To find dy/dx for y = tan^-1((cos x - sin x)/(cos x + sin x)), a student applied the bulky chain rule d/dx[tan^-1(u)] = (1/(1+u^2))*du/dx without simplifying.",
    expected_formula: "Divide top and bottom by cos x: y = tan^-1(tan(pi/4 - x)) = pi/4 - x => dy/dx = -1."
  },
  bio_photosynthesis_z_scheme: {
    id: "bio_photosynthesis_z_scheme",
    title: "🍃 Photosynthesis: Cyclic vs Non-Cyclic Z-Scheme",
    class_grade: "Class 11",
    subject: "Biology",
    description: "In the Calvin cycle inside the stroma, a student claims that Cyclic Photophosphorylation in the stroma lamellae produces both ATP and NADPH for glucose fixation.",
    expected_formula: "Cyclic Photophosphorylation involves only PS-I (700nm) and produces ONLY ATP (no NADPH and no oxygen evolution)."
  },
  bio_lac_operon_repression: {
    id: "bio_lac_operon_repression",
    title: "🧬 Genetics: Lac Operon Inducer-Repressor Mechanism",
    class_grade: "Class 12",
    subject: "Biology",
    description: "In E. coli genetics, a student claims that the Lac Operon repressor protein is activated and binds to the operator only in the presence of lactose.",
    expected_formula: "Repressor binds operator in the ABSENCE of lactose. Lactose/Allolactose acts as an inducer that inactivates the repressor."
  }
};

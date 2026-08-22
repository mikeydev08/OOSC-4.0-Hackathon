"""
NCERT Multi-Grade & Multi-Subject Content Database (Classes 9, 10, 11, 12)
Comprehensive syllabus repository covering:
- Physics (Classes 10, 11, 12)
- Chemistry (Classes 10, 11, 12)
- Mathematics (Classes 10, 11, 12)
- Biology / Life Sciences (Classes 10, 11, 12)
"""

NCERT_CHUNKS = [
    # =========================================================================
    # ⚛️ PHYSICS (CLASSES 10, 11, 12)
    # =========================================================================
    {
        "id": "phys_10_light_1",
        "chapter_name": "Class 10 Physics: Light - Reflection and Refraction",
        "chapter_num": 9,
        "page_number": 165,
        "section_heading": "9.2 Sign Convention for Spherical Mirrors (Cartesian Convention)",
        "content": (
            "Cartesian Sign Convention for Spherical Mirrors: "
            "1. Origin is taken at the optical pole (P). Light travels from left to right. "
            "2. Object distance (u) is ALWAYS negative (-u). "
            "3. Focal length (f) of a CONCAVE mirror is ALWAYS NEGATIVE (-f). "
            "4. Focal length (f) of a CONVEX mirror is ALWAYS POSITIVE (+f). "
            "5. Mirror Formula: 1/f = 1/v + 1/u. Magnification m = -v/u = h'/h. "
            "Common Student Misconception: Forgetting that a concave mirror has a negative focal length."
        ),
        "keywords": ["mirror", "concave mirror", "focal length negative", "sign convention", "1/f = 1/v + 1/u", "magnification"]
    },
    {
        "id": "phys_10_elec_1",
        "chapter_name": "Class 10 Physics: Electricity",
        "chapter_num": 11,
        "page_number": 212,
        "section_heading": "11.6 Resistors in Series and Parallel Combinations",
        "content": (
            "Series Connection: R_s = R1 + R2 + ... + Rn. Current (I) is identical through all components. "
            "Parallel Connection: 1/R_p = 1/R1 + 1/R2 + ... + 1/Rn. For two resistors: R_p = (R1 * R2) / (R1 + R2). "
            "Potential difference (V) is identical across all parallel branches. "
            "Common Student Misconception: Adding parallel resistors linearly (R_p = R1 + R2) instead of inverting reciprocals."
        ),
        "keywords": ["parallel resistors", "series resistors", "1/Rp = 1/R1 + 1/R2", "Ohm's law", "equivalent resistance"]
    },
    {
        "id": "phys_11_kinematics",
        "chapter_name": "Class 11 Physics: Kinematics & Motion in a Straight Line",
        "chapter_num": 3,
        "page_number": 45,
        "section_heading": "3.6 Kinematic Equations of Uniformly Accelerated Motion",
        "content": (
            "Equations of Motion under constant acceleration (a): "
            "1. v = u + a * t. "
            "2. s = u * t + (1/2) * a * t^2. "
            "3. v^2 = u^2 + 2 * a * s. "
            "Under gravity (free fall, upward positive): a = -g (-9.8 m/s^2). At highest point, final vertical velocity v = 0. "
            "Common Student Misconception: Using acceleration due to gravity with wrong sign or applying kinematic equations when acceleration is variable."
        ),
        "keywords": ["kinematics", "equations of motion", "v = u + at", "s = ut + 1/2 at^2", "v^2 = u^2 + 2as", "gravity g"]
    },
    {
        "id": "phys_11_laws_motion",
        "chapter_name": "Class 11 Physics: Laws of Motion",
        "chapter_num": 5,
        "page_number": 92,
        "section_heading": "5.4 Newton's Second Law & Momentum",
        "content": (
            "Newton's Second Law of Motion: The rate of change of linear momentum of a body is directly proportional to the applied force: F = dp/dt = m * a (for constant mass). "
            "Impulse: J = F * Δt = Δp (change in momentum). "
            "Newton's Third Law: To every action, there is an equal and opposite reaction acting on DIFFERENT bodies simultaneously. "
            "Frictional Force: Static friction f_s <= μ_s * N. Kinetic friction f_k = μ_k * N."
        ),
        "keywords": ["Newton's second law", "F = ma", "momentum", "friction", "action reaction", "impulse"]
    },
    {
        "id": "phys_11_thermo",
        "chapter_name": "Class 11 Physics: Thermodynamics",
        "chapter_num": 12,
        "page_number": 305,
        "section_heading": "12.5 First Law of Thermodynamics & Specific Heats",
        "content": (
            "First Law of Thermodynamics: ΔQ = ΔU + ΔW, where ΔQ is heat added to system, ΔU is change in internal energy, and ΔW = P * ΔV is work done by system. "
            "Isothermal Process: Temperature T is constant => ΔU = 0 => Q = W = nRT * ln(V2/V1). "
            "Adiabatic Process: Q = 0 => ΔU = -W => P * V^γ = constant. "
            "Mayer's Relation: C_p - C_v = R. Ratio of specific heats γ = C_p / C_v."
        ),
        "keywords": ["thermodynamics", "first law", "dQ = dU + dW", "isothermal", "adiabatic", "Cp - Cv = R", "internal energy"]
    },
    {
        "id": "phys_12_electrostatics",
        "chapter_name": "Class 12 Physics: Electrostatics & Electric Charges",
        "chapter_num": 1,
        "page_number": 12,
        "section_heading": "1.6 Coulomb's Law & Principle of Superposition",
        "content": (
            "Coulomb's Law: Electrostatic force between two point charges q1 and q2 separated by distance r in vacuum: "
            "F = (1 / (4 * π * ε0)) * (|q1 * q2| / r^2), where 1 / (4πε0) = 9 * 10^9 N·m^2/C^2. "
            "Electric Field (E): E = F / q = (1 / (4 * π * ε0)) * (q / r^2). "
            "Gauss's Law: Total electric flux through any closed surface Φ = ∮ E · dA = Q_enclosed / ε0."
        ),
        "keywords": ["Coulomb's law", "electric field", "Gauss's law", "electrostatics", "dielectric constant", "flux"]
    },
    {
        "id": "phys_12_current",
        "chapter_name": "Class 12 Physics: Current Electricity",
        "chapter_num": 3,
        "page_number": 115,
        "section_heading": "3.9 Kirchhoff's Laws & Wheatstone Bridge",
        "content": (
            "Kirchhoff's First Law (Junction Rule): The algebraic sum of currents entering a junction is zero (Conservation of Charge): ∑ I = 0. "
            "Kirchhoff's Second Law (Loop Rule): In any closed loop, the algebraic sum of changes in potential is zero (Conservation of Energy): ∑ ΔV = 0. "
            "Balanced Wheatstone Bridge: When no current flows through galvanometer (I_g = 0): R1 / R2 = R3 / R4."
        ),
        "keywords": ["Kirchhoff's law", "junction rule", "loop rule", "Wheatstone bridge", "internal resistance", "EMF"]
    },
    {
        "id": "phys_12_wave_optics",
        "chapter_name": "Class 12 Physics: Wave Optics",
        "chapter_num": 10,
        "page_number": 360,
        "section_heading": "10.4 Interference of Light Waves & Young's Experiment",
        "content": (
            "Young's Double Slit Experiment (YDSE): "
            "Path difference for bright fringe (constructive interference): Δx = n * λ (n = 0, 1, 2...). "
            "Path difference for dark fringe (destructive interference): Δx = (2n - 1) * (λ / 2). "
            "Fringe Width (β): β = (λ * D) / d, where λ is wavelength, D is distance to screen, and d is slit separation. "
            "Common Student Misconception: Inverting D and d (writing β = λd / D instead of β = λD / d)."
        ),
        "keywords": ["wave optics", "Young's double slit", "fringe width", "beta = lambda D / d", "interference", "constructive destructive"]
    },
    {
        "id": "phys_12_modern_physics",
        "chapter_name": "Class 12 Physics: Dual Nature of Radiation and Matter",
        "chapter_num": 11,
        "page_number": 390,
        "section_heading": "11.6 Einstein's Photoelectric Equation & de Broglie Wavelength",
        "content": (
            "Einstein's Photoelectric Equation: Energy of incident photon E = h * ν = Φ0 + K_max = h * ν0 + e * V0, "
            "where Φ0 is work function, ν0 is threshold frequency, and V0 is stopping potential. "
            "de Broglie Hypothesis: Matter exhibits wave-particle duality. Wavelength λ = h / p = h / (m * v) = h / √(2 * m * e * V)."
        ),
        "keywords": ["photoelectric effect", "work function", "de Broglie wavelength", "Planck's constant", "stopping potential", "h nu"]
    },

    # =========================================================================
    # 🧪 CHEMISTRY (CLASSES 10, 11, 12)
    # =========================================================================
    {
        "id": "chem_11_mole_concept",
        "chapter_name": "Class 11 Chemistry: Some Basic Concepts of Chemistry",
        "chapter_num": 1,
        "page_number": 15,
        "section_heading": "1.7 Mole Concept, Molar Mass & Stoichiometry",
        "content": (
            "Mole Concept: 1 mole of any substance contains Avogadro's number (N_A = 6.022 * 10^23) of representative particles. "
            "Number of moles (n) = Mass (g) / Molar Mass (g/mol) = Volume at STP (L) / 22.4 L. "
            "Molarity (M) = Moles of solute / Volume of solution in Litres (mol/L). "
            "Molality (m) = Moles of solute / Mass of solvent in Kilograms (mol/kg)."
        ),
        "keywords": ["mole concept", "Avogadro's number", "molarity", "molality", "stoichiometry", "molar mass"]
    },
    {
        "id": "chem_11_states_matter",
        "chapter_name": "Class 11 Chemistry: States of Matter & Thermodynamics",
        "chapter_num": 5,
        "page_number": 140,
        "section_heading": "5.5 Ideal Gas Equation (PV = nRT)",
        "content": (
            "Ideal Gas Law: P * V = n * R * T, where P is pressure, V is volume, n is moles, R is gas constant (0.0821 L·atm/(mol·K) or 8.314 J/(mol·K)), and T is ABSOLUTE TEMPERATURE IN KELVIN. "
            "Temperature Conversion: T(K) = T(°C) + 273.15. "
            "Common Student Misconception: Substituting temperature in Celsius (°C) directly into PV = nRT instead of converting to Kelvin."
        ),
        "keywords": ["ideal gas law", "PV = nRT", "Kelvin conversion", "gas constant R", "Boyle's law", "Charles's law"]
    },
    {
        "id": "chem_11_chemical_bonding",
        "chapter_name": "Class 11 Chemistry: Chemical Bonding and Molecular Structure",
        "chapter_num": 4,
        "page_number": 105,
        "section_heading": "4.3 VSEPR Theory & Orbital Hybridization",
        "content": (
            "VSEPR Theory: Molecular geometry is determined by repulsions between valence shell electron pairs: Lone Pair - Lone Pair > Lone Pair - Bond Pair > Bond Pair - Bond Pair. "
            "Hybridization States: "
            "- sp: Linear (180°, e.g., BeCl2, C2H2). "
            "- sp2: Trigonal Planar (120°, e.g., BF3, C2H4). "
            "- sp3: Tetrahedral (109.5°, e.g., CH4; pyramidal in NH3 due to 1 lone pair; bent in H2O due to 2 lone pairs)."
        ),
        "keywords": ["chemical bonding", "VSEPR theory", "hybridization", "sp3", "sp2", "lone pair repulsion", "molecular geometry"]
    },
    {
        "id": "chem_11_redox",
        "chapter_name": "Class 11 Chemistry: Redox Reactions",
        "chapter_num": 8,
        "page_number": 260,
        "section_heading": "8.3 Oxidation Number & Balancing Redox Reactions",
        "content": (
            "Oxidation Number Rules: "
            "1. Free element oxidation state is 0. Group 1 alkali metals are always +1, Group 2 are +2. "
            "2. Oxygen is usually -2 (except in peroxides where it is -1, and OF2 where it is +2). "
            "3. Hydrogen is +1 when bonded to nonmetals, -1 in metallic hydrides. "
            "4. In Potassium Dichromate (K2Cr2O7): 2(+1) + 2(Cr) + 7(-2) = 0 => 2 + 2(Cr) - 14 = 0 => 2(Cr) = +12 => Cr = +6. "
            "Common Student Misconception: Forgetting to divide the total charge (+12) by 2 for the Cr2 subscript, giving +12 instead of +6."
        ),
        "keywords": ["redox reactions", "oxidation state", "oxidation number", "K2Cr2O7", "Cr oxidation state +6", "balancing redox"]
    },
    {
        "id": "chem_12_solutions",
        "chapter_name": "Class 12 Chemistry: Solutions",
        "chapter_num": 2,
        "page_number": 45,
        "section_heading": "2.4 Raoult's Law & Colligative Properties",
        "content": (
            "Raoult's Law for volatile solutes: P_total = pA + pB = pA° * xA + pB° * xB. "
            "Colligative Properties (depend only on number of solute particles): "
            "1. Relative Lowering of Vapour Pressure: (pA° - pA) / pA° = i * xB. "
            "2. Elevation of Boiling Point: ΔTb = i * Kb * m. "
            "3. Depression of Freezing Point: ΔTf = i * Kf * m. "
            "4. Osmotic Pressure: π = i * C * R * T. "
            "van 't Hoff factor (i): i = 1 for non-electrolytes (glucose, urea); i > 1 for dissociation (NaCl -> i=2); i < 1 for association."
        ),
        "keywords": ["solutions", "Raoult's law", "colligative properties", "van 't Hoff factor", "elevation of boiling point", "osmotic pressure"]
    },
    {
        "id": "chem_12_electrochemistry",
        "chapter_name": "Class 12 Chemistry: Electrochemistry",
        "chapter_num": 3,
        "page_number": 75,
        "section_heading": "3.3 Nernst Equation & Electrochemical Cells",
        "content": (
            "Nernst Equation at 298 K: E_cell = E°_cell - (0.0591 / n) * log10(Q), "
            "where n is number of electrons transferred, and Q is reaction quotient [Products]^p / [Reactants]^r. "
            "Relationship with Equilibrium Constant: E°_cell = (0.0591 / n) * log10(K_c). "
            "Gibbs Free Energy: ΔG° = -n * F * E°_cell (1 Faraday F = 96500 C/mol)."
        ),
        "keywords": ["electrochemistry", "Nernst equation", "standard electrode potential", "E_cell", "Gibbs free energy", "Faraday constant"]
    },
    {
        "id": "chem_12_kinetics",
        "chapter_name": "Class 12 Chemistry: Chemical Kinetics",
        "chapter_num": 4,
        "page_number": 105,
        "section_heading": "4.3 Integrated Rate Equations & Arrhenius Equation",
        "content": (
            "First Order Reaction: Rate = k * [A]. Integrated form: k = (2.303 / t) * log10([A]0 / [A]t). "
            "Half-life of first-order reaction: t_1/2 = 0.693 / k (independent of initial concentration). "
            "Arrhenius Equation: k = A * e^(-Ea / (R * T)) => log10(k2 / k1) = (Ea / (2.303 * R)) * ((T2 - T1) / (T1 * T2))."
        ),
        "keywords": ["chemical kinetics", "rate constant", "first order reaction", "half life", "Arrhenius equation", "activation energy Ea"]
    },
    {
        "id": "chem_12_organic_mechanisms",
        "chapter_name": "Class 12 Chemistry: Haloalkanes, Alcohols & Carbonyl Compounds",
        "chapter_num": 10,
        "page_number": 290,
        "section_heading": "10.4 SN1 vs SN2 Nucleophilic Substitution Mechanisms",
        "content": (
            "SN1 Mechanism (Substitution Nucleophilic Unimolecular): "
            "Two-step process involving carbocation intermediate. Rate depends only on substrate: Rate = k * [R-X]. "
            "Reactivity order: 3° > 2° > 1° (due to tertiary carbocation hyperconjugation stability). Leads to racemization. "
            "SN2 Mechanism (Substitution Nucleophilic Bimolecular): "
            "One-step concerted transition state. Rate = k * [R-X] * [Nu-]. "
            "Reactivity order: 1° > 2° > 3° (least steric hindrance). Leads to Walden Inversion."
        ),
        "keywords": ["SN1 mechanism", "SN2 mechanism", "nucleophilic substitution", "carbocation stability", "Walden inversion", "steric hindrance"]
    },

    # =========================================================================
    # 📐 MATHEMATICS (CLASSES 10, 11, 12)
    # =========================================================================
    {
        "id": "math_11_trig",
        "chapter_name": "Class 11 Mathematics: Trigonometric Functions",
        "chapter_num": 3,
        "page_number": 65,
        "section_heading": "3.3 Trigonometric Identities & Compound Angles",
        "content": (
            "Fundamental Identities: sin^2(x) + cos^2(x) = 1, 1 + tan^2(x) = sec^2(x), 1 + cot^2(x) = cosec^2(x). "
            "Compound Angles: "
            "- sin(A ± B) = sin A cos B ± cos A sin B. "
            "- cos(A ± B) = cos A cos B ∓ sin A sin B (Notice opposite sign!). "
            "Double Angle Formulas: "
            "- sin(2x) = 2 sin x cos x. "
            "- cos(2x) = cos^2(x) - sin^2(x) = 2 cos^2(x) - 1 = 1 - 2 sin^2(x)."
        ),
        "keywords": ["trigonometry", "sin(A+B)", "cos(A+B)", "double angle", "sin 2x", "cos 2x", "trigonometric identities"]
    },
    {
        "id": "math_11_limits_derivatives",
        "chapter_name": "Class 11 Mathematics: Limits and Derivatives",
        "chapter_num": 13,
        "page_number": 295,
        "section_heading": "13.5 Standard Limits & Derivative Rules",
        "content": (
            "Standard Limits: lim(x->0) [sin(x) / x] = 1, lim(x->0) [(e^x - 1) / x] = 1, lim(x->a) [(x^n - a^n) / (x - a)] = n * a^(n-1). "
            "Derivative Rules: "
            "- Power Rule: d/dx (x^n) = n * x^(n-1). "
            "- Product Rule: d/dx (u * v) = u * (dv/dx) + v * (du/dx). "
            "- Quotient Rule: d/dx (u / v) = (v * (du/dx) - u * (dv/dx)) / v^2."
        ),
        "keywords": ["limits", "derivatives", "product rule", "quotient rule", "power rule", "standard limit sin x / x"]
    },
    {
        "id": "math_12_calculus_continuity",
        "chapter_name": "Class 12 Mathematics: Continuity and Differentiability",
        "chapter_num": 5,
        "page_number": 150,
        "section_heading": "5.3 Chain Rule & Implicit Differentiation",
        "content": (
            "Chain Rule: If y = f(g(x)), then dy/dx = f'(g(x)) * g'(x). "
            "Derivatives of Common Functions: "
            "- d/dx [sin(x)] = cos(x), d/dx [cos(x)] = -sin(x), d/dx [tan(x)] = sec^2(x). "
            "- d/dx [e^x] = e^x, d/dx [ln(x)] = 1/x. "
            "- d/dx [sin(x^2)] = cos(x^2) * d/dx(x^2) = 2x * cos(x^2)."
        ),
        "keywords": ["calculus", "chain rule", "differentiation", "continuity", "derivatives", "implicit differentiation"]
    },
    {
        "id": "math_12_integrals_substitution",
        "chapter_name": "Class 12 Mathematics: Integrals",
        "chapter_num": 7,
        "page_number": 298,
        "section_heading": "7.3 Methods of Integration: Integration by Substitution",
        "content": (
            "Integration by Substitution (u-substitution): "
            "To evaluate ∫ f(g(x)) * g'(x) dx, let u = g(x) => du = g'(x) dx. Then the integral becomes ∫ f(u) du. "
            "Example: For ∫ 2x * cos(x^2) dx: Let u = x^2 => du = 2x dx. "
            "Then ∫ cos(u) du = sin(u) + C = sin(x^2) + C. "
            "Common Student Misconception: Integrating 2x and cos(x^2) separately as a product of integrals, which is invalid."
        ),
        "keywords": ["integrals", "integration by substitution", "u substitution", "integral of cos(x^2)", "calculus integration", "integration by parts"]
    },
    {
        "id": "math_12_integrals_parts",
        "chapter_name": "Class 12 Mathematics: Integrals by Parts",
        "chapter_num": 7,
        "page_number": 315,
        "section_heading": "7.5 Integration by Parts (ILATE Rule)",
        "content": (
            "Integration by Parts Formula: ∫ (u * v) dx = u * ∫ v dx - ∫ [ (du/dx) * (∫ v dx) ] dx. "
            "Priority of First Function (u) by ILATE rule: "
            "I: Inverse trigonometric functions (arcsin, arctan...) "
            "L: Logarithmic functions (ln x, log x) "
            "A: Algebraic functions (x^n, polynomial) "
            "T: Trigonometric functions (sin x, cos x) "
            "E: Exponential functions (e^x, a^x)."
        ),
        "keywords": ["integration by parts", "ILATE rule", "integral u v dx", "definite integrals", "calculus"]
    },
    {
        "id": "math_12_vectors_3d",
        "chapter_name": "Class 12 Mathematics: Vectors & 3D Geometry",
        "chapter_num": 10,
        "page_number": 435,
        "section_heading": "10.4 Scalar (Dot) Product and Vector (Cross) Product",
        "content": (
            "Dot Product: a · b = |a| * |b| * cos(θ) = ax*bx + ay*by + az*bz. Two non-zero vectors are perpendicular if and only if a · b = 0. "
            "Cross Product: a × b = (|a| * |b| * sin(θ)) n_hat. Magnitude is the area of parallelogram. Two non-zero vectors are parallel if and only if a × b = 0. "
            "Equation of line in 3D: r = a + λ * b."
        ),
        "keywords": ["vectors", "dot product", "cross product", "perpendicular vectors a.b=0", "3D geometry", "direction cosines"]
    },

    # =========================================================================
    # 🧬 BIOLOGY & LIFE SCIENCES (CLASSES 10, 11, 12)
    # =========================================================================
    {
        "id": "bio_11_photosynthesis",
        "chapter_name": "Class 11 Biology: Photosynthesis in Higher Plants",
        "chapter_num": 13,
        "page_number": 208,
        "section_heading": "13.6 Light Reaction vs Calvin Cycle (Dark Reaction)",
        "content": (
            "Light-Dependent Reactions: Occur in the Thylakoid membranes of chloroplasts. Light energy drives photolysis of water (H2O -> 2H+ + 2e- + 1/2 O2) and generates ATP and NADPH via non-cyclic electron transport (Z-scheme). "
            "Dark Reactions / Calvin Cycle (C3 Pathway): Occurs in the Stroma. CO2 is fixed by the enzyme RuBisCO with RuBP to produce 3-PGA, utilizing ATP and NADPH synthesized during light reactions to produce glucose. "
            "Common Student Misconception: Believing dark reactions occur only at night; they are light-independent but require light reaction products (ATP/NADPH)."
        ),
        "keywords": ["photosynthesis", "Calvin cycle", "light reaction", "thylakoid", "stroma", "RuBisCO", "photolysis of water"]
    },
    {
        "id": "bio_11_cell_division",
        "chapter_name": "Class 11 Biology: Cell Cycle and Cell Division",
        "chapter_num": 10,
        "page_number": 162,
        "section_heading": "10.2 Mitosis vs Meiosis & Crossing Over",
        "content": (
            "Mitosis (Equational Division): Occurs in somatic cells. Produces 2 genetically identical diploid (2n) daughter cells. Stages: Prophase, Metaphase (chromosomes align at equatorial plate), Anaphase (sister chromatids separate), Telophase. "
            "Meiosis (Reductional Division): Occurs in germ cells. Produces 4 genetically diverse haploid (n) gametes. "
            "Crossing Over occurs during Pachytene stage of Prophase I between non-sister chromatids of homologous chromosomes, mediated by recombinase."
        ),
        "keywords": ["cell division", "mitosis", "meiosis", "crossing over", "pachytene", "haploid diploid", "metaphase plate"]
    },
    {
        "id": "bio_12_genetics_mendel",
        "chapter_name": "Class 12 Biology: Principles of Inheritance and Variation",
        "chapter_num": 5,
        "page_number": 70,
        "section_heading": "5.2 Mendelian Inheritance & Law of Segregation",
        "content": (
            "Mendel's Laws of Inheritance: "
            "1. Law of Dominance: In a monohybrid cross (TT x tt), F1 generation shows only dominant phenotype (Tt). "
            "2. Law of Segregation (Purity of Gametes): Alleles separate during gamete formation without blending (F2 phenotypic ratio 3:1, genotypic ratio 1:2:1). "
            "3. Law of Independent Assortment: In dihybrid cross (RrYy x RrYy), two pairs of traits segregate independently (F2 phenotypic ratio 9:3:3:1)."
        ),
        "keywords": ["genetics", "Mendelian laws", "monohybrid cross", "dihybrid cross 9:3:3:1", "law of segregation", "alleles"]
    },
    {
        "id": "bio_12_molecular_dna",
        "chapter_name": "Class 12 Biology: Molecular Basis of Inheritance",
        "chapter_num": 6,
        "page_number": 95,
        "section_heading": "6.4 DNA Replication, Transcription & Central Dogma",
        "content": (
            "Central Dogma of Molecular Biology: DNA -> (Transcription via RNA Polymerase) -> mRNA -> (Translation at Ribosomes) -> Protein. "
            "DNA Structure: Double helix with antiparallel strands (5'->3' and 3'->5'). Complementary base pairing: Adenine pairs with Thymine (A=T with 2 hydrogen bonds), Guanine pairs with Cytosine (G≡C with 3 hydrogen bonds). "
            "Semi-conservative DNA Replication proved by Meselson and Stahl using 15N isotope."
        ),
        "keywords": ["DNA replication", "Central Dogma", "transcription", "translation", "mRNA", "complementary base pairing", "lac operon"]
    }
]

import os
import re
import json
from typing import List, Dict, Any, Optional

SCHOLARSHIPS_DATABASE: List[Dict[str, Any]] = [
    # ─── 1. ALL-CASTE / OPEN MERIT & MEANS SCHOLARSHIPS (CLASSES 10, 11, 12) ───
    {
        "id": "ntse_ncert",
        "name": "National Talent Search Examination (NTSE)",
        "offered_by": "NCERT, Ministry of Education, Govt of India",
        "category_tags": ["Open Merit", "All Castes", "Class 10", "National", "STEM"],
        "min_grade": "Class 10",
        "max_grade": "Class 10",
        "applicable_grades": ["Class 10"],
        "max_income": 99999999, # Purely merit based, no income bar
        "target_genders": ["All", "Male", "Female", "Other"],
        "target_categories": ["General", "OBC", "SC", "ST", "EWS", "All"],
        "award_amount": "₹15,000 / Year (Class 11-12) | ₹24,000 / Year (UG/PG)",
        "award_amount_num": 15000,
        "deadline": "November 15, 2026",
        "portal_url": "https://ncert.nic.in",
        "overview": "India's premier national-level scholarship examination conducted by NCERT for Class 10 students. Completely open to all castes and financial strata based purely on Mental Ability (MAT) and Scholastic Aptitude (SAT).",
        "eligibility_criteria": [
            "Students studying in Class 10 in any recognized school in India or abroad",
            "Open to all students regardless of caste, community, or parental income",
            "Selection based on 2-stage national competitive examination (State Level + National Level)",
            "Scholarship continues through Class 11, 12, Undergraduate, and Postgraduate studies"
        ],
        "required_documents": [
            "Class 9 Marksheet (minimum 55% marks required)",
            "School Bonafide Certificate / Headmaster Recommendation",
            "Aadhaar Card of the Student",
            "Passport Size Photograph"
        ]
    },
    {
        "id": "sbi_asha_scholarship",
        "name": "SBI Asha Scholarship Programme",
        "offered_by": "SBI Foundation (State Bank of India)",
        "category_tags": ["Open to All Castes", "Class 10", "Class 11", "Class 12", "CSR Philanthropy"],
        "min_grade": "Class 9",
        "max_grade": "Class 12",
        "applicable_grades": ["Class 9", "Class 10", "Class 11", "Class 12"],
        "max_income": 300000,
        "target_genders": ["All", "Male", "Female", "Other"],
        "target_categories": ["General", "OBC", "SC", "ST", "EWS", "All"],
        "award_amount": "₹15,000 to ₹50,000 / Year",
        "award_amount_num": 25000,
        "deadline": "November 30, 2026",
        "portal_url": "https://sbiashascholarship.co.in",
        "overview": "Flagship CSR initiative by the State Bank of India to provide financial assistance to meritorious school students from low-income families across all castes throughout India.",
        "eligibility_criteria": [
            "Students currently studying in Classes 9th, 10th, 11th, or 12th",
            "Minimum 75% marks in the previous academic year (65% for SC/ST)",
            "Annual family income must not exceed ₹3,00,000",
            "Open to students from all social categories across India"
        ],
        "required_documents": [
            "Previous Year Marksheet (Class 9/10/11 - min 75%)",
            "Family Income Certificate (ITR / Salary Slip / Tehsildar Certificate < ₹3 Lakhs)",
            "Aadhaar Card and Student Bank Account Details",
            "School Admission Letter / Current Year Fee Receipt"
        ]
    },
    {
        "id": "hdfc_parivartan_ecss",
        "name": "HDFC Bank Parivartan's ECSS Programme",
        "offered_by": "HDFC Bank CSR Foundation",
        "category_tags": ["Open to All Castes", "Class 10", "Class 11", "Class 12", "Merit-cum-Need"],
        "min_grade": "Class 10",
        "max_grade": "Class 12",
        "applicable_grades": ["Class 10", "Class 11", "Class 12"],
        "max_income": 250000,
        "target_genders": ["All", "Male", "Female", "Other"],
        "target_categories": ["General", "OBC", "SC", "ST", "EWS", "All"],
        "award_amount": "₹35,000 to ₹75,000 / Year",
        "award_amount_num": 35000,
        "deadline": "December 31, 2026",
        "portal_url": "https://hdfcbank.com / https://buddy4study.com",
        "overview": "Educational Crisis Scholarship Support (ECSS) program assisting students who are at risk of dropping out due to financial distress, loss of earning family member, or low income.",
        "eligibility_criteria": [
            "Studying in Class 10, 11, 12 or pursuing undergraduate degrees",
            "Scored minimum 55% marks in the previous qualifying examination",
            "Annual family income less than or equal to ₹2,50,000",
            "Open to all communities and categories"
        ],
        "required_documents": [
            "Previous Year Academic Marksheet",
            "Income Proof / Income Certificate (< ₹2.5 Lakhs)",
            "Current Academic Year Admission Fee Receipt",
            "Crisis Document / Self-declaration if applicable",
            "Aadhaar Card & Bank Passbook"
        ]
    },
    {
        "id": "tata_capital_pankh",
        "name": "Tata Capital Pankh Scholarship Programme",
        "offered_by": "Tata Capital Limited",
        "category_tags": ["Open to All Castes", "Class 11", "Class 12", "Tuition Support"],
        "min_grade": "Class 11",
        "max_grade": "Class 12",
        "applicable_grades": ["Class 11", "Class 12"],
        "max_income": 250000,
        "target_genders": ["All", "Male", "Female", "Other"],
        "target_categories": ["General", "OBC", "SC", "ST", "EWS", "All"],
        "award_amount": "Up to ₹12,000 / Year (covers up to 80% Tuition Fees)",
        "award_amount_num": 12000,
        "deadline": "November 15, 2026",
        "portal_url": "https://tatacapital.com",
        "overview": "Empowering meritorious and deserving students from economically weaker sections of any caste studying in Classes 11 and 12 to fulfill their educational dreams.",
        "eligibility_criteria": [
            "Students enrolled in recognized Class 11 or 12 across India",
            "Minimum 60% marks in Class 10 Board examinations",
            "Annual family income must not exceed ₹2,50,000 from all sources",
            "Open to all categories and genders"
        ],
        "required_documents": [
            "Class 10 Board Marksheet (minimum 60%)",
            "Income Certificate issued by Government Authority",
            "School Identity Card and Fee Receipt for current year",
            "Aadhaar Card and Student Bank Account Details"
        ]
    },
    {
        "id": "keep_india_smiling_colgate",
        "name": "Keep India Smiling Foundational Scholarship",
        "offered_by": "Colgate-Palmolive (India) Limited",
        "category_tags": ["Open to All Castes", "Class 11", "Class 12", "CSR Merit"],
        "min_grade": "Class 11",
        "max_grade": "Class 12",
        "applicable_grades": ["Class 11", "Class 12"],
        "max_income": 500000,
        "target_genders": ["All", "Male", "Female", "Other"],
        "target_categories": ["General", "OBC", "SC", "ST", "EWS", "All"],
        "award_amount": "₹20,000 / Year (for 2 consecutive years)",
        "award_amount_num": 20000,
        "deadline": "October 31, 2026",
        "portal_url": "https://colgate.com / https://buddy4study.com",
        "overview": "Financial aid for foundational learning to deserving Class 11 students across India to cover books, tuition, and coaching without financial hindrance.",
        "eligibility_criteria": [
            "Must have passed Class 10 Board Exams with at least 75% marks",
            "Currently enrolled in Class 11 in a recognized school",
            "Annual family income must be less than ₹5,00,000",
            "Open to all students regardless of caste or religion"
        ],
        "required_documents": [
            "Class 10 Board Marksheet (75%+)",
            "Admission confirmation in Class 11",
            "Income Certificate / BPL Card / Salary Slip (< ₹5 Lakhs)",
            "Aadhaar Card and Active Bank Account Details"
        ]
    },
    {
        "id": "vidyadhan_scholarship",
        "name": "Vidyadhan Scholarship Programme",
        "offered_by": "Sarojini Damodaran Foundation (SDF)",
        "category_tags": ["Open to All Castes", "Class 11", "Class 12", "Merit-cum-Means"],
        "min_grade": "Class 11",
        "max_grade": "Class 12",
        "applicable_grades": ["Class 11", "Class 12"],
        "max_income": 200000,
        "target_genders": ["All", "Male", "Female", "Other"],
        "target_categories": ["General", "OBC", "SC", "ST", "EWS", "All"],
        "award_amount": "₹10,000 to ₹60,000 / Year",
        "award_amount_num": 20000,
        "deadline": "July 31 to August 31, 2026 (State-wise)",
        "portal_url": "https://vidyadhan.org",
        "overview": "Established by Infosys Co-founder S.D. Shibulal to nurture high-potential, underprivileged students after Class 10 through Class 11, 12, and higher education.",
        "eligibility_criteria": [
            "Students who have completed Class 10 / SSLC with 90% marks or 9 CGPA",
            "Annual family income must be less than ₹2,00,000",
            "Open to all students across Karnataka, Kerala, Maharashtra, Telangana, TN, Gujarat, etc.",
            "No caste or community restrictions"
        ],
        "required_documents": [
            "Class 10 / SSLC Marksheet with 90%+ marks",
            "Income Certificate from Tehsildar / Revenue Inspector (< ₹2 Lakhs)",
            "Class 11 Admission / Fee Receipt",
            "Aadhaar Card and Passport Photo"
        ]
    },
    {
        "id": "inspire_she",
        "name": "INSPIRE Scholarship for Higher Education (SHE)",
        "offered_by": "Department of Science & Technology (DST), Govt of India",
        "category_tags": ["STEM", "Science", "Open Merit", "All Castes", "Class 12"],
        "min_grade": "Class 12",
        "max_grade": "Class 12",
        "applicable_grades": ["Class 12"],
        "max_income": 99999999,
        "target_genders": ["All", "Male", "Female", "Other"],
        "target_categories": ["General", "OBC", "SC", "ST", "EWS", "All"],
        "award_amount": "₹80,000 / Year (₹60,000 Cash + ₹20,000 Research Mentorship)",
        "award_amount_num": 80000,
        "deadline": "November 30, 2026",
        "portal_url": "https://online-inspire.gov.in",
        "overview": "Flagship Government of India initiative to inspire talent for natural and basic sciences (Physics, Chemistry, Mathematics, Biology) among top 1% board performers of any caste.",
        "eligibility_criteria": [
            "Must have completed Class 12 in Science stream (PCM/PCB/PCMB)",
            "Top 1% rank in respective State or Central Board Class 12 exams",
            "Or Top 10,000 rank in JEE Advanced / NEET / KVPY Fellowship",
            "Enrolled in B.Sc. / BS / Integrated M.Sc. in Natural & Basic Sciences"
        ],
        "required_documents": [
            "Class 12 Board Marksheet & Certificate showing Top 1% cutoff",
            "College / University Admission Confirmation Letter",
            "Student Bank Account Passbook (SBI / Nationalized Bank)",
            "Aadhaar Card & Passport Size Photograph",
            "Endorsement Certificate signed by College Principal"
        ]
    },
    {
        "id": "nmms_merit_scholarship",
        "name": "National Means-cum-Merit Scholarship (NMMSS)",
        "offered_by": "Ministry of Education, Govt of India",
        "category_tags": ["Open to All Castes", "Govt Schools", "Class 10", "Class 11", "Class 12"],
        "min_grade": "Class 9",
        "max_grade": "Class 12",
        "applicable_grades": ["Class 9", "Class 10", "Class 11", "Class 12"],
        "max_income": 350000,
        "target_genders": ["All", "Male", "Female", "Other"],
        "target_categories": ["General", "OBC", "SC", "ST", "EWS", "All"],
        "award_amount": "₹12,000 / Year (₹1,000 per month for 4 years)",
        "award_amount_num": 12000,
        "deadline": "December 15, 2026",
        "portal_url": "https://scholarships.gov.in",
        "overview": "Centrally sponsored scheme to prevent dropouts of economically disadvantaged students at Class 8/10 and support them through secondary & senior secondary education.",
        "eligibility_criteria": [
            "Studying in Government, Local Body, or Government-aided school",
            "Parental annual income from all sources not exceeding ₹3,50,000",
            "Scored minimum 55% marks (50% for SC/ST) in Class 8 / 10 exam",
            "Selected through State-level NMMS written exam (MAT & SAT)"
        ],
        "required_documents": [
            "Parental Income Certificate (< ₹3.5 Lakhs)",
            "NMMS Selection Card / Merit Certificate",
            "Class 8th / 10th Report Card",
            "Aadhaar Card linked to Bank Account (DBT enabled)",
            "Proof of enrollment in Government / Aided school"
        ]
    },
    {
        "id": "nice_foundation_nse",
        "name": "NICE Foundation National Scholarship Exam (NSE)",
        "offered_by": "NICE Foundation India",
        "category_tags": ["Open to All Castes", "All India", "Class 10", "Class 11", "Class 12", "Talent Search"],
        "min_grade": "Class 9",
        "max_grade": "Class 12",
        "applicable_grades": ["Class 9", "Class 10", "Class 11", "Class 12"],
        "max_income": 99999999,
        "target_genders": ["All", "Male", "Female", "Other"],
        "target_categories": ["General", "OBC", "SC", "ST", "EWS", "All"],
        "award_amount": "Up to ₹25,000 Cash Prize + Merit Certificate",
        "award_amount_num": 25000,
        "deadline": "September 30, 2026",
        "portal_url": "https://niceedu.org",
        "overview": "National competitive examination to reward scholastic talent across Mathematics, Science, and General Knowledge for students from Class 5 to 12 of all communities.",
        "eligibility_criteria": [
            "Open to all students from Class 5 to 12 studying in any recognized board (CBSE/ICSE/State)",
            "No income or caste criteria; selection purely on merit in NSE online examination",
            "Awards cash prizes up to ₹25,000 to top national rankers"
        ],
        "required_documents": [
            "Student ID Card / School Bonafide Certificate",
            "Online Application Form Confirmation",
            "Aadhaar Card Copy"
        ]
    },
    {
        "id": "loreal_women_in_science",
        "name": "L’Oréal India For Young Women in Science Scholarship",
        "offered_by": "L’Oréal India CSR Foundation",
        "category_tags": ["Girl Child", "STEM", "Science", "Open to All Castes", "Class 12"],
        "min_grade": "Class 12",
        "max_grade": "Class 12",
        "applicable_grades": ["Class 12"],
        "max_income": 600000,
        "target_genders": ["Female"],
        "target_categories": ["General", "OBC", "SC", "ST", "EWS", "All"],
        "award_amount": "₹2,50,000 (granted over duration of undergraduate degree)",
        "award_amount_num": 250000,
        "deadline": "August 31, 2026",
        "portal_url": "https://loreal.com / https://buddy4study.com",
        "overview": "Recognizes and empowers young women who have passed Class 12 in Science stream with 85%+ to pursue graduation in STEM, Engineering, Medicine, or Pure Sciences.",
        "eligibility_criteria": [
            "Female student who passed Class 12 Science (PCM/PCB/PCMB) with min 85% marks",
            "Annual family income less than ₹6,00,000 per annum",
            "Enrolling in regular degree program in Science/Engineering/Medical",
            "Open to all castes and communities across India"
        ],
        "required_documents": [
            "Class 10 and 12 Board Marksheets (85%+ required)",
            "Family Income Certificate / Salary Slip (< ₹6 Lakhs)",
            "College Admission Letter & Tuition Fee Slip",
            "Aadhaar Card and Student Bank Account Details"
        ]
    },
    {
        "id": "cbse_single_girl_child",
        "name": "CBSE Single Girl Child Merit Scholarship",
        "offered_by": "Central Board of Secondary Education (CBSE)",
        "category_tags": ["Girl Child", "CBSE", "Class 11", "Class 12", "Open to All Castes"],
        "min_grade": "Class 11",
        "max_grade": "Class 12",
        "applicable_grades": ["Class 11", "Class 12"],
        "max_income": 99999999,
        "target_genders": ["Female"],
        "target_categories": ["General", "OBC", "SC", "ST", "EWS", "All"],
        "award_amount": "₹6,000 / Year (₹500 / month for 2 years)",
        "award_amount_num": 6000,
        "deadline": "November 15, 2026",
        "portal_url": "https://cbse.gov.in",
        "overview": "Recognizes parental efforts in promoting education among girls and provides financial assistance to meritorious single girl children who passed Class 10 with 60%+.",
        "eligibility_criteria": [
            "Must be the ONLY girl child of her parents (no brothers/sisters)",
            "Scored 60% or higher in CBSE Class 10 Board Examinations",
            "Currently studying in Class 11 or 12 in a CBSE affiliated school",
            "Tuition fee in school should not exceed ₹1,500/month"
        ],
        "required_documents": [
            "CBSE Class 10 Board Marksheet (minimum 60%)",
            "Affidavit on ₹50 stamp paper affirming Single Girl Child status",
            "School Verification Certificate signed by Principal",
            "Cancelled Cheque / Bank Account Details"
        ]
    },
    {
        "id": "kotak_kanya_stem",
        "name": "Kotak Kanya Scholarship for Female STEM Scholars",
        "offered_by": "Kotak Education Foundation",
        "category_tags": ["Girl Child", "STEM", "Higher Education", "Open to All Castes", "Class 12"],
        "min_grade": "Class 12",
        "max_grade": "Class 12",
        "applicable_grades": ["Class 12"],
        "max_income": 600000,
        "target_genders": ["Female"],
        "target_categories": ["General", "OBC", "SC", "ST", "EWS", "All"],
        "award_amount": "Up to ₹1,50,000 / Year (covers Tuition, Hostel, Books)",
        "award_amount_num": 150000,
        "deadline": "September 30, 2026",
        "portal_url": "https://kotakeducation.org",
        "overview": "Empowers meritorious underprivileged girls who completed Class 12 with 85%+ marks to pursue STEM, Engineering, Medicine, and professional degrees without financial burden.",
        "eligibility_criteria": [
            "Meritorious girl student who scored 85%+ in Class 12 Board Exam",
            "Annual family income less than ₹6,00,000",
            "Secured admission into 1st year of professional/STEM undergraduate degree (B.Tech, MBBS, B.Sc)",
            "Open to all categories across India"
        ],
        "required_documents": [
            "Class 10 and 12 Board Marksheets (85%+ required)",
            "College Entrance Exam Scorecard & Seat Allotment Letter",
            "Family Income Proof (ITR / Salary Slip / Income Certificate)",
            "Aadhaar Card and Student Bank Account Details",
            "College Fee Structure & Fee Receipts"
        ]
    },
    {
        "id": "aicte_pragati_girls",
        "name": "AICTE Pragati Scholarship for Girl Students in STEM",
        "offered_by": "All India Council for Technical Education (AICTE)",
        "category_tags": ["Girl Child", "STEM", "Technical", "Open to All Castes", "Class 12"],
        "min_grade": "Class 12",
        "max_grade": "Class 12",
        "applicable_grades": ["Class 12"],
        "max_income": 800000,
        "target_genders": ["Female"],
        "target_categories": ["General", "OBC", "SC", "ST", "EWS", "All"],
        "award_amount": "₹50,000 / Year + College Tuition Reimbursement",
        "award_amount_num": 50000,
        "deadline": "December 31, 2026",
        "portal_url": "https://scholarships.gov.in",
        "overview": "Empowering girl students from families earning under ₹8 Lakhs across all castes to pursue Technical, Engineering, Computer Science, and STEM undergraduate degrees.",
        "eligibility_criteria": [
            "Female student admitted to 1st year degree/diploma technical STEM course",
            "Admitted through centralized counseling in AICTE-approved institution",
            "Family income less than ₹8,00,000 per annum",
            "Maximum 2 girls per family eligible"
        ],
        "required_documents": [
            "Class 10 and 12 Marksheets",
            "Annual Family Income Certificate (< ₹8 Lakhs)",
            "Tuition Fee Receipt for current academic year",
            "Aadhaar Card and Bank Account seeded with Aadhaar"
        ]
    },
    # ─── 2. TARGETED SOCIAL EQUITY & INCLUSION SCHEMES ───
    {
        "id": "pm_yasasvi",
        "name": "PM-YASASVI Top Class Education Scheme",
        "offered_by": "Ministry of Social Justice & Empowerment, Govt of India",
        "category_tags": ["OBC", "EBC", "DNT", "Class 10", "Class 11", "Class 12"],
        "min_grade": "Class 9",
        "max_grade": "Class 12",
        "applicable_grades": ["Class 9", "Class 10", "Class 11", "Class 12"],
        "max_income": 250000,
        "target_genders": ["All", "Male", "Female", "Other"],
        "target_categories": ["OBC", "EBC", "DNT"],
        "award_amount": "₹1,25,000 / Year (Class 11-12) | ₹75,000 / Year (Class 9-10)",
        "award_amount_num": 125000,
        "deadline": "October 31, 2026 (Annual Cycle)",
        "portal_url": "https://scholarships.gov.in",
        "overview": "Comprehensive financial support for meritorious students belonging to OBC, Economically Backward Classes (EBC), and De-Notified Nomadic Tribes (DNT) studying in top-class schools.",
        "eligibility_criteria": [
            "Student must belong to OBC, EBC, or DNT categories",
            "Annual family income must not exceed ₹2,50,000",
            "Must be studying in Class 9th, 10th, 11th, or 12th in a recognized school",
            "Qualifying score in YASASVI Entrance Test or top quartile board merit"
        ],
        "required_documents": [
            "Income Certificate issued by competent authority (< ₹2.5 Lakhs)",
            "Caste / Community Certificate (OBC/EBC/DNT)",
            "Aadhaar Card of the Student linked with Bank Account",
            "Previous Year Academic Marksheet (Class 8/9/10/11)",
            "School Bonafide / Enrollment Certificate"
        ]
    },
    {
        "id": "post_matric_sc_st",
        "name": "Post-Matric Scholarship for SC/ST/OBC Students",
        "offered_by": "Ministry of Social Justice / Tribal Affairs, Govt of India",
        "category_tags": ["SC", "ST", "OBC", "Post-Matric", "Class 11", "Class 12"],
        "min_grade": "Class 11",
        "max_grade": "Class 12",
        "applicable_grades": ["Class 11", "Class 12"],
        "max_income": 250000,
        "target_genders": ["All", "Male", "Female", "Other"],
        "target_categories": ["SC", "ST", "OBC"],
        "award_amount": "100% Non-Refundable Fee Waiver + ₹1,200/Month Maintenance",
        "award_amount_num": 35000,
        "deadline": "January 15, 2027",
        "portal_url": "https://scholarships.gov.in",
        "overview": "Comprehensive social equity initiative providing 100% compulsory tuition and examination fee reimbursement plus maintenance allowance for SC/ST/OBC students in senior secondary & college.",
        "eligibility_criteria": [
            "Student must belong to Scheduled Caste (SC), Scheduled Tribe (ST), or eligible OBC",
            "Family income from all sources must not exceed ₹2,50,000 per annum",
            "Enrolled in recognized Class 11, Class 12, or undergraduate institution",
            "Must have passed previous qualifying examination"
        ],
        "required_documents": [
            "Caste Certificate issued by Revenue Authority",
            "Current Financial Year Income Certificate (< ₹2.5 Lakhs)",
            "Fee Receipt of School / Junior College",
            "Aadhaar Number and Bank Passbook (DBT linked)",
            "Class 10 Board Marksheet"
        ]
    },
    {
        "id": "begum_hazrat_mahal",
        "name": "Begum Hazrat Mahal National Minority Girls Scholarship",
        "offered_by": "Maulana Azad Education Foundation, Ministry of Minority Affairs",
        "category_tags": ["Minority", "Girl Child", "Class 10", "Class 11", "Class 12"],
        "min_grade": "Class 9",
        "max_grade": "Class 12",
        "applicable_grades": ["Class 9", "Class 10", "Class 11", "Class 12"],
        "max_income": 200000,
        "target_genders": ["Female"],
        "target_categories": ["Minority", "Muslim", "Christian", "Sikh", "Buddhist", "Jain", "Parsi"],
        "award_amount": "₹6,000 / Year (Class 11-12) | ₹5,000 / Year (Class 9-10)",
        "award_amount_num": 6000,
        "deadline": "November 30, 2026",
        "portal_url": "https://scholarships.gov.in",
        "overview": "Financial assistance for meritorious girl students belonging to national minority communities (Muslims, Christians, Sikhs, Buddhists, Jains, Parsis) with family income under ₹2 Lakhs.",
        "eligibility_criteria": [
            "Female student belonging to notified Minority Community",
            "Minimum 50% marks in previous class exam",
            "Annual parental income not exceeding ₹2,00,000",
            "Studying in Classes 9th to 12th in recognized institution"
        ],
        "required_documents": [
            "Self-declaration of Minority Community",
            "Income Certificate issued by Tehsildar / Competent Authority",
            "Previous Year Academic Marksheet (50%+ marks)",
            "School Verification Form signed by Principal",
            "Aadhaar Linked Bank Passbook"
        ]
    }
]

def match_scholarships(profile: Dict[str, Any]) -> List[Dict[str, Any]]:
    """
    Intelligent Scholarship Matcher:
    Evaluates student profile (grade, family income, category, gender, stream)
    and computes a tailored match percentage, qualification status, and document checklist.
    """
    user_grade = profile.get("class_grade", "Class 10")
    user_income = float(profile.get("annual_income", 150000))
    user_category = profile.get("category", "General")
    user_gender = profile.get("gender", "Any")
    user_stream = profile.get("stream", "Science")

    results = []

    for sch in SCHOLARSHIPS_DATABASE:
        score = 0
        reasons = []
        is_eligible = True

        # 1. Grade match
        if user_grade in sch["applicable_grades"]:
            score += 30
        else:
            is_eligible = False
            reasons.append(f"Requires enrollment in {', '.join(sch['applicable_grades'])} (You selected {user_grade})")

        # 2. Income criterion
        if user_income <= sch["max_income"]:
            score += 30
        else:
            is_eligible = False
            reasons.append(f"Annual family income must be under ₹{sch['max_income']:,} (Your profile: ₹{int(user_income):,})")

        # 3. Category match
        if "All" in sch["target_categories"] or user_category in sch["target_categories"]:
            score += 20
        elif user_category == "EWS" and "General" in sch["target_categories"]:
            score += 20
        else:
            if not ("All" in sch["target_categories"] or user_category in sch["target_categories"]):
                is_eligible = False
                reasons.append(f"Restricted to {', '.join(sch['target_categories'])} categories")

        # 4. Gender match
        if "All" in sch["target_genders"] or user_gender in sch["target_genders"] or user_gender == "Any":
            score += 20
        else:
            if "Female" in sch["target_genders"] and user_gender != "Female":
                is_eligible = False
                reasons.append("Exclusive scholarship for Girl Students")

        final_score = min(100, max(15, score if is_eligible else int(score * 0.4)))

        results.append({
            **sch,
            "match_score": final_score,
            "is_eligible": is_eligible,
            "ineligibility_reasons": reasons,
            "application_status": "Eligible — Apply Now" if is_eligible else "Partially Matched / Criteria Gap"
        })

    # Sort descending by eligible status, then match score, then award amount
    results.sort(key=lambda x: (x["is_eligible"], x["match_score"], x["award_amount_num"]), reverse=True)
    return results

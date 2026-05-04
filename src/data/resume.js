/**
 * ─────────────────────────────────────────────────────
 *  RESUME DATA — single source of truth for the portfolio
 *  Edit this file to update any content across all apps.
 * ─────────────────────────────────────────────────────
 */

export const resume = {
  // ── Identity ──────────────────────────────────────
  name: 'Kusum Lingaraju',
  title: 'MS Applied Data Science Student',
  location: 'Los Angeles, California',
  phone: '(213) 587-0278',
  email: 'kusumlin@usc.edu',
  linkedin: 'https://www.linkedin.com/in/kusumlingaraju/',
  github: 'https://github.com/kusumlin',

  // ── Summary ───────────────────────────────────────
  summary:
    'Data science graduate student with strong foundations in statistics, probability, and machine learning, and experience conducting offline analyses on real-world datasets. Experienced in Python-based modeling, SQL-driven data exploration, and translating analytical findings into business and product insights. An engineering mindset shaped by working with complex, real-world systems.',

  // ── Education ─────────────────────────────────────
  education: [
    {
      school: 'University of Southern California',
      location: 'Los Angeles, CA',
      degree: 'Master of Science in Applied Data Science',
      period: 'Aug 2025 – May 2027',
      gpa: '4.0 / 4.0',
      coursework: ['Foundations of Data Management', 'Machine Learning', 'Data Mining'],
    },
    {
      school: 'Visveswaraya Technological University',
      location: 'Bengaluru, KA',
      degree: 'Bachelor of Engineering',
      period: 'Aug 2018 – Jul 2022',
      gpa: '8.94 / 10',
      coursework: [
        'Python Programming',
        'Java',
        'Industrial Engineering',
        'Statistics',
        'Supply Chain and Management',
      ],
    },
  ],

  // ── Experience ────────────────────────────────────
  experience: [
    {
      company: 'Weir Minerals',
      location: 'Bengaluru, KA',
      role: 'Design Engineer',
      period: 'Aug 2023 – May 2025',
      bullets: [
        'Conducted data analysis on large-structured engineering datasets using Python to identify patterns, evaluate design parameters, and support data-driven decision making — improving standardization by 15%.',
        'Built Python-based automation pipelines to reduce operational lead time by 21%, balancing analytical rigor with real-world constraints.',
        'Collaborated cross-functionally with engineers and stakeholders to translate requirements into measurable, data-backed improvements.',
      ],
    },
    {
      company: 'Compsoft Technologies',
      location: 'Bengaluru, KA',
      role: 'Machine Learning Intern',
      period: 'Aug 2021 – Sept 2021',
      bullets: [
        'Performed statistical analysis and predictive modeling on large-scale Twitter data using Python, pandas, NumPy, and scikit-learn.',
        'Built and evaluated machine learning models for sentiment classification, focusing on feature engineering, model performance, and interpretability.',
        'Communicated analytical findings to non-technical stakeholders to support market research decisions.',
      ],
    },
  ],

  // ── Skills ────────────────────────────────────────
  // Each category maps to an array of skill strings.
  skills: {
    'Programming & Data Analysis': ['Python', 'SQL', 'R'],
    'Data Analysis & Statistics': [
      'Exploratory Data Analysis (EDA)',
      'Statistical Analysis',
      'Regression Analysis',
    ],
    Databases: ['MySQL', 'PostgreSQL', 'MongoDB', 'Hadoop'],
    'Big Data & Processing': ['Apache Spark', 'PySpark', 'Scala'],
    'Data Visualization': ['Tableau', 'Power BI', 'Matplotlib', 'Seaborn', 'Plotly'],
    'Machine Learning': [
      'Supervised Learning (Regression, Classification)',
      'Unsupervised Learning (Clustering, Dimensionality Reduction)',
      'NLP',
    ],
  },

  // ── Projects ──────────────────────────────────────
  // Add github / demo URLs once available.
  projects: [
    {
      title: 'ML Model for TikTok Video Classification',
      description:
        'Engineered a machine learning pipeline to classify TikTok videos as claims or opinions, accelerating content moderation workflows and reducing manual review time by 15%.',
      tech: ['Python', 'TensorFlow', 'pandas', 'scikit-learn'],
      impact: '15% reduction in review time',
      github: null,
      demo: null,
      gradient: 'from-pink-400 via-fuchsia-400 to-purple-500',
      accentColor: '#d946ef',
    },
    {
      title: 'Early Deterioration Indicator for ICU Patients',
      description:
        'Implemented Naive Bayes–based risk curves using patient vitals (HR, RR, BP, Temp, SpO₂, LOC, Age) to generate clinically interpretable early deterioration index (EDI) scores ranging 0–1.0.',
      tech: ['Python', 'NumPy', 'pandas', 'scikit-learn', 'matplotlib'],
      impact: 'Predictive EDI scoring (0–1.0 instability probability)',
      github: null,
      demo: null,
      gradient: 'from-sky-400 via-blue-400 to-indigo-500',
      accentColor: '#38bdf8',
    },
    {
      title: 'Data Analytics in Healthcare Sector',
      description:
        'Published research paper applying predictive modeling to patient care data at the 12th International Conference on Engineering & Natural Sciences (Dec 2021).',
      tech: ['Python', 'Predictive Modeling', 'Data Analytics'],
      impact: 'Published at international conference — Dec 2021',
      github: null,
      demo: null,
      gradient: 'from-emerald-400 via-teal-400 to-cyan-500',
      accentColor: '#34d399',
    },
  ],

  // ── Achievements ──────────────────────────────────
  achievements: [
    {
      title: '2nd Place — Context Engineering Award',
      detail: 'Good Vibes Only Hackathon, 2025',
    },
    {
      title: 'Sponsorship Head',
      detail: 'University Techno-Cultural Fest Verve, 2020–2022 — led outreach and stakeholder engagement.',
    },
    {
      title: 'Volunteer — Yodha',
      detail: 'Community service initiatives focused on social outreach and public welfare.',
    },
  ],
}

import auLogo from '../assets/AU-Logo.png';
import iitLogo from '../assets/IITM-Logo.png';
import azureAiLogo from '../assets/Azure AI Engineer Associate.png';
import azureDsLogo from '../assets/Azure Data Science Associate.png';
import gcpMlLogo from '../assets/GCP ML Engineer Professional.png';
import databricksLogo from '../assets/Databricks ML Engineer.png';

export const content = {
    hero: {
        name: "Neeraj",
        role: "AI/ML Engineer",
        tagline: "Building robust, scalable AI systems for real-world impact.",
        resumeLink: "/Neeraj_AIML_CTS.pdf",
        profileImage: "/Neeraj_LinkedIn.png",
    },
    about: {
        summary: [
            "I am a system-oriented AI/ML Engineer with a focus on building production grade AI / LLM / ML and scalable applications.",
            "My approach is grounded in engineering principles—valuing clarity, maintainability, and performance, reliability, and scalability. I enjoy solving complex structural problems and translating theoretical models into tangible solutions.",
            "Currently focusing on AI/ML applications and efficient model deployment strategies."
        ]
    },
    education: [
        {
            period: "2020–2024",
            institution: "ANDHRA UNIVERSITY",
            degree: "B.Tech — Computer Science Engineering",
            focus: "Focus: systems, DSA, CS fundamentals",
            logo: auLogo,
            coursework: ["Data Structures", "Algorithms", "OS", "DBMS", "Computer Networks", "Compiler Design"]
        },
        {
            period: "2021–2026",
            institution: "IIT MADRAS",
            degree: "BSc — Data Science & Programming",
            focus: "Focus: machine learning, statistics, applied AI",
            logo: iitLogo,
            coursework: ["Statistics 1 & 2", "Machine Learning", "Deep Learning", "Business Analytics", "Python"]
        }
    ],
    certifications: [
        {
            name: "Azure AI Engineer Associate",
            id: "AI-102",
            issuer: "Microsoft",
            date: "2024",
            style: "cyan",
            image: azureAiLogo,
            link: "https://learn.microsoft.com/en-us/users/pachipulusuvenkatasairatnaneeraj-3230/credentials/b0b6d74dec76d188"
        },
        {
            name: "Azure Data Science Associate",
            id: "DP-100",
            issuer: "Microsoft",
            date: "2024",
            style: "cyan",
            image: azureDsLogo,
            link: "https://learn.microsoft.com/en-us/users/pachipulusuvenkatasairatnaneeraj-3230/credentials/f37ca6db177b541e"
        },
        {
            name: "Professional Machine Learning Engineer",
            id: "GCP-MLE",
            issuer: "Google Cloud",
            date: "2024",
            style: "yellow",
            image: gcpMlLogo,
            link: "https://www.credly.com/badges/7cefd456-6e38-4a59-850a-32f2db055e2d"
        },
        {
            name: "Databricks Certified Machine Learning Professional",
            id: "DB-ML-PRO",
            issuer: "Databricks",
            date: "2024",
            style: "red",
            image: databricksLogo,
            link: "https://credentials.databricks.com/d6c6b3e0-d7be-4109-a1d1-d9dd81b5b47a"
        }
    ],
    skills: [
        {
            category: "Languages",
            items: [
                { name: "Python", icon: "https://cdn.simpleicons.org/python" },
                { name: "R", icon: "https://cdn.simpleicons.org/r" },
                { name: "SQL", icon: "https://cdn.simpleicons.org/postgresql" }
            ]
        },
        {
            category: "Data Science & ML",
            items: [
                { name: "Pandas", icon: "https://cdn.simpleicons.org/pandas" },
                { name: "NumPy", icon: "https://cdn.simpleicons.org/numpy" },
                { name: "Scikit-Learn", icon: "https://cdn.simpleicons.org/scikitlearn" },
                { name: "NLP", icon: "https://cdn.simpleicons.org/spaCy" },
                { name: "TimeSeries Forecasting", icon: "https://cdn.simpleicons.org/scipy" },
                { name: "ETL", icon: "https://cdn.simpleicons.org/apacheairflow" },
                { name: "MLOps", icon: "https://cdn.simpleicons.org/mlflow" }
            ]
        },
        {
            category: "GenAI",
            items: [
                { name: "Prompt Engg", icon: "https://cdn.simpleicons.org/openai" },
                { name: "ReAct", icon: "https://cdn.simpleicons.org/langchain" },
                { name: "MCP", icon: "https://cdn.simpleicons.org/anthropic" },
                { name: "RAG Pipeline", icon: "https://cdn.simpleicons.org/haystack" },
                { name: "VectorDB", icon: "https://cdn.simpleicons.org/pinecone" },
                { name: "LangChain", icon: "https://cdn.simpleicons.org/langchain" },
                { name: "LangGraph", icon: "https://cdn.simpleicons.org/langchain" },
                { name: "LLaMA", icon: "https://cdn.simpleicons.org/meta" },
                { name: "FastAPI", icon: "https://cdn.simpleicons.org/fastapi" },
                { name: "HuggingFace", icon: "https://cdn.simpleicons.org/huggingface" }
            ]
        },
        {
            category: "Cloud & DevOps",
            items: [
                { name: "Google Cloud (GCP)", icon: "https://cdn.simpleicons.org/googlecloud" },
                { name: "Git", icon: "https://cdn.simpleicons.org/git" }
            ]
        }
    ],
    experience: [
        {
            host: "Cognizant (CTS)",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Cognizant_logo_2022.svg/1200px-Cognizant_logo_2022.svg.png",
            style: "blue",
            roles: [
                {
                    title: "Jr. AI Engineer",
                    type: "Full-time",
                    period: "Nov 2024 – Present",
                    location: "Hybrid",
                    status: "RUNNING",
                    focus: "Agentic AI, RAG, BFSI document intelligence, GCP, Vertex AI",
                    techStack: ["Python", "Vertex AI", "LangChain", "GCP"]
                },
                {
                    title: "Responsible AI Champion",
                    type: "Part-time",
                    period: "Nov 2025 – Present",
                    location: "Remote",
                    status: "RUNNING",
                    focus: "AI ethics, governance, privacy, XAI",
                    techStack: ["Python", "FATE", "FairLearn", "AIF360"]
                },
                {
                    title: "Jr. Data Engineer",
                    type: "Full-time",
                    period: "Mar 2025 – Jun 2025",
                    location: "Hyderabad, Telangana • Hybrid",
                    status: "EXIT_SUCCESS",
                    focus: "Data Warehouse Migration (BFSI), GCP, Informatica IICS",
                    techStack: ["SQL", "BigQuery", "Informatica", "GCP"]
                },
                {
                    title: "Programmer Analyst Trainee",
                    type: "Full-time",
                    period: "Nov 2024 – Feb 2025",
                    location: "Hyderabad, Telangana • Hybrid",
                    status: "EXIT_SUCCESS",
                    focus: "Data Science & ML Training, Python, SQL",
                    techStack: ["Python", "SQL", "Pandas", "Scikit-learn"]
                }
            ]
        },
        {
            host: "Google Cloud Community India",
            logo: "https://cdn.simpleicons.org/googlecloud/4285F4", // Use colored icon
            style: "cyan",
            roles: [
                {
                    title: "Google Cloud Jams Facilitator",
                    type: "Facilitator",
                    period: "Aug 2023 – Jul 2024",
                    location: "Remote",
                    status: "EXIT_SUCCESS",
                    focus: "Guided 150+ learners in GCP and GenAI",
                    techStack: ["GCP", "GenAI", "Cloud Skills Boost"]
                }
            ]
        },
        {
            host: "National Institute of Urban Management (NIUM)",
            logo: "", // Placeholder or generic building icon
            style: "emerald",
            roles: [
                {
                    title: "Full Stack Developer Intern",
                    type: "Internship",
                    period: "Jun 2023 – Aug 2023",
                    location: "On-site",
                    status: "EXIT_SUCCESS",
                    focus: "Web-GIS, AWS deployment",
                    techStack: ["React", "Node.js", "AWS", "PostGIS"]
                }
            ]
        },
        {
            host: "Fluentgrid Limited",
            logo: "", // Placeholder
            style: "orange",
            roles: [
                {
                    title: "Software Engineer Intern",
                    type: "Internship",
                    period: "Jan 2023 – Feb 2023",
                    location: "On-site",
                    status: "EXIT_SUCCESS",
                    focus: "Enterprise integration, Java, Oracle DB",
                    techStack: ["Java", "Oracle SQL", "JDBC"]
                }
            ]
        }
    ],
    projects: [
        {
            id: "guardian-app",
            title: "Guardian App",
            summary: "A comprehensive women's safety application with real-time location tracking and emergency response features.",
            content: `
# Guardian App

A robust mobile application designed to enhance personal safety, specifically focused on women's security in urban environments.

## Key Features
- **Real-time Location Tracking**: Uses Google Maps API to share live location with trusted contacts.
- **SOS Alert System**: One-tap emergency trigger that sends SMS and location data to emergency contacts.
- **Geofencing**: Alerts when moving outside designated safe zones.
- **Fake Call**: Simulates an incoming call to help users exit uncomfortable situations.

## Tech Stack
- **Frontend**: Flutter (Dart)
- **Backend**: Firebase (Auth, Firestore, Cloud Functions)
- **APIs**: Google Maps SDK, Twilio (SMS)

This project was built to address the growing need for accessible personal safety tools.
            `,
            techStack: ["Flutter", "Firebase", "Google Maps API", "Dart"],
            link: "#",
            image: "https://images.unsplash.com/photo-1555421689-d68471e88984?q=80&w=1200"
        },
        {
            id: "deepfake-detector",
            title: "Deepfake Detector",
            summary: "A deep learning system to detect manipulated facial media using CNNs and frequency analysis.",
            content: `
# Deepfake Detector

An advanced Computer Vision system capability of identifying AI-generated facial manipulations in video content.

## Methodology
- **Frame Extraction**: Splits video into individual frames for analysis.
- **Face Detection**: Uses MTCNN to isolate faces.
- **Frequency Analysis**: Analyzes DCT (Discrete Cosine Transform) artifacts often left by GANs.
- **Classification**: A finetuned Mesonet / Xception network classifies the frame as REAL or FAKE.

## Performance
- Achieved **92% accuracy** on the FaceForensics++ dataset.
- Real-time inference capabilities on standard GPU hardware.

## Tech Stack
- **Languages**: Python
- **ML Frameworks**: PyTorch, OpenCV, Scikit-learn
- **Architecture**: CNNs (Convolutional Neural Networks)
            `,
            techStack: ["Python", "PyTorch", "OpenCV"],
            link: "#",
            image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200"
        },
        {
            id: "portfolio",
            title: "Portfolio",
            summary: "This minimal, performance-focused portfolio website.",
            content: `
# Neeraj's Portfolio

The website you are currently viewing. Designed to mimic a **Terminal / System Console** interface while maintaining modern web usability.

## Design Philosophy
- **Minimalism**: No unnecessary bloat. "Digital Minimalism in UI".
- **Performance**: Built with Vite and React for instant processing.
- **Thematic**: Consistent "Hacker / Engineer" aesthetic using Monospace fonts and terminal-like logs.

## Architecture
- **Framework**: React 19 + TypeScript
- **Styling**: TailwindCSS
- **Routing**: React Router (Master-Detail Architecture)
- **Hosting**: GitHub Pages / Vercel

## Features
- Interactive "Card Decks" for blogs.
- System-log styled experience timeline.
- Dynamic routing for projects and logs.
            `,
            techStack: ["React", "TypeScript", "Vite"],
            link: "#",
            image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200"
        }
    ],
    contact: {
        email: "neerajpachipulusuvsr@gmail.com", // Placeholder
        linkedin: "https://linkedin.com/in/neerajpvsr", // Placeholder
        github: "https://github.com/neerajpvsr" // Placeholder
    }
};

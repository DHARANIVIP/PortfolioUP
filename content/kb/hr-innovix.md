# Project: HR-Innovix — Autonomous AI Recruitment Agent

## Overview
HR-Innovix is an autonomous recruitment agent engineered to eliminate manual screening bottlenecks by parsing candidate resumes and semantically matching applicant qualifications against detailed job descriptions in real time.

## Key Information
- **Category**: AI Recruitment Agent
- **Role**: Full-Stack Developer
- **Focus**: Autonomous AI Agents & Workflow Automation
- **Live Demo**: https://hr-innovix-agent.vercel.app
- **GitHub**: https://github.com/DHARANIVIP

## Tech Stack
- **Frontend**: React.js, Tailwind CSS
- **Backend API**: Node.js
- **AI Engine**: Gemini API
- **Processing**: Batch document parsing and structured profile matching

## Architecture & Data Flow
1. **Client**: Recruiter dashboard built with React and Tailwind CSS for managing candidate pipelines and job descriptions.
2. **Node.js API**: Handles document uploads, pipeline orchestration, and caching.
3. **Gemini API Engine**: Extracts structured candidate entities (skills, experience, education, domain expertise) and performs semantic cross-matching against uploaded job descriptions.
4. **Candidate Ranking Output**: Delivers an ordered shortlist ranked by match percentage with concise analytical justifications.

## Key Features & Capabilities
- **Structured Resume Parsing**: Ingests PDF and DOCX resumes, extracting structured candidate profiles at scale using Gemini.
- **Semantic Job Matching**: Goes beyond keyword search to understand candidate skills in context with nuanced job description requirements.
- **Low-Latency Pipeline**: Optimized API requests and caching minimize wait times during screening batches.
- **Searchable Recruiter UI**: Live interactive dashboard featuring ranked candidate cards and filterable score breakdowns.
- **Export & Collaboration**: Shortlists can be exported to CSV or shared via dedicated links for hiring committee review.

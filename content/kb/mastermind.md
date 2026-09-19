# Project: Mastermind — AI Career Guidance System

## Overview
Mastermind is an intelligent career guidance platform designed to parse resumes, identify granular skill gaps, and generate personalized, step-by-step learning roadmaps for aspiring software and tech professionals.

## Key Information
- **Category**: AI Career Guidance System
- **Role**: Full-Stack Developer (Frontend + Backend) & Technical Team Lead
- **Focus**: Product Architecture & AI Integration
- **Status**: Shipped in a 2-week sprint at Touchmark Descience; won 1st place
- **Live Demo**: https://team-8-95a3.vercel.app
- **GitHub**: https://github.com/DHARANIVIP

## Tech Stack
- **Frontend**: Next.js 16
- **Backend API**: Express.js, Node.js
- **LLM Engine**: Gemini 2.5 Flash
- **Databases**: Dual-database architecture — MongoDB Atlas and Supabase (PostgreSQL)
- **Security**: Stateless JWT authentication with access/refresh tokens

## Architecture & Data Flow
1. **Client**: Next.js 16 frontend interface where users upload resumes (PDF/DOCX) and view interactive dashboards.
2. **API Layer**: Express.js server orchestrating auth, request validation, and AI pipelines.
3. **LLM Engine**: Gemini 2.5 Flash performs structured information extraction from candidate resumes and generates structured learning roadmaps.
4. **Data Persistence**:
   - **MongoDB Atlas**: Stores user authentication records, profile metadata, and analytical metrics.
   - **Supabase (PostgreSQL)**: Handles relational course catalogs, roadmap steps, and learning resources.
5. **Live Output**: Interactive user roadmap displaying skills completed, gap score, and course progress.

## Key Features & Capabilities
- **Resume Parsing Pipeline**: Ingests resumes and uses Gemini structured outputs to extract verified skills, education, and experience.
- **Skill-Gap Detection Engine**: Compares extracted candidate skill sets against specific target roles to highlight exact learning deficits.
- **Dynamic Learning Roadmap Generator**: Generates customized, prioritized learning tracks tailored to the candidate's existing strengths and weaknesses.
- **Dual-Database Reliability**: Leverages MongoDB for flexible document auth/metrics and PostgreSQL for strict relational course structures.
- **User Dashboard**: Real-time progress tracker with visual metrics on completed milestones and recommended courses.

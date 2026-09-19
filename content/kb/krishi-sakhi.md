# Project: Krishi Sakhi — RAG-Powered Agricultural Assistant

## Overview
Krishi Sakhi is an AI-powered agricultural assistant that combines Retrieval-Augmented Generation (RAG) and n8n visual workflows to automate real-time crop health diagnostics and localized weather insights for farmers, designed specifically to operate reliably in low-bandwidth rural conditions.

## Key Information
- **Category**: AI Farming Assistant / Agricultural Advisor
- **Role**: AI / Automation Engineer
- **Focus**: RAG Systems & Workflow Automation
- **Live Demo**: https://krishi-sakhi-smoky.vercel.app
- **GitHub**: https://github.com/DHARANIVIP

## Tech Stack
- **Workflow Automation**: n8n Workflow Orchestrator
- **Retrieval Architecture**: Retrieval-Augmented Generation (RAG) with VectorDB
- **Backend**: Node.js
- **Data Integrations**: Live weather APIs, agricultural domain vector database

## Architecture & Data Flow
1. **Farmer Query**: Ingests natural language agricultural inquiries from farmers across mobile devices.
2. **n8n Orchestrator**: Coordinates multi-stage data flow — query classification, vector retrieval, weather data aggregation, and final response synthesis.
3. **RAG Retrieval Layer**: Queries a specialized vector database containing agronomy knowledge, pest control protocols, and crop lifecycle management docs.
4. **Node.js Backend**: Handles API routing, weather API telemetry fetching, and response formatting.
5. **Crop Health & Weather Output**: Delivers actionable, concise, localized guidance tailored to current climatic conditions.

## Key Features & Capabilities
- **Domain-Specific RAG Retrieval**: Fetches grounded agricultural facts from a curated vector store to prevent hallucinations.
- **n8n Automation Engine**: Eliminates custom glue code by connecting data pipelines and external APIs visually and reliably.
- **Real-Time Weather Integration**: Merges live meteorological data with crop recommendations to provide situationally appropriate guidance.
- **Low-Bandwidth Optimization**: Engineered with lightweight response payloads so rural users with intermittent 2G/3G connectivity receive fast answers.
- **Natural Language Understanding**: Accepts everyday vernacular farmer queries without requiring complex technical terminology.

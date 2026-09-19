# Project: Sentinel AI — Real-Time Deepfake Detection System

## Overview
Sentinel AI is a high-performance deepfake detection system that leverages deep convolutional neural networks (CNNs) to analyze video streams and detect manipulated or synthesized media in real time, streaming threat probabilities directly to a live dashboard with sub-second latency.

## Key Information
- **Category**: Deepfake Detection System
- **Role**: Deep Learning Engineer & Frontend Developer
- **Focus**: AI/ML Inference & Real-Time Security Systems
- **Live Demo**: https://deep-detection.vercel.app
- **GitHub**: https://github.com/DHARANIVIP

## Tech Stack
- **Deep Learning**: Python, PyTorch, Convolutional Neural Networks (CNNs)
- **Frontend**: React.js, Tailwind CSS
- **Pipeline**: Temporal Feature Analysis & Video Frame Extraction

## Architecture & Data Flow
1. **Client**: React.js web dashboard where users upload video files or connect live video streams.
2. **Video Frame Capture**: Ingests video and samples frames at configurable intervals for downstream evaluation.
3. **CNN Inference Engine**: PyTorch-powered deep learning model classifies individual frames as genuine or manipulated.
4. **Temporal Feature Analysis**: Evaluates temporal coherence and cross-frame anomalies across sequential frames to capture subtle manipulation artifacts.
5. **Live Threat Dashboard**: Streams threat probabilities to the client interface in real time without requiring page refreshes.

## Key Features & Capabilities
- **Frame-by-Frame Ingestion**: Extracts and processes video frames smoothly.
- **CNN Temporal Evaluation**: Cross-frame analysis improves detection accuracy compared to isolated single-frame models.
- **Sub-Second Latency**: Optimized inference pipeline delivers rapid detection metrics on modern hardware.
- **Real-Time Threat Dashboard**: Visualizes live probability scores, highlights flagged frames, and surfaces detection confidence.
- **Threat Reporting**: Generates exportable detection summaries with timestamped frames for security audits.

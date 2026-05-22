# FocusFlow AI Implementation Plan

## Overview
We will build **FocusFlow AI**, a modern, AI-powered web application designed to help users improve productivity, manage distractions, and build healthier work habits.

## Design & UI Choices
- **Layout**: Dashboard with a robust side navigation menu.
- **Color Palette**: Sky & Peach (`#e0f2fe`, `#7dd3fc`, `#fecaca`, `#f9a8a8`) to create a cheerful, calming, and optimistic experience.
- **Typography**: *Outfit* for crisp headings and *Figtree* for highly readable body text.
- **Components**: Modern cards, buttons, and clear loading states for AI interactions (using Tailwind CSS & shadcn/ui).

## Core Features
1. **AI Task Planner / Scheduler**
   - Form inputs for users to enter tasks, priorities, and available time blocks.
   - AI generation of a structured daily/weekly schedule.
   - Incorporation of focus techniques (e.g., Pomodoro) and strategic break times.

2. **Smart Email Generator**
   - Options to select tone (formal, informal, persuasive) and audience (managers, teams, clients).
   - Input fields for context and key points.
   - An editable output section for the user to tweak the generated email.

3. **AI Productivity Coach Chatbot**
   - An interactive, conversational chat interface.
   - Configured with a system prompt to provide motivational advice, address procrastination, and offer healthy productivity suggestions.
   - Streaming responses for a fast, responsive feel.

4. **Responsible AI Section**
   - A dedicated view and persistent disclaimers highlighting that AI responses should be verified, user privacy is prioritized, and the tool is not a substitute for medical or psychological treatment.

## Technical Architecture
- **Frontend**: React (Vite/TanStack Start).
- **AI Integration**: Lovable AI Gateway securely accessed via Lovable Cloud Edge Functions to stream responses without exposing API keys on the client.
- **Navigation**: React Router to seamlessly switch between the Dashboard, Task Planner, Email Generator, Coach Chatbot, and Information sections.
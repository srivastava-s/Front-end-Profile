export type Project = {
  id: string
  title: string
  role: string
  stack: string[]
  summary: string
  github?: string
  demo?: string
}

export const projects: Project[] = [
  {
    id: 'youtube-bookmarker',
    title: 'YouTube Bookmarker Chrome Extension',
    role: 'Frontend UI Engineer',
    stack: ['React', 'TypeScript', 'Chrome Extension', 'REST APIs'],
    summary:
      'Built a responsive extension UI for bookmarking and managing YouTube videos with smooth interactions and real-time sync.',
    github: 'https://github.com/srivastava-s/Youtube-bookmarker-Chrome-Extension',
  },
  {
    id: 'deepinspect-ai',
    title: 'DeepInspect AI Dashboard',
    role: 'Frontend Engineer',
    stack: ['React', 'Power BI', 'Data Visualization'],
    summary:
      'Security analytics dashboard that visualizes network threats and alerts in real time with a focus on clarity and speed.',
    github: 'https://github.com/srivastava-s/AI-Based-Network-Security-System',
  },
  {
    id: 'ai-meeting-summarizer',
    title: 'AI Meeting Summarizer',
    role: 'Full Stack with Frontend Focus',
    stack: ['React', 'Responsive UI', 'File Upload', 'OpenAI API'],
    summary:
      'Productivity app with a modern React interface for uploading transcripts, configuring prompts, and reviewing AI summaries.',
    github: 'https://github.com/srivastava-s/AI-Meeting-Summarizer',
  },
  {
    id: 'weather-app',
    title: 'Weather App',
    role: 'Frontend Developer',
    stack: ['HTML', 'CSS', 'JavaScript'],
    summary:
      'Lightweight weather interface for quick lookups with a clean, minimal layout.',
    github: 'https://github.com/srivastava-s/Weather-app',
  },
]



# JobQuest Application Tracker

A modern web application for tracking job applications built with React, TypeScript, Tailwind CSS, and shadcn/ui.

![JobQuest jobs page](https://github.com/nuraly-v/JobQuest/blob/main/public/screenshots/image.png?raw=true)

## Features

- **Dashboard**: Visualize application statistics with charts and summaries
- **Application Management**: Add, edit, and track applications
- **Status Tracking**: Monitor applications across different stages (Applied, Interview, Offer, Rejected, Pending)
- **Search & Filter**: Easily find applications by company, position, or location

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Recharts for data visualization
- shadcn/ui component library
- React Router for navigation

## Screenshots of the app

![JobQuest Applications page](https://github.com/nuraly-v/JobQuest/blob/main/public/screenshots/image2.png?raw=true)
![JobQuest Applications page - search feature](https://github.com/nuraly-v/JobQuest/blob/main/public/screenshots/image3.png?raw=true)
![Add Application modal](https://github.com/nuraly-v/JobQuest/blob/main/public/screenshots/image4.png?raw=true)
![Dashboard](https://github.com/nuraly-v/JobQuest/blob/main/public/screenshots/image5.png?raw=true)

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

# 📁 Project Structure — Job Application Tracker

```plaintext
job-application-tracker/
├── public/                 # Static assets (images, icons, etc.)
├── src/
│   ├── components/         # UI components
│   │   ├── applications/   # Components related to job applications
│   │   ├── dashboard/      # Components for the dashboard UI
│   │   └── ui/             # Reusable UI components (buttons, modals, etc.)
│   ├── context/            # React context providers
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility and helper functions
│   ├── pages/              # Top-level page components
│   └── types/              # TypeScript type definitions and interfaces
├── index.html              # HTML entry point
└── package.json            # Project dependencies and scripts
```

Usage
Dashboard

The dashboard provides an overview of your job applications with:

    Status counts (Applied, Interview, Offer, Rejected, Pending)
    Monthly application trends
    Application status distribution
    Recent application activity

Managing Applications

    View Applications: Browse all applications with filtering options
    Add Application: Track new job applications with company, position, and status details
    Edit Application: Update application details as they progress
    Delete Application: Remove applications you no longer want to track

Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
License

This project is licensed under the MIT License - see the LICENSE file for details.

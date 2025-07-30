# Mortgage Calculator

A modern, responsive mortgage overpayment calculator built with Next.js, React, TypeScript, and Tailwind CSS. Features a professional FANG-style UI using shadcn/ui components.

## Features

- **Mortgage Amount Calculator**: Calculate monthly payments based on loan amount and deposit
- **Overpayment Calculator**: See how overpayments can reduce your mortgage term and total interest
- **Payment Frequency Options**: Choose between monthly, fortnightly, or weekly payments
- **Interactive Sliders**: Easy-to-use UI for adjusting mortgage parameters
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, professional interface inspired by FANG company design standards

## Tech Stack

- **Framework**: Next.js 13 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui with Radix UI primitives
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd mortgage-calculator
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This project is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Deploy with zero configuration

## Project Structure

```
mortgage-calculator/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── header.tsx        # Site header
│   ├── footer.tsx        # Site footer
│   └── mortgage-calculator.tsx  # Main calculator component
├── lib/                  # Utility functions
│   └── utils.ts          # Class name utilities
└── public/               # Static assets
```

## License

MIT License - feel free to use this project for your own purposes.

"use client"

import React from 'react'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 text-blue-600"
          >
            <path d="M2 22h20V2L2 22Z" />
            <path d="m4 10 8-3 8 3" />
            <path d="M12 7v13" />
          </svg>
          <span className="text-xl font-bold text-gray-900">MortgageCalc</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
            About
          </Link>
          <Link href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
            Guides
          </Link>
          <Link href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
            Contact
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <a 
            href="#" 
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Get Started
          </a>
        </div>
      </div>
    </header>
  )
}

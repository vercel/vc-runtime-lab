'use client'

import { useState, useRef } from 'react'

const SUGGESTIONS = [
  'Oak platform bed',
  'Linen headboard',
  'Memory foam mattress',
  'Pocket sprung king mattress',
  'Velvet wingback headboard',
  'Bedside table',
]

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = query.length > 1
    ? SUGGESTIONS.filter((s) => s.toLowerCase().includes(query.toLowerCase()))
    : []

  const showDropdown = focused && (query.length > 1 ? filtered.length > 0 : false)

  return (
    <div className="relative w-full">
      <div className="flex items-center border border-neutral-300 focus-within:border-black transition-colors px-3 py-2 gap-2 bg-white">
        <svg
          className="text-neutral-400 flex-shrink-0"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          ref={inputRef}
          type="search"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          className="flex-1 text-sm outline-none bg-transparent placeholder:text-neutral-400 min-w-0"
          aria-label="Search Shop"
          aria-autocomplete="list"
          aria-expanded={showDropdown}
        />
        {query && (
          <button
            onClick={() => { setQuery(''); inputRef.current?.focus() }}
            className="text-neutral-400 hover:text-black transition-colors"
            aria-label="Clear search"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {showDropdown && (
        <ul
          role="listbox"
          className="absolute top-full left-0 right-0 bg-white border border-neutral-200 shadow-lg z-50 mt-px"
        >
          {filtered.map((suggestion) => (
            <li
              key={suggestion}
              role="option"
              aria-selected={false}
              className="px-4 py-2.5 text-sm hover:bg-neutral-50 cursor-pointer flex items-center gap-2"
              onMouseDown={() => setQuery(suggestion)}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-neutral-400">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

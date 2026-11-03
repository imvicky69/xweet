"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { Search, ChevronDown, Check, Globe, Send, Loader2 } from "lucide-react";
import { COUNTRIES, Country } from "@/data/countries";

interface CountryGuessPanelProps {
  selectedCountry: Country | null;
  onSelectCountry: (country: Country) => void;
  onSubmitGuess: () => void;
  isSubmitting: boolean;
  disabled?: boolean;
}

export default function CountryGuessPanel({
  selectedCountry,
  onSelectCountry,
  onSubmitGuess,
  isSubmitting,
  disabled = false,
}: CountryGuessPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(0);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredCountries = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return COUNTRIES;
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(term) ||
        c.code.toLowerCase().includes(term) ||
        c.continent.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev + 1 < filteredCountries.length ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : filteredCountries.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCountries[focusedIndex]) {
        onSelectCountry(filteredCountries[focusedIndex]);
        setIsOpen(false);
        setSearchTerm("");
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
    }
  };

  return (
    <div className="w-full bg-paper border border-terrain/30 rounded-3xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Searchable Dropdown Container */}
      <div ref={dropdownRef} className="relative w-full sm:flex-1">
        <label className="block text-[11px] font-mono uppercase tracking-wider text-terrain mb-1.5">
          Select Country
        </label>

        {/* Selected Display Trigger */}
        <button
          type="button"
          onClick={() => {
            if (!disabled) {
              setIsOpen((prev) => !prev);
              setTimeout(() => inputRef.current?.focus(), 50);
            }
          }}
          onKeyDown={handleKeyDown}
          disabled={disabled || isSubmitting}
          className={`w-full px-4 py-3 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
            disabled
              ? "bg-terrain/10 border-terrain/20 cursor-not-allowed text-terrain"
              : isOpen
              ? "bg-white border-carbon ring-2 ring-carbon/10 shadow-xs"
              : selectedCountry
              ? "bg-white/80 border-terrain/50 hover:border-carbon text-carbon"
              : "bg-white/60 border-terrain/35 hover:border-terrain text-terrain"
          }`}
        >
          <div className="flex items-center gap-3">
            <Globe className="w-4 h-4 text-terrain shrink-0" />
            {selectedCountry ? (
              <span className="text-sm font-medium text-carbon inline-flex items-center gap-2">
                <span className="text-xl">{selectedCountry.flag}</span>
                <span>{selectedCountry.name}</span>
                <span className="text-xs font-mono text-terrain">({selectedCountry.code})</span>
              </span>
            ) : (
              <span className="text-sm text-terrain font-normal">Choose or search a country...</span>
            )}
          </div>
          <ChevronDown
            className={`w-4 h-4 text-terrain transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown Popover */}
        {isOpen && (
          <div className="absolute bottom-full mb-2 left-0 right-0 sm:bottom-auto sm:top-full sm:mt-2 z-50 bg-paper border border-terrain/40 rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[320px] animate-in fade-in">
            {/* Search Input */}
            <div className="p-3 border-b border-terrain/20 bg-white/50 relative">
              <Search className="w-4 h-4 text-terrain absolute left-6 top-1/2 -translate-y-1/2" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type country name or code..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setFocusedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-terrain/30 bg-paper text-carbon focus:outline-none focus:border-carbon font-normal"
              />
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-1.5 space-y-0.5">
              {filteredCountries.map((country, idx) => {
                const isSelected = selectedCountry?.code === country.code;
                const isFocused = focusedIndex === idx;

                return (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => {
                      onSelectCountry(country);
                      setIsOpen(false);
                      setSearchTerm("");
                    }}
                    onMouseEnter={() => setFocusedIndex(idx)}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-left flex items-center justify-between text-xs transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-signal-lime/30 text-carbon font-semibold"
                        : isFocused
                        ? "bg-black/5 text-carbon"
                        : "text-carbon/80 hover:bg-black/5"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">{country.flag}</span>
                      <span className="text-sm font-normal text-carbon">{country.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-terrain">
                        {country.continent} • {country.code}
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-carbon" />}
                    </div>
                  </button>
                );
              })}

              {filteredCountries.length === 0 && (
                <div className="py-8 text-center text-xs font-mono text-terrain">
                  No matching country found.
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Submit Guess Button */}
      <div className="w-full sm:w-auto self-end">
        <button
          type="button"
          onClick={onSubmitGuess}
          disabled={!selectedCountry || isSubmitting || disabled}
          className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2.5 shadow-sm ${
            selectedCountry && !isSubmitting && !disabled
              ? "bg-signal-lime hover:bg-[#cbf056] text-carbon cursor-pointer hover:scale-102 active:scale-98 border border-signal-lime/80"
              : "bg-terrain/20 text-terrain/60 cursor-not-allowed border border-terrain/20"
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-carbon" />
              <span>Checking...</span>
            </>
          ) : (
            <>
              <span>Submit Guess</span>
              <Send className="w-4 h-4 text-carbon" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

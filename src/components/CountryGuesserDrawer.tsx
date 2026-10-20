"use client";

import { useState, useMemo } from "react";
import { Search, MapPin, X, Check, Globe } from "lucide-react";
import { ALL_COUNTRIES, CountryChoice } from "@/data/locations";

interface CountryGuesserDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCountry: CountryChoice | null;
  onSelectCountry: (c: CountryChoice) => void;
  onSubmitGuess: () => void;
  isSubmitting?: boolean;
}

const CONTINENTS = ["All", "Europe", "Asia", "Americas", "Africa", "Oceania"] as const;

export default function CountryGuesserDrawer({
  isOpen,
  onClose,
  selectedCountry,
  onSelectCountry,
  onSubmitGuess,
  isSubmitting,
}: CountryGuesserDrawerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeContinent, setActiveContinent] = useState<string>("All");

  const filteredCountries = useMemo(() => {
    return ALL_COUNTRIES.filter((country) => {
      const matchesSearch =
        country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.code.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesContinent =
        activeContinent === "All" || country.continent === activeContinent;
      return matchesSearch && matchesContinent;
    });
  }, [searchTerm, activeContinent]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-carbon/60 backdrop-blur-sm transition-all animate-in fade-in duration-200">
      <div className="w-full sm:max-w-2xl bg-paper border border-terrain/35 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[85vh] sm:max-h-[780px] overflow-hidden text-carbon">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-terrain/25 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-signal-lime/30 border border-signal-lime/60 flex items-center justify-center">
              <Globe className="w-5 h-5 text-carbon" />
            </div>
            <div>
              <h2 className="text-xl font-medium tracking-tight">Guess the Country</h2>
              <p className="text-xs text-terrain">Identify target territory based on field clues</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="cursor-pointer p-2 rounded-full hover:bg-carbon/10 text-terrain hover:text-carbon transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Continent Filters */}
        <div className="p-4 sm:p-6 border-b border-terrain/20 space-y-3 bg-white/30">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-terrain" />
            <input
              type="text"
              placeholder="Search countries (e.g. Japan, Iceland, South Africa)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-terrain/40 bg-paper text-carbon text-sm focus:outline-none focus:ring-2 focus:ring-signal-lime/70 focus:border-carbon transition-all"
              autoFocus
            />
          </div>

          {/* Continent Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {CONTINENTS.map((continent) => (
              <button
                key={continent}
                onClick={() => setActiveContinent(continent)}
                className={`cursor-pointer px-3 py-1 rounded-full whitespace-nowrap transition-all ${
                  activeContinent === continent
                    ? "bg-carbon text-paper font-medium"
                    : "bg-paper hover:bg-black/5 text-terrain hover:text-carbon border border-terrain/30"
                }`}
              >
                {continent}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Country Choices List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {filteredCountries.map((country) => {
            const isSelected = selectedCountry?.code === country.code;
            return (
              <div
                key={country.code}
                onClick={() => onSelectCountry(country)}
                className={`cursor-pointer p-3.5 rounded-2xl border transition-all flex items-center justify-between group ${
                  isSelected
                    ? "bg-signal-lime/30 border-carbon shadow-xs"
                    : "bg-white/40 hover:bg-white/80 border-terrain/25 hover:border-terrain"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{country.flag}</span>
                  <div>
                    <h4 className="text-sm font-medium text-carbon group-hover:text-black">
                      {country.name}
                    </h4>
                    <span className="text-[11px] font-mono text-terrain">
                      {country.continent} • {country.code}
                    </span>
                  </div>
                </div>

                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                    isSelected
                      ? "bg-carbon text-paper border-carbon"
                      : "border-terrain/40 group-hover:border-carbon text-transparent"
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}

          {filteredCountries.length === 0 && (
            <div className="col-span-full py-12 text-center text-terrain font-mono text-xs">
              No matching territory found for &quot;{searchTerm}&quot;.
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-terrain/25 bg-paper flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-terrain" />
            <span className="text-xs font-mono text-terrain">Selected:</span>
            {selectedCountry ? (
              <span className="text-sm font-semibold text-carbon inline-flex items-center gap-1.5">
                <span>{selectedCountry.flag}</span>
                <span>{selectedCountry.name}</span>
              </span>
            ) : (
              <span className="text-xs text-terrain italic">No country chosen yet</span>
            )}
          </div>

          <button
            onClick={onSubmitGuess}
            disabled={!selectedCountry || isSubmitting}
            className={`w-full sm:w-auto px-7 py-3 rounded-2xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
              selectedCountry && !isSubmitting
                ? "bg-signal-lime hover:bg-[#cbf056] text-carbon shadow-md cursor-pointer hover:scale-102 active:scale-98"
                : "bg-terrain/20 text-terrain/60 cursor-not-allowed border border-terrain/20"
            }`}
          >
            <span>Confirm Guess</span>
            <span className="text-[10px] font-mono bg-carbon/10 px-1.5 py-0.5 rounded">
              ENTER
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";

const formatSuggestionLabel = (properties) => {
  const { name, city, state, country } = properties;
  return [name, city !== name ? city : null, state, country]
    .filter(Boolean)
    .join(", ");
};

const DestinationAutocomplete = ({ value, onChange, placeholder, disabled }) => {
  const [query, setQuery] = useState(value?.label || "");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    setQuery(value?.label || "");
  }, [value?.label]);

  useEffect(() => {
    if (!query || query === value?.label) {
      setSuggestions([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5`
        );
        const data = await response.json();
        setSuggestions(data.features || []);
        setShowDropdown(true);
      } catch (error) {
        console.error("Error fetching destination suggestions:", error);
        setSuggestions([]);
      }
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (feature) => {
    const label = formatSuggestionLabel(feature.properties);
    setQuery(label);
    setShowDropdown(false);
    onChange({
      label,
      value: {
        coordinates: feature.geometry?.coordinates,
        properties: feature.properties,
      },
    });
  };

  return (
    <div ref={containerRef} className="relative">
      <Input
        value={query}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
      />
      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-md border border-input bg-white shadow-md">
          {suggestions.map((feature, index) => (
            <li
              key={index}
              className="cursor-pointer px-3 py-2 text-sm hover:bg-gray-100"
              onClick={() => handleSelect(feature)}
            >
              {formatSuggestionLabel(feature.properties)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DestinationAutocomplete;

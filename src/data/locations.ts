export interface LocationItem {
  id: string;
  country: string;
  countryCode: string;
  flag: string;
  continent: string;
  city: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  panoId?: string;
  streetViewUrl: string;
  hints: {
    hemisphere: string;
    drivingSide: "Left" | "Right";
    climate: string;
    scriptHint: string;
  };
  trivia: string;
}

export const GAME_LOCATIONS: LocationItem[] = [
  {
    id: "jp-kyoto",
    country: "Japan",
    countryCode: "JP",
    flag: "🇯🇵",
    continent: "Asia",
    city: "Kyoto (Arashiyama)",
    coordinates: { lat: 35.0163, lng: 135.6713 },
    streetViewUrl:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1920&q=80",
    hints: {
      hemisphere: "Northern Hemisphere",
      drivingSide: "Left",
      climate: "Temperate with lush bamboo groves and seasonal moss",
      scriptHint: "漢字 & かな (Kanji & Kana script markers on wooden torii posts)",
    },
    trivia:
      "Japan drives on the left side of the road. Low-hanging utility pole transformers and distinctive yellow utility plates are famous GeoGuessr meta signs.",
  },
  {
    id: "is-vik",
    country: "Iceland",
    countryCode: "IS",
    flag: "🇮🇸",
    continent: "Europe",
    city: "Vík í Mýrdal",
    coordinates: { lat: 63.4186, lng: -19.006 },
    streetViewUrl:
      "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1920&q=80",
    hints: {
      hemisphere: "Northern Hemisphere (Subpolar)",
      drivingSide: "Right",
      climate: "Sub-arctic tundra, volcanic basalt beaches, and lupine fields",
      scriptHint: "Nordic runes & Latin with distinctive letters: Þ, Æ, and Ö",
    },
    trivia:
      "Iceland has no native trees across most rural stretches; roadside bollards are bright yellow with white reflectors.",
  },
  {
    id: "nz-queenstown",
    country: "New Zealand",
    countryCode: "NZ",
    flag: "🇳🇿",
    continent: "Oceania",
    city: "Queenstown / Southern Alps",
    coordinates: { lat: -45.0312, lng: 168.6626 },
    streetViewUrl:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1920&q=80",
    hints: {
      hemisphere: "Southern Hemisphere",
      drivingSide: "Left",
      climate: "Alpine glaciated mountain valleys with tussock grasslands",
      scriptHint: "English and te reo Māori bilingual directional signage",
    },
    trivia:
      "The sun sits in the north here! Look for red-banded wooden telegraph posts and left-hand traffic markings.",
  },
  {
    id: "it-amalfi",
    country: "Italy",
    countryCode: "IT",
    flag: "🇮🇹",
    continent: "Europe",
    city: "Amalfi Coast / Positano",
    coordinates: { lat: 40.6333, lng: 14.6029 },
    streetViewUrl:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1920&q=80",
    hints: {
      hemisphere: "Northern Hemisphere",
      drivingSide: "Right",
      climate: "Mediterranean scrub, terraced citrus orchards, and sheer coastal cliffs",
      scriptHint: "Italian Latin script with blue EU strip on both front and rear license plates",
    },
    trivia:
      "Italy is one of the few European countries where front license plates are notably smaller than rear plates.",
  },
  {
    id: "za-capetown",
    country: "South Africa",
    countryCode: "ZA",
    flag: "🇿🇦",
    continent: "Africa",
    city: "Cape Peninsula / Chapman's Peak",
    coordinates: { lat: -34.0881, lng: 18.3601 },
    streetViewUrl:
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1920&q=80",
    hints: {
      hemisphere: "Southern Hemisphere",
      drivingSide: "Left",
      climate: "Fynbos floral biome alongside rugged Atlantic ocean escarpments",
      scriptHint: "English & Afrikaans (R-series provincial road route numbers)",
    },
    trivia:
      "South Africa features yellow outer road shoulder lines instead of white, and unique dashed white center lines.",
  },
];

export interface CountryChoice {
  name: string;
  code: string;
  continent: string;
  flag: string;
}

export const ALL_COUNTRIES: CountryChoice[] = [
  { name: "Argentina", code: "AR", continent: "Americas", flag: "🇦🇷" },
  { name: "Australia", code: "AU", continent: "Oceania", flag: "🇦🇺" },
  { name: "Austria", code: "AT", continent: "Europe", flag: "🇦🇹" },
  { name: "Belgium", code: "BE", continent: "Europe", flag: "🇧🇪" },
  { name: "Brazil", code: "BR", continent: "Americas", flag: "🇧🇷" },
  { name: "Canada", code: "CA", continent: "Americas", flag: "🇨🇦" },
  { name: "Chile", code: "CL", continent: "Americas", flag: "🇨🇱" },
  { name: "Colombia", code: "CO", continent: "Americas", flag: "🇨🇴" },
  { name: "Croatia", code: "HR", continent: "Europe", flag: "🇭🇷" },
  { name: "Czech Republic", code: "CZ", continent: "Europe", flag: "🇨🇿" },
  { name: "Denmark", code: "DK", continent: "Europe", flag: "🇩🇰" },
  { name: "Estonia", code: "EE", continent: "Europe", flag: "🇪🇪" },
  { name: "Finland", code: "FI", continent: "Europe", flag: "🇫🇮" },
  { name: "France", code: "FR", continent: "Europe", flag: "🇫🇷" },
  { name: "Germany", code: "DE", continent: "Europe", flag: "🇩🇪" },
  { name: "Greece", code: "GR", continent: "Europe", flag: "🇬🇷" },
  { name: "Iceland", code: "IS", continent: "Europe", flag: "🇮🇸" },
  { name: "India", code: "IN", continent: "Asia", flag: "🇮🇳" },
  { name: "Indonesia", code: "ID", continent: "Asia", flag: "🇮🇩" },
  { name: "Ireland", code: "IE", continent: "Europe", flag: "🇮🇪" },
  { name: "Italy", code: "IT", continent: "Europe", flag: "🇮🇹" },
  { name: "Japan", code: "JP", continent: "Asia", flag: "🇯🇵" },
  { name: "Kenya", code: "KE", continent: "Africa", flag: "🇰🇪" },
  { name: "Lithuania", code: "LT", continent: "Europe", flag: "🇱🇹" },
  { name: "Malaysia", code: "MY", continent: "Asia", flag: "🇲🇾" },
  { name: "Mexico", code: "MX", continent: "Americas", flag: "🇲🇽" },
  { name: "Netherlands", code: "NL", continent: "Europe", flag: "🇳🇱" },
  { name: "New Zealand", code: "NZ", continent: "Oceania", flag: "🇳🇿" },
  { name: "Norway", code: "NO", continent: "Europe", flag: "🇳🇴" },
  { name: "Peru", code: "PE", continent: "Americas", flag: "🇵🇪" },
  { name: "Poland", code: "PL", continent: "Europe", flag: "🇵🇱" },
  { name: "Portugal", code: "PT", continent: "Europe", flag: "🇵🇹" },
  { name: "Romania", code: "RO", continent: "Europe", flag: "🇷🇴" },
  { name: "Singapore", code: "SG", continent: "Asia", flag: "🇸🇬" },
  { name: "South Africa", code: "ZA", continent: "Africa", flag: "🇿🇦" },
  { name: "South Korea", code: "KR", continent: "Asia", flag: "🇰🇷" },
  { name: "Spain", code: "ES", continent: "Europe", flag: "🇪🇸" },
  { name: "Sweden", code: "SE", continent: "Europe", flag: "🇸🇪" },
  { name: "Switzerland", code: "CH", continent: "Europe", flag: "🇨🇭" },
  { name: "Thailand", code: "TH", continent: "Asia", flag: "🇹🇭" },
  { name: "Turkey", code: "TR", continent: "Asia", flag: "🇹🇷" },
  { name: "United Kingdom", code: "GB", continent: "Europe", flag: "🇬🇧" },
  { name: "United States", code: "US", continent: "Americas", flag: "🇺🇸" },
];

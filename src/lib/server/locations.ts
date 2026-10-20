export interface VerifiedLocation {
  id: string;
  lat: number;
  lng: number;
  countryCode: string;
  countryName: string;
  heading?: number;
  pitch?: number;
}

export const VERIFIED_LOCATIONS: VerifiedLocation[] = [
  // 1. Japan (Route 162 Kyoto Mountain Highway)
  {
    id: "loc_jp_kyoto",
    lat: 35.0528,
    lng: 135.7906,
    countryCode: "JP",
    countryName: "Japan",
    heading: 90,
  },
  // 2. Iceland (Route 1 / Ring Road near Vík)
  {
    id: "loc_is_vik",
    lat: 63.4246,
    lng: -19.0182,
    countryCode: "IS",
    countryName: "Iceland",
    heading: 145,
  },
  // 3. New Zealand (Crown Range Road, Otago)
  {
    id: "loc_nz_queenstown",
    lat: -44.9853,
    lng: 168.8512,
    countryCode: "NZ",
    countryName: "New Zealand",
    heading: 180,
  },
  // 4. Italy (SS163 Amalfi Highway outside Positano)
  {
    id: "loc_it_positano",
    lat: 40.6325,
    lng: 14.4916,
    countryCode: "IT",
    countryName: "Italy",
    heading: 210,
  },
  // 5. South Africa (M6 Chapman's Peak Drive, Western Cape)
  {
    id: "loc_za_chapmans_peak",
    lat: -34.088,
    lng: 18.3601,
    countryCode: "ZA",
    countryName: "South Africa",
    heading: 260,
  },
  // 6. Argentina (Ruta 237 near Bariloche, Patagonia)
  {
    id: "loc_ar_bariloche",
    lat: -41.0548,
    lng: -71.5007,
    countryCode: "AR",
    countryName: "Argentina",
    heading: 45,
  },
  // 7. France (Promenade des Anglais Scenic Coast, Nice, France)
  {
    id: "loc_fr_nice",
    lat: 43.6951,
    lng: 7.265,
    countryCode: "FR",
    countryName: "France",
    heading: 240,
  },
  // 8. United States (Hollywood Boulevard / Los Angeles Highway)
  {
    id: "loc_us_los_angeles",
    lat: 34.1013,
    lng: -118.3269,
    countryCode: "US",
    countryName: "United States",
    heading: 270,
  },
  // 9. Canada (Sea-to-Sky Highway 99, British Columbia)
  {
    id: "loc_ca_sea_to_sky",
    lat: 49.6978,
    lng: -123.158,
    countryCode: "CA",
    countryName: "Canada",
    heading: 340,
  },
  // 10. Brazil (BR-101 Santa Catarina Scenic Highway)
  {
    id: "loc_br_santa_catarina",
    lat: -27.5933,
    lng: -48.5487,
    countryCode: "BR",
    countryName: "Brazil",
    heading: 190,
  },
  // 11. Germany (Ludwigstraße / Leopoldstraße, Munich, Bavaria)
  {
    id: "loc_de_munich",
    lat: 48.1468,
    lng: 11.577,
    countryCode: "DE",
    countryName: "Germany",
    heading: 10,
  },
  // 12. Australia (Great Ocean Road B100 near Port Campbell)
  {
    id: "loc_au_great_ocean_road",
    lat: -38.6186,
    lng: 142.9993,
    countryCode: "AU",
    countryName: "Australia",
    heading: 240,
  },
  // 13. Thailand (Old City Moat Road, Chiang Mai)
  {
    id: "loc_th_chiang_mai",
    lat: 18.7906,
    lng: 98.9865,
    countryCode: "TH",
    countryName: "Thailand",
    heading: 180,
  },
  // 14. South Korea (Iljue-ro Route 1132 Jeju Coastal Road)
  {
    id: "loc_kr_jeju",
    lat: 33.5169,
    lng: 126.8327,
    countryCode: "KR",
    countryName: "South Korea",
    heading: 75,
  },
  // 15. Norway (Fv63 Geirangerfjord Mountain Road)
  {
    id: "loc_no_geiranger",
    lat: 62.1004,
    lng: 7.2054,
    countryCode: "NO",
    countryName: "Norway",
    heading: 310,
  },
  // 16. Spain (N-621 Picos de Europa Gorge Highway)
  {
    id: "loc_es_picos_europa",
    lat: 43.2498,
    lng: -4.6006,
    countryCode: "ES",
    countryName: "Spain",
    heading: 110,
  },
  // 17. Mexico (Carretera Federal 190 Oaxaca Highway)
  {
    id: "loc_mx_oaxaca",
    lat: 17.0321,
    lng: -96.7079,
    countryCode: "MX",
    countryName: "Mexico",
    heading: 175,
  },
  // 18. Chile (Ruta 9 Patagonia Highway)
  {
    id: "loc_cl_torres_del_paine",
    lat: -51.2528,
    lng: -72.8779,
    countryCode: "CL",
    countryName: "Chile",
    heading: 20,
  },
  // 19. United Kingdom (A82 Glencoe Pass, Scottish Highlands)
  {
    id: "loc_gb_glen_etive",
    lat: 56.6194,
    lng: -4.9288,
    countryCode: "GB",
    countryName: "United Kingdom",
    heading: 215,
  },
  // 20. Greece (EO48 Delphi National Road)
  {
    id: "loc_gr_delphi",
    lat: 38.4774,
    lng: 22.478,
    countryCode: "GR",
    countryName: "Greece",
    heading: 270,
  },
  // 21. Kenya (Moi South Lake Road, Naivasha)
  {
    id: "loc_ke_hells_gate",
    lat: -0.8837,
    lng: 36.3159,
    countryCode: "KE",
    countryName: "Kenya",
    heading: 110,
  },
  // 22. Indonesia (Jl. Raya Denpasar - Singaraja, Bali)
  {
    id: "loc_id_bali_jatiluwih",
    lat: -8.3702,
    lng: 115.1311,
    countryCode: "ID",
    countryName: "Indonesia",
    heading: 340,
  },
  // 23. Switzerland (Quai du Mont-Blanc / Pont du Mont-Blanc, Geneva)
  {
    id: "loc_ch_geneva",
    lat: 46.2082,
    lng: 6.1492,
    countryCode: "CH",
    countryName: "Switzerland",
    heading: 60,
  },
  // 24. Netherlands (N214 / Molenkade, South Holland)
  {
    id: "loc_nl_kinderdijk",
    lat: 51.889,
    lng: 4.6366,
    countryCode: "NL",
    countryName: "Netherlands",
    heading: 25,
  },
  // 25. Poland (Droga Oswalda Balzera 960, Zakopane)
  {
    id: "loc_pl_zakopane",
    lat: 49.2992,
    lng: 19.9496,
    countryCode: "PL",
    countryName: "Poland",
    heading: 195,
  },
  // 26. Ireland (N71 Ring of Kerry Highway)
  {
    id: "loc_ie_ring_of_kerry",
    lat: 51.9818,
    lng: -9.5735,
    countryCode: "IE",
    countryName: "Ireland",
    heading: 280,
  },
  // 27. Portugal (N222 Scenic Douro Valley Highway)
  {
    id: "loc_pt_douro_valley",
    lat: 41.1598,
    lng: -7.6321,
    countryCode: "PT",
    countryName: "Portugal",
    heading: 65,
  },
  // 28. Singapore (Orchard Road / Raffles Boulevard)
  {
    id: "loc_sg_orchard",
    lat: 1.2912,
    lng: 103.8582,
    countryCode: "SG",
    countryName: "Singapore",
    heading: 140,
  },
  // 29. Sweden (E6 Bohuslän Highway)
  {
    id: "loc_se_bohuslan",
    lat: 58.3475,
    lng: 11.5332,
    countryCode: "SE",
    countryName: "Sweden",
    heading: 180,
  },
  // 30. Austria (Grossglockner High Alpine Road 107)
  {
    id: "loc_at_grossglockner",
    lat: 47.076,
    lng: 12.8403,
    countryCode: "AT",
    countryName: "Austria",
    heading: 220,
  },
];

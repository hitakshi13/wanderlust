const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description: "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b"
    },
    price: 1500,
    location: "Malibu",
    country: "United States",
    category: "Trending",
    geometry: { type: "Point", coordinates: [-118.7798, 34.0259] }
  },

  {
    title: "Modern Loft in Downtown",
    description: "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
    },
    price: 1200,
    location: "New York City",
    country: "United States",
    category: "Iconic Cities",
    geometry: { type: "Point", coordinates: [-74.006, 40.7128] }
  },

  {
    title: "Mountain Retreat",
    description: "Unplug and unwind in this peaceful mountain cabin.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d"
    },
    price: 1000,
    location: "Aspen",
    country: "United States",
    category: "Mountains",
    geometry: { type: "Point", coordinates: [-106.8175, 39.1911] }
  },

  {
    title: "Historic Villa in Tuscany",
    description: "Experience the charm of Tuscany in this beautifully restored villa.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945"
    },
    price: 2500,
    location: "Florence",
    country: "Italy",
    category: "Trending",
    geometry: { type: "Point", coordinates: [11.2558, 43.7696] }
  },

  {
    title: "Secluded Treehouse Getaway",
    description: "Live among the treetops in this unique treehouse retreat.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4"
    },
    price: 800,
    location: "Portland",
    country: "United States",
    category: "Farms",
    geometry: { type: "Point", coordinates: [-122.6765, 45.5231] }
  },

  {
    title: "Beachfront Paradise",
    description: "Step out onto the sandy beach. This beachfront condo offers ultimate relaxation.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9"
    },
    price: 2000,
    location: "Cancun",
    country: "Mexico",
    category: "Trending",
    geometry: { type: "Point", coordinates: [-86.8515, 21.1619] }
  },

  {
    title: "Rustic Cabin by the Lake",
    description: "Spend your days fishing and kayaking on the serene lake.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b"
    },
    price: 900,
    location: "Lake Tahoe",
    country: "United States",
    category: "Trending",
    geometry: { type: "Point", coordinates: [-120.0324, 39.0968] }
  },

  {
    title: "Luxury Penthouse with City Views",
    description: "Indulge in luxury living with panoramic city views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd"
    },
    price: 3500,
    location: "Los Angeles",
    country: "United States",
    category: "Iconic Cities",
    geometry: { type: "Point", coordinates: [-118.2437, 34.0522] }
  },

  {
    title: "Ski-In/Ski-Out Chalet",
    description: "Hit the slopes right from your doorstep.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb"
    },
    price: 3000,
    location: "Verbier",
    country: "Switzerland",
    category: "Mountains",
    geometry: { type: "Point", coordinates: [7.2287, 46.096] }
  },

  {
    title: "Safari Lodge in the Serengeti",
    description: "Experience wildlife and the Great Migration up close.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e"
    },
    price: 4000,
    location: "Serengeti National Park",
    country: "Tanzania",
    category: "Camping",
    geometry: { type: "Point", coordinates: [34.6857, -2.3333] }
  },

  /* ----------- FIXED IMAGE LINKS BELOW ----------- */

  {
    title: "Historic Castle in Scotland",
    description: "Live like royalty in this ancient Scottish castle.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1523731407965-2430cd12f5e4"
    },
    price: 2800,
    location: "Edinburgh",
    country: "Scotland",
    category: "Castles",
    geometry: { type: "Point", coordinates: [-3.1883, 55.9533] }
  },

  {
    title: "Private Island Retreat",
    description: "Complete privacy on this beautiful private island.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
    },
    price: 7000,
    location: "Maldives",
    country: "Maldives",
    category: "Boats",
    geometry: { type: "Point", coordinates: [73.2207, 3.2028] }
  },

  {
    title: "Charming Cottage in the Cotswolds",
    description: "Quaint English countryside escape.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511"
    },
    price: 1100,
    location: "Cotswolds",
    country: "United Kingdom",
    category: "Farms",
    geometry: { type: "Point", coordinates: [-1.8433, 51.833] }
  },

  {
    title: "Beachfront Bungalow in Bali",
    description: "Relax on Bali’s pristine beaches.",
    image: {
      filename: "listingimage",
    url: "https://images.unsplash.com/photo-1602391833977-358a52198938?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1600,
    location: "Bali",
    country: "Indonesia",
    category: "Trending",
    geometry: { type: "Point", coordinates: [115.1889, -8.4095] }
  },

  {
    title: "Desert Oasis in Dubai",
    description: "Luxury desert escape.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHViYWl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 5000,
    location: "Dubai",
    country: "UAE",
    category: "Trending",
    geometry: { type: "Point", coordinates: [55.2708, 25.2048] }
  },

  {
    title: "Modern Apartment in Tokyo",
    description: "Stay in the heart of Japan’s capital.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1549693578-d683be217e58"
    },
    price: 2000,
    location: "Tokyo",
    country: "Japan",
    category: "Iconic Cities",
    geometry: { type: "Point", coordinates: [139.6503, 35.6762] }
  },

  {
    title: "Luxury Villa in the Maldives",
    description: "Experience crystal clear waters and white sand beaches.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGFrZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 6000,
    location: "Malé",
    country: "Maldives",
    category: "Trending",
    geometry: { type: "Point", coordinates: [73.5093, 4.1755] }
  },

  {
    title: "Arctic Explorer Cabin",
    description: "Experience the freezing beauty of the Arctic Circle.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1519068737630-e5db30e12e42"
    },
    price: 3500,
    location: "Greenland",
    country: "Greenland",
    category: "Arctic",
    geometry: { type: "Point", coordinates: [-42.6043, 71.7069] }
  }
];

module.exports = { data: sampleListings };

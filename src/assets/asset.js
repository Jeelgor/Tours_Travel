import Logo from './assets/Logo.jpg';
// Importing images from the 'london' folder
import london1 from "./london/london1.jpg";
import london2 from "./london/london2.jpg";
import london3 from "./london/london3.jpg";
import london4 from "./london/london4.jpg";
import london5 from "./london/london5.jpg";
import london6 from "./london/london6.jpg";
import london7 from "./london/london7.jpg";
import london8 from "./london/london8.jpg";
import london9 from "./london/london9.jpg";
import london10 from "./london/london10.jpg";
import london11 from "./london/london11.jpg";
import london12 from "./london/london12.jpg";
import london13 from "./london/london13.jpg";
import london14 from "./london/london14.jpg";
import london15 from "./london/london15.jpg";
import london16 from "./london/london16.jpg";
import london17 from "./london/london17.jpg";
import london18 from "./london/london18.jpg";
import london19 from "./london/london19.jpg";
import london20 from "./london/london20.jpg";
import london21 from "./london/london21.jpg";
import london22 from "./london/london22.jpg";
import london23 from "./london/london23.jpg";
import london24 from "./london/london24.jpg";

// Importing images from the 'malaysia' folder
import malaysia1 from "./malaysia/malaysia1.jpg";
import malaysia2 from "./malaysia/malaysia2.jpg";
import malaysia3 from "./malaysia/malaysia3.jpg";
import malaysia4 from "./malaysia/malaysia4.jpg";
import malaysia5 from "./malaysia/malaysia5.jpg";
import malaysia6 from "./malaysia/malaysia6.jpg";
import malaysia7 from "./malaysia/malaysia7.jpg";
import malaysia8 from "./malaysia/malaysia8.jpg";
import malaysia9 from "./malaysia/malaysia9.jpg";
import malaysia10 from "./malaysia/malaysia10.jpg";
import malaysia11 from "./malaysia/malaysia11.jpg";
import malaysia12 from "./malaysia/malaysia12.jpg";
import malaysia13 from "./malaysia/malaysia13.jpg";
import malaysia14 from "./malaysia/malaysia14.jpg";
import malaysia15 from "./malaysia/malaysia15.jpg";
import malaysia16 from "./malaysia/malaysia16.jpg";
import malaysia17 from "./malaysia/malaysia17.jpg";

// Importing images from the 'singapore' folder
import singapore1 from "./singapore/singapore1.jpg";
import singapore2 from "./singapore/singapore2.jpg";
import singapore3 from "./singapore/singapore3.jpg";
import singapore4 from "./singapore/singapore4.jpg";
import singapore5 from "./singapore/singapore5.jpg";
import singapore6 from "./singapore/singapore6.jpg";
import singapore7 from "./singapore/singapore7.jpg";
import singapore8 from "./singapore/singapore8.jpg";
import singapore9 from "./singapore/singapore9.jpg";
import singapore10 from "./singapore/singapore10.jpg";
import singapore11 from "./singapore/singapore11.jpg";
import singapore12 from "./singapore/singapore12.jpg";
import singapore13 from "./singapore/singapore13.jpg";
import singapore14 from "./singapore/singapore14.jpg";
import singapore15 from "./singapore/singapore15.jpg";
import singapore16 from "./singapore/singapore16.jpg";

// Exporting the images with the categorized structure
export const assets = {
  Logo,
  london: {
    london1,
    london2,
    london3,
    london4,
    london5,
    london6,
    london7,
    london8,
    london9,
    london10,
    london11,
    london12,
    london13,
    london14,
    london15,
    london16,
    london17,
    london18,
    london19,
    london20,
    london21,
    london22,
    london23,
    london24,
  },
  malaysia: {
    malaysia1,
    malaysia2,
    malaysia3,
    malaysia4,
    malaysia5,
    malaysia6,
    malaysia7,
    malaysia8,
    malaysia9,
    malaysia10,
    malaysia11,
    malaysia12,
    malaysia13,
    malaysia14,
    malaysia15,
    malaysia16,
    malaysia17,
  },
  singapore: {
    singapore1,
    singapore2,
    singapore3,
    singapore4,
    singapore5,
    singapore6,
    singapore7,
    singapore8,
    singapore9,
    singapore10,
    singapore11,
    singapore12,
    singapore13,
    singapore14,
    singapore15,
    singapore16,
  },
};

//  Top Packages


export const topPackages = [
    {
      _id: "pkg1",
      title: "London City Break",
      location: "3N London",
      image: london1,
      highlights: [
        "Round Trip Flights",
        "Luxury Hotel",
        "Daily Breakfast",
        "City Sightseeing",
        "Museum Pass",
      ],
      rating: 9.0,
      price: "45,000",
      currency: "₹",
      priceType: "/Person",
      gallery: [london1, london2, london3],
      overview: [
        "London City Break",
        "A comprehensive tour of Kuala Lumpur with top attractions, including the Petronas Towers, city tours, and luxury accommodation.",
        9.0,
      ],
      amenities: ["Free WiFi", "Air conditioning", "Airport Transfers", "Spa"],
      aboutProperty: {
        title: "London City Break",
        subtitle: "Luxury stay in the heart of London",
        description:
          "Located near Hyde Park and Oxford Street, the hotel offers a luxurious and comfortable stay with easy access to the city’s most iconic landmarks. Guests can enjoy exquisite dining options, a fitness center, and a spa for complete relaxation. The hotel also provides free Wi-Fi, 24-hour room service, and a rooftop bar with stunning city views, making it an ideal choice for travelers looking for both relaxation and adventure.",
        perks: [
          "Free WiFi",
          "Air conditioning",
          "Airport transfers",
          "Spa",
          "On-site restaurant",
          "Swimming pool",
          "Fitness center",
          "Business center",
          "Concierge service",
          "Laundry service",
        ],
      },
      accessibility: 'The property offers wheelchair-accessible pathways, elevators, and guest rooms. Additional amenities include accessible parking, auditory guidance, and braille signage for visually impaired guests to ensure a comfortable stay for all visitors.',
      commonAreas: ["Outdoor pool", "Bar", "Free parking"],
      packageType: "Group Tour",
    },
    {
      _id: "pkg2",
      title: "London Explorer",
      location: "5N London",
      image: london2,
      highlights: [
        "Flights Included",
        "4 Star Hotel",
        "Hop-on Hop-off Tour",
        "Thames River Cruise",
        "Free Dinner",
      ],
      rating: 8.8,
      price: "65,000",
      currency: "₹",
      priceType: "/Person",
      gallery: [london1, london2, london3],
      overview: [
        "London Explorer",
        "An exciting adventure in London, exploring its famous landmarks and enjoying unique experiences.",
        8.8,
      ],
      amenities: ["Free WiFi", "Air conditioning", "Airport Transfers", "Spa"],
      aboutProperty: {
        title: "London Explorer",
        subtitle: "Experience the best of London",
        description:
          "Enjoy a fantastic stay in a vibrant area of London with easy access to local attractions and activities. This package includes exciting tours and comfortable accommodation for a memorable vacation.",
        perks: [
          "Free WiFi",
          "Air conditioning",
          "Airport transfers",
          "Spa",
          "On-site restaurant",
          "Swimming pool",
          "Fitness center",
          "Business center",
          "Concierge service",
          "Laundry service",
        ],
      },
      accessibility: 'The property is designed with accessibility in mind, providing wheelchair ramps, accessible rooms, and assistance for guests with disabilities.',
      commonAreas: ["Outdoor pool", "Bar", "Free parking"],
      packageType: "Family Special",
    },
    {
      _id: "pkg3",
      title: "Classic London Experience",
      location: "4N London",
      image: london3,
      highlights: [
        "Return Flights",
        "Central Hotel",
        "Walking Tours",
        "All Meals Included",
        "Theatre Tickets",
      ],
      rating: 8.5,
      price: "58,000",
      currency: "₹",
      priceType: "/Person",
      gallery: [london1, london2, london3],
      overview: [
        "Classic London Experience",
        "Immerse yourself in the rich culture and history of London with this classic package.",
        8.5,
      ],
      amenities: ["Free WiFi", "Air conditioning", "Airport Transfers", "Spa"],
      aboutProperty: {
        title: "Classic London Experience",
        subtitle: "Discover the charm of London",
        description:
          "This package offers an immersive experience in London, including guided tours, comfortable lodging, and delicious meals, making it perfect for first-time visitors.",
        perks: [
          "Free WiFi",
          "Air conditioning",
          "Airport transfers",
          "Spa",
          "On-site restaurant",
          "Swimming pool",
          "Fitness center",
          "Business center",
          "Concierge service",
          "Laundry service",
        ],
      },
      accessibility: 'Guests with disabilities will find the property equipped with necessary amenities, ensuring a pleasant stay.',
      commonAreas: ["Outdoor pool", "Bar", "Free parking"],
      packageType: "Group Tour",
    },
    {
      _id: "pkg4",
      title: "London Luxury Stay",
      location: "3N London",
      image: london4,
      highlights: [
        "Business Class Flights",
        "5 Star Hotel",
        "Private City Tours",
        "Free Spa Access",
        "Fine Dining",
      ],
      rating: 9.2,
      price: "1,10,000",
      currency: "₹",
      priceType: "/Person",
      gallery: [london1, london2, london3],
      overview: [
        "London Luxury Stay",
        "Indulge in a luxurious getaway with top-notch amenities and personalized services.",
        9.2,
      ],
      amenities: ["Free WiFi", "Air conditioning", "Airport Transfers", "Spa"],
      aboutProperty: {
        title: "London Luxury Stay",
        subtitle: "An extravagant experience in London",
        description:
          "Experience unparalleled luxury in one of London's finest hotels, offering exquisite dining and exclusive services for an unforgettable stay.",
        perks: [
          "Free WiFi",
          "Air conditioning",
          "Airport transfers",
          "Spa",
          "On-site restaurant",
          "Swimming pool",
          "Fitness center",
          "Business center",
          "Concierge service",
          "Laundry service",
        ],
      },
      accessibility: 'This property provides various accessibility options to ensure all guests have a comfortable experience.',
      commonAreas: ["Outdoor pool", "Bar", "Free parking"],
      packageType: "Luxury Package",
    },
    {
      _id: "pkg5",
      title: "London Family Vacation",
      location: "6N London",
      image: london5,
      highlights: [
        "Economy Flights",
        "Family Hotel",
        "Kids Activities",
        "Zoo Visit",
        "Amusement Park",
      ],
      rating: 8.4,
      price: "75,000",
      currency: "₹",
      priceType: "/Person",
      gallery: [london1, london2, london3],
      overview: [
        "London Family Vacation",
        "A fun-filled vacation designed for families, featuring activities for all ages.",
        8.4,
      ],
      amenities: ["Free WiFi", "Air conditioning", "Airport Transfers", "Spa"],
      aboutProperty: {
        title: "London Family Vacation",
        subtitle: "The perfect getaway for families",
        description:
          "This package includes family-friendly accommodations and exciting activities to keep everyone entertained while exploring London.",
        perks: [
          "Free WiFi",
          "Air conditioning",
          "Airport transfers",
          "Spa",
          "On-site restaurant",
          "Swimming pool",
          "Fitness center",
          "Business center",
          "Concierge service",
          "Laundry service",
        ],
      },
      accessibility: 'The property is family-friendly and includes amenities for families with children and guests with disabilities.',
      commonAreas: ["Outdoor pool", "Bar", "Free parking"],
      packageType: "Family Special",
    },
    {
      _id: "pkg6",
      title: "London Art & Culture",
      location: "5N London",
      image: london6,
      highlights: [
        "Flights Included",
        "Boutique Hotel",
        "Art Gallery Tours",
        "Historical Monuments",
        "Daily Museum Visits",
      ],
      rating: 9.1,
      price: "70,000",
      currency: "₹",
      priceType: "/Person",
      gallery: [london1, london2, london3],
      overview: [
        "London Art & Culture",
        "Explore London's artistic side through gallery visits and cultural experiences.",
        9.1,
      ],
      amenities: ["Free WiFi", "Air conditioning", "Airport Transfers", "Spa"],
      aboutProperty: {
        title: "London Art & Culture",
        subtitle: "A cultural journey through London",
        description:
          "Delve into London's rich art and culture with guided tours of galleries and historical sites, complemented by comfortable accommodations.",
        perks: [
          "Free WiFi",
          "Air conditioning",
          "Airport transfers",
          "Spa",
          "On-site restaurant",
          "Swimming pool",
          "Fitness center",
          "Business center",
          "Concierge service",
          "Laundry service",
        ],
      },
      accessibility: 'The property is accessible to all guests, providing necessary features for an enjoyable stay.',
      commonAreas: ["Outdoor pool", "Bar", "Free parking"],
      packageType: "Cultural Tour",
    },
    {
      _id: "pkg7",
      title: "Adventurous London",
      location: "4N London",
      image: london7,
      highlights: [
        "Flights Included",
        "Adventure Hotel",
        "Outdoor Activities",
        "Hiking Tours",
        "River Rafting",
      ],
      rating: 8.7,
      price: "80,000",
      currency: "₹",
      priceType: "/Person",
      gallery: [london1, london2, london3],
      overview: [
        "Adventurous London",
        "For thrill-seekers, this package includes exciting outdoor activities and adventures.",
        8.7,
      ],
      amenities: ["Free WiFi", "Air conditioning", "Airport Transfers", "Spa"],
      aboutProperty: {
        title: "Adventurous London",
        subtitle: "An action-packed trip to London",
        description:
          "Perfect for adventure lovers, this package includes thrilling activities, comfortable lodging, and memorable experiences in London.",
        perks: [
          "Free WiFi",
          "Air conditioning",
          "Airport transfers",
          "Spa",
          "On-site restaurant",
          "Swimming pool",
          "Fitness center",
          "Business center",
          "Concierge service",
          "Laundry service",
        ],
      },
      accessibility: 'The property ensures accessibility for all guests, providing features for a comfortable stay.',
      commonAreas: ["Outdoor pool", "Bar", "Free parking"],
      packageType: "Adventure Package",
    },
    {
      _id: "pkg8",
      title: "Culinary Tour of London",
      location: "5N London",
      image: london8,
      highlights: [
        "Gourmet Dining Experiences",
        "Culinary Classes",
        "Food Market Tours",
        "Wine Tasting",
        "Flights Included",
      ],
      rating: 9.3,
      price: "85,000",
      currency: "₹",
      priceType: "/Person",
      gallery: [london1, london2, london3],
      overview: [
        "Culinary Tour of London",
        "Indulge in London's vibrant culinary scene with exclusive dining experiences.",
        9.3,
      ],
      amenities: ["Free WiFi", "Air conditioning", "Airport Transfers", "Spa"],
      aboutProperty: {
        title: "Culinary Tour of London",
        subtitle: "A gastronomic adventure in London",
        description:
          "Join this culinary tour that explores the flavors of London, featuring gourmet dining, cooking classes, and food market visits.",
        perks: [
          "Free WiFi",
          "Air conditioning",
          "Airport transfers",
          "Spa",
          "On-site restaurant",
          "Swimming pool",
          "Fitness center",
          "Business center",
          "Concierge service",
          "Laundry service",
        ],
      },
      accessibility: 'The property is designed to be accessible for all guests, ensuring comfort and convenience during your stay.',
      commonAreas: ["Outdoor pool", "Bar", "Free parking"],
      packageType: "Culinary Tour",
    },
    {
      _id: "pkg9",
      title: "London Sports Experience",
      location: "4N London",
      image: london9,
      highlights: [
        "Match Tickets",
        "Sports Hotel",
        "Stadium Tours",
        "Fitness Classes",
        "Flights Included",
      ],
      rating: 8.6,
      price: "78,000",
      currency: "₹",
      priceType: "/Person",
      gallery: [london1, london2, london3],
      overview: [
        "London Sports Experience",
        "Enjoy a sports-filled vacation with match tickets and stadium tours.",
        8.6,
      ],
      amenities: ["Free WiFi", "Air conditioning", "Airport Transfers", "Spa"],
      aboutProperty: {
        title: "London Sports Experience",
        subtitle: "Get closer to your favorite sports",
        description:
          "Experience the excitement of London’s sports scene with match tickets, stadium tours, and special fitness classes.",
        perks: [
          "Free WiFi",
          "Air conditioning",
          "Airport transfers",
          "Spa",
          "On-site restaurant",
          "Swimming pool",
          "Fitness center",
          "Business center",
          "Concierge service",
          "Laundry service",
        ],
      },
      accessibility: 'The property is committed to accessibility, ensuring all guests have a pleasant stay.',
      commonAreas: ["Outdoor pool", "Bar", "Free parking"],
      packageType: "Sports Tour",
    },
    {
      _id: "pkg10",
      title: "Eco-Friendly London",
      location: "5N London",
      image: london10,
      highlights: [
        "Sustainable Hotel",
        "Eco Tours",
        "Wildlife Experiences",
        "Local Cuisine",
        "Flights Included",
      ],
      rating: 9.5,
      price: "95,000",
      currency: "₹",
      priceType: "/Person",
      gallery: [london1, london2, london3],
      overview: [
        "Eco-Friendly London",
        "Discover sustainable travel options while exploring London's attractions.",
        9.5,
      ],
      amenities: ["Free WiFi", "Air conditioning", "Airport Transfers", "Spa"],
      aboutProperty: {
        title: "Eco-Friendly London",
        subtitle: "Sustainable living in London",
        description:
          "This eco-friendly package focuses on sustainable tourism with eco-tours, local cuisine, and wildlife experiences in London.",
        perks: [
          "Free WiFi",
          "Air conditioning",
          "Airport transfers",
          "Spa",
          "On-site restaurant",
          "Swimming pool",
          "Fitness center",
          "Business center",
          "Concierge service",
          "Laundry service",
        ],
      },
      accessibility: 'The property includes features that support accessibility, ensuring all guests have a comfortable experience.',
      commonAreas: ["Outdoor pool", "Bar", "Free parking"],
      packageType: "Eco Tour",
    },
  ];

// All Packages

export const AllPackages = [
  {
    _id: "pkg11",
    title: "Kuala Lumpur Highlights",
    location: "3N Malaysia",
    image: malaysia1,
    highlights: [
      "Round Trip Flights",
      "4 Star Hotel",
      "City Tour",
      "Petronas Towers Visit",
      "Aquaria KLCC",
    ],
    rating: 8.7,
    price: "40,000",
    currency: "₹",
  },
  {
    _id: "pkg12",
    title: "Malaysia Beach Getaway",
    location: "5N Langkawi",
    image: malaysia2,
    highlights: [
      "Flights Included",
      "Beach Resort",
      "Island Hopping",
      "Water Sports",
      "Spa Experience",
    ],
    rating: 9.1,
    price: "65,000",
    currency: "₹",
  },
  {
    _id: "pkg13",
    title: "Cultural Malaysia Tour",
    location: "4N Penang",
    image: malaysia3,
    highlights: [
      "Return Flights",
      "Boutique Hotel",
      "Cultural Shows",
      "Local Food Tours",
      "Heritage Walks",
    ],
    rating: 8.5,
    price: "52,000",
    currency: "₹",
  },
  {
    _id: "pkg14",
    title: "Malaysia Adventure Trip",
    location: "7N Malaysia",
    image: malaysia4,
    highlights: [
      "Flights Included",
      "Adventure Activities",
      "Hiking",
      "Snorkeling",
      "Trekking",
    ],
    rating: 8.9,
    price: "70,000",
    currency: "₹",
  },
  {
    _id: "pkg15",
    title: "Malaysia Family Fun",
    location: "6N Kuala Lumpur",
    image: malaysia5,
    highlights: [
      "Round Trip Flights",
      "Family-Friendly Hotel",
      "Theme Park Access",
      "Zoo Visit",
      "Amusement Park",
    ],
    rating: 8.3,
    price: "60,000",
    currency: "₹",
  },
  {
    _id: "pkg16",
    title: "Malaysia Island Escape",
    location: "4N Langkawi",
    image: malaysia6,
    highlights: [
      "Flights Included",
      "Private Villa",
      "Island Exploration",
      "Beachside Dining",
      "Boat Tours",
    ],
    rating: 9.2,
    price: "90,000",
    currency: "₹",
  },
  {
    _id: "pkg17",
    title: "Malaysia Honeymoon Special",
    location: "5N Malaysia",
    image: malaysia7,
    highlights: [
      "Business Class Flights",
      "Luxury Resort",
      "Private Tours",
      "Couple Spa",
      "Candlelight Dinner",
    ],
    rating: 9.4,
    price: "1,20,000",
    currency: "₹",
  },
  {
    _id: "pkg18",
    title: "Malaysia Backpacking Adventure",
    location: "10N Malaysia",
    image: malaysia8,
    highlights: [
      "Low Cost Flights",
      "Hostel Stay",
      "Public Transport",
      "Budget Meals",
      "Group Tours",
    ],
    rating: 8.1,
    price: "45,000",
    currency: "₹",
  },
  {
    _id: "pkg19",
    title: "Malaysia City Explorer",
    location: "5N Kuala Lumpur",
    image: malaysia9,
    highlights: [
      "Round Trip Flights",
      "Central Hotel",
      "City Tour",
      "Shopping Spree",
      "Food Street Experience",
    ],
    rating: 8.6,
    price: "55,000",
    currency: "₹",
  },
  {
    _id: "pkg20",
    title: "Malaysia Luxury Escape",
    location: "3N Kuala Lumpur",
    image: malaysia10,
    highlights: [
      "Business Class Flights",
      "5 Star Hotel",
      "Luxury Spa",
      "Private City Tour",
      "Fine Dining Experience",
    ],
    rating: 9.5,
    price: "1,00,000",
    currency: "₹",
  },
  {
    _id: "pkg21",
    title: "Penang Culture and Cuisine",
    location: "4N Penang",
    image: malaysia11,
    highlights: [
      "Flights Included",
      "Local Food Experiences",
      "Cultural Tour",
      "Heritage Sites",
      "Street Art",
    ],
    rating: 8.7,
    price: "60,000",
    currency: "₹",
  },
  {
    _id: "pkg22",
    title: "Malaysia Island Hopping",
    location: "6N Malaysia",
    image: malaysia12,
    highlights: [
      "Round Trip Flights",
      "Island Resorts",
      "Snorkeling and Diving",
      "Boat Tours",
      "Sunset Cruises",
    ],
    rating: 9.0,
    price: "85,000",
    currency: "₹",
  },
  {
    _id: "pkg23",
    title: "Malaysia Eco-Tourism Adventure",
    location: "7N Borneo",
    image: malaysia13,
    highlights: [
      "Return Flights",
      "Eco-Friendly Lodging",
      "Rainforest Tours",
      "Wildlife Spotting",
      "Nature Walks",
    ],
    rating: 9.1,
    price: "72,000",
    currency: "₹",
  },
  {
    _id: "pkg24",
    title: "Malaysia City Lights",
    location: "3N Kuala Lumpur",
    image: malaysia14,
    highlights: [
      "Round Trip Flights",
      "Central Hotel Stay",
      "City Walks",
      "Night Market Visit",
      "Cultural Show",
    ],
    rating: 8.4,
    price: "50,000",
    currency: "₹",
  },
  {
    _id: "pkg25",
    title: "Malaysia Wildlife Safari",
    location: "6N Malaysia",
    image: malaysia15,
    highlights: [
      "Flights Included",
      "Jungle Safaris",
      "Wildlife Tours",
      "National Parks",
      "Camping Experience",
    ],
    rating: 9.0,
    price: "95,000",
    currency: "₹",
  },
  {
    _id: "pkg26",
    title: "Malaysia Mountain Trekking",
    location: "5N Cameron Highlands",
    image: malaysia16,
    highlights: [
      "Return Flights",
      "Mountain Lodges",
      "Trekking Adventures",
      "Tea Plantations",
      "Nature Walks",
    ],
    rating: 8.8,
    price: "68,000",
    currency: "₹",
  },
  {
    _id: "pkg27",
    title: "Malaysia Cultural Heritage Tour",
    location: "4N Malacca",
    image: malaysia17,
    highlights: [
      "Flights Included",
      "Historical Tours",
      "Heritage Sites",
      "Local Food",
      "Cultural Performances",
    ],
    rating: 8.9,
    price: "55,000",
    currency: "₹",
  },
  {
    _id: "pkg28",
    title: "London City Break",
    location: "3N London",
    image: london1,
    highlights: [
      "Round Trip Flights",
      "Central Hotel Stay",
      "London Eye",
      "Thames River Cruise",
      "British Museum Visit",
    ],
    rating: 9.0,
    price: "75,000",
    currency: "₹",
  },
  {
    _id: "pkg29",
    title: "London and Beyond",
    location: "5N London & Nearby",
    image: london2,
    highlights: [
      "Flights Included",
      "Hotel Stays in Multiple Cities",
      "Stonehenge Tour",
      "Windsor Castle Visit",
      "Private Transfers",
    ],
    rating: 9.3,
    price: "1,20,000",
    currency: "₹",
  },
  {
    _id: "pkg30",
    title: "Historical London Tour",
    location: "4N London",
    image: london3,
    highlights: [
      "Round Trip Flights",
      "3 Star Hotel",
      "Tower of London",
      "Westminster Abbey",
      "Historical Walking Tours",
    ],
    rating: 8.7,
    price: "82,000",
    currency: "₹",
  },
  {
    _id: "pkg31",
    title: "London Family Vacation",
    location: "6N London",
    image: london4,
    highlights: [
      "Flights Included",
      "Family-Friendly Hotel",
      "Harry Potter Studio Tour",
      "London Zoo Visit",
      "Theme Parks",
    ],
    rating: 9.1,
    price: "1,10,000",
    currency: "₹",
  },
  {
    _id: "pkg32",
    title: "London Honeymoon Special",
    location: "5N London",
    image: london5,
    highlights: [
      "Business Class Flights",
      "Luxury Hotel Stay",
      "Private City Tour",
      "Candlelight Dinner",
      "London Eye at Sunset",
    ],
    rating: 9.5,
    price: "1,40,000",
    currency: "₹",
  },
  {
    _id: "pkg33",
    title: "London Backpacking Adventure",
    location: "8N London",
    image: london6,
    highlights: [
      "Budget Flights",
      "Hostel Stay",
      "Public Transport Pass",
      "Free Museum Visits",
      "City Walks",
    ],
    rating: 8.2,
    price: "60,000",
    currency: "₹",
  },
  {
    _id: "pkg34",
    title: "Luxury London Retreat",
    location: "3N London",
    image: london7,
    highlights: [
      "Business Class Flights",
      "5 Star Hotel",
      "Spa Treatment",
      "Private City Tours",
      "Gourmet Dining",
    ],
    rating: 9.6,
    price: "2,00,000",
    currency: "₹",
  },
  {
    _id: "pkg35",
    title: "London and Paris Combo",
    location: "6N London & Paris",
    image: london8,
    highlights: [
      "Flights Included",
      "Eurostar Train",
      "Central Hotel in Both Cities",
      "Eiffel Tower Visit",
      "London Eye",
    ],
    rating: 9.4,
    price: "1,75,000",
    currency: "₹",
  },
  {
    _id: "pkg36",
    title: "London Art and Culture Tour",
    location: "4N London",
    image: london9,
    highlights: [
      "Flights Included",
      "Museum Pass",
      "Art Gallery Visits",
      "Theatre Tickets",
      "Historical Tours",
    ],
    rating: 8.9,
    price: "95,000",
    currency: "₹",
  },
  {
    _id: "pkg37",
    title: "Classic London Experience",
    location: "5N London",
    image: london10,
    highlights: [
      "Round Trip Flights",
      "Central Hotel Stay",
      "Iconic Landmarks",
      "Guided City Tours",
      "Shopping Tour",
    ],
    rating: 8.8,
    price: "1,05,000",
    currency: "₹",
  },
  {
    _id: "pkg38",
    title: "London Foodie Adventure",
    location: "3N London",
    image: london11,
    highlights: [
      "Flights Included",
      "Hotel Stay",
      "Local Food Tour",
      "Gourmet Experiences",
      "Cooking Class",
    ],
    rating: 9.2,
    price: "80,000",
    currency: "₹",
  },
  {
    _id: "pkg39",
    title: "London Winter Wonderland",
    location: "4N London",
    image: london12,
    highlights: [
      "Round Trip Flights",
      "3 Star Hotel",
      "Christmas Markets",
      "Ice Skating",
      "Winter Festival",
    ],
    rating: 8.7,
    price: "88,000",
    currency: "₹",
  },
  {
    _id: "pkg40",
    title: "London Theatre and Arts Tour",
    location: "5N London",
    image: london13,
    highlights: [
      "Flights Included",
      "Hotel Stay",
      "West End Theatre Show",
      "Art Gallery Pass",
      "Backstage Tour",
    ],
    rating: 9.0,
    price: "1,10,000",
    currency: "₹",
  },
  {
    _id: "pkg41",
    title: "London Nightlife Extravaganza",
    location: "3N London",
    image: london14,
    highlights: [
      "Flights Included",
      "Hotel Stay",
      "Pub Crawl",
      "Nightclub Access",
      "Rooftop Bars",
    ],
    rating: 8.5,
    price: "78,000",
    currency: "₹",
  },
  {
    _id: "pkg42",
    title: "London Countryside Escape",
    location: "6N London & Countryside",
    image: london15,
    highlights: [
      "Flights Included",
      "Hotel Stay in London & Countryside",
      "Countryside Tours",
      "Castle Visit",
      "Nature Walks",
    ],
    rating: 9.3,
    price: "1,50,000",
    currency: "₹",
  },
  {
    _id: "pkg43",
    title: "London Photography Tour",
    location: "5N London",
    image: london16,
    highlights: [
      "Flights Included",
      "Guided Photography Tour",
      "Iconic Locations",
      "Photography Workshop",
      "Museum Visits",
    ],
    rating: 8.9,
    price: "1,20,000",
    currency: "₹",
  },
  {
    _id: "pkg44",
    title: "London Shopping Spree",
    location: "3N London",
    image: london17,
    highlights: [
      "Flights Included",
      "Luxury Hotel Stay",
      "Guided Shopping Tour",
      "Private Transfers",
      "Fashion Show",
    ],
    rating: 9.1,
    price: "1,10,000",
    currency: "₹",
  },
  {
    _id: "pkg45",
    title: "London Music Lovers Tour",
    location: "5N London",
    image: london18,
    highlights: [
      "Flights Included",
      "Hotel Stay",
      "Live Music Concert",
      "Music Studio Tour",
      "Museum of Rock",
    ],
    rating: 8.6,
    price: "95,000",
    currency: "₹",
  },
  {
    _id: "pkg46",
    title: "London Luxury Cruise and Stay",
    location: "7N London & Cruise",
    image: london19,
    highlights: [
      "Flights Included",
      "Luxury Cruise",
      "5 Star Hotel",
      "Gourmet Dining",
      "City Tour",
    ],
    rating: 9.5,
    price: "2,10,000",
    currency: "₹",
  },
  {
    _id: "pkg47",
    title: "London Green and Eco-Tour",
    location: "4N London",
    image: london20,
    highlights: [
      "Flights Included",
      "Eco-Friendly Hotel",
      "Sustainable City Tour",
      "Nature Walks",
      "Organic Food Experiences",
    ],
    rating: 8.9,
    price: "85,000",
    currency: "₹",
  },
  {
    _id: "pkg48",
    title: "London Art Collector’s Tour",
    location: "5N London",
    image: london21,
    highlights: [
      "Flights Included",
      "Luxury Hotel",
      "Private Art Gallery Tour",
      "Art Auction Access",
      "Exclusive Art Events",
    ],
    rating: 9.4,
    price: "1,90,000",
    currency: "₹",
  },
  {
    _id: "pkg49",
    title: "London Football Fan Tour",
    location: "4N London",
    image: london22,
    highlights: [
      "Flights Included",
      "Hotel Stay",
      "Premier League Match Tickets",
      "Stadium Tour",
      "Fan Merchandise",
    ],
    rating: 9.1,
    price: "1,00,000",
    currency: "₹",
  },
  {
    _id: "pkg50",
    title: "London Educational Tour",
    location: "7N London",
    image: london23,
    highlights: [
      "Flights Included",
      "Student Accommodation",
      "University Visits",
      "Historical Tours",
      "Workshops and Lectures",
    ],
    rating: 9.0,
    price: "70,000",
    currency: "₹",
  },
  {
    _id: "pkg51",
    title: "London Culinary Tour",
    location: "5N London",
    image: london24,
    highlights: [
      "Flights Included",
      "Hotel Stay",
      "Michelin Star Dining",
      "Private Cooking Classes",
      "Market Visits",
    ],
    rating: 9.2,
    price: "1,35,000",
    currency: "₹",
  },
  {
    _id: "pkg52",
    title: "Singapore City Explorer",
    location: "4N Singapore",
    image: singapore1,
    highlights: [
      "Flights Included",
      "Hotel Stay",
      "City Tour",
      "Night Safari",
      "Sentosa Island",
    ],
    rating: 9.0,
    price: "80,000",
    currency: "₹",
  },
  {
    _id: "pkg53",
    title: "Singapore Adventure and Fun",
    location: "5N Singapore",
    image: singapore2,
    highlights: [
      "Flights Included",
      "Hotel Stay",
      "Universal Studios",
      "Adventure Cove Waterpark",
      "Skyline Luge",
    ],
    rating: 8.7,
    price: "1,00,000",
    currency: "₹",
  },
  {
    _id: "pkg54",
    title: "Singapore Cultural Delight",
    location: "3N Singapore",
    image: singapore3,
    highlights: [
      "Flights Included",
      "Hotel Stay",
      "Little India Tour",
      "Chinatown Visit",
      "Cultural Show",
    ],
    rating: 8.9,
    price: "70,000",
    currency: "₹",
  },
  {
    _id: "pkg55",
    title: "Singapore Luxury Getaway",
    location: "6N Singapore",
    image: singapore4,
    highlights: [
      "Flights Included",
      "Luxury Hotel",
      "Marina Bay Sands",
      "Private Yacht Tour",
      "Gourmet Dining",
    ],
    rating: 9.5,
    price: "2,50,000",
    currency: "₹",
  },
  {
    _id: "pkg56",
    title: "Singapore Honeymoon Special",
    location: "5N Singapore",
    image: singapore5,
    highlights: [
      "Flights Included",
      "Hotel Stay",
      "Couple Spa",
      "Romantic Dinner Cruise",
      "Gardens by the Bay",
    ],
    rating: 9.3,
    price: "1,50,000",
    currency: "₹",
  },
  {
    _id: "pkg57",
    title: "Singapore Family Fun Package",
    location: "6N Singapore",
    image: singapore6,
    highlights: [
      "Flights Included",
      "Hotel Stay",
      "Family Activities",
      "Universal Studios",
      "Singapore Zoo",
    ],
    rating: 8.8,
    price: "1,20,000",
    currency: "₹",
  },
  {
    _id: "pkg58",
    title: "Singapore Eco-Friendly Tour",
    location: "4N Singapore",
    image: singapore7,
    highlights: [
      "Flights Included",
      "Eco-Friendly Hotel",
      "Sustainable City Tour",
      "Nature Walks",
      "Organic Food Experiences",
    ],
    rating: 8.6,
    price: "85,000",
    currency: "₹",
  },
  {
    _id: "pkg59",
    title: "Singapore Nightlife and Party Tour",
    location: "3N Singapore",
    image: singapore8,
    highlights: [
      "Flights Included",
      "Hotel Stay",
      "Night Clubs",
      "Bar Crawl",
      "Sentosa Night Party",
    ],
    rating: 9.1,
    price: "90,000",
    currency: "₹",
  },
  {
    _id: "pkg60",
    title: "Singapore Shopping Spree",
    location: "5N Singapore",
    image: singapore9,
    highlights: [
      "Flights Included",
      "Hotel Stay",
      "Orchard Road Shopping",
      "VivoCity Mall",
      "Exclusive Shopping Vouchers",
    ],
    rating: 8.9,
    price: "1,10,000",
    currency: "₹",
  },
  {
    _id: "pkg61",
    title: "Singapore Business and Leisure Tour",
    location: "4N Singapore",
    image: singapore10,
    highlights: [
      "Flights Included",
      "Luxury Hotel",
      "Business Conference Facilities",
      "City Tour",
      "Fine Dining",
    ],
    rating: 9.4,
    price: "1,80,000",
    currency: "₹",
  },
  {
    _id: "pkg62",
    title: "Singapore Art and Museum Tour",
    location: "3N Singapore",
    image: singapore11,
    highlights: [
      "Flights Included",
      "Hotel Stay",
      "Art Science Museum",
      "National Gallery",
      "Singapore Art Week",
    ],
    rating: 8.7,
    price: "75,000",
    currency: "₹",
  },
  {
    _id: "pkg63",
    title: "Singapore Wellness and Spa Retreat",
    location: "5N Singapore",
    image: singapore12,
    highlights: [
      "Flights Included",
      "Luxury Resort",
      "Wellness Spa",
      "Yoga Sessions",
      "Healthy Dining",
    ],
    rating: 9.2,
    price: "1,40,000",
    currency: "₹",
  },
  {
    _id: "pkg64",
    title: "Singapore Foodie’s Paradise",
    location: "4N Singapore",
    image: singapore13,
    highlights: [
      "Flights Included",
      "Hotel Stay",
      "Michelin Star Dining",
      "Street Food Tour",
      "Cooking Classes",
    ],
    rating: 9.0,
    price: "95,000",
    currency: "₹",
  },
  {
    _id: "pkg65",
    title: "Singapore Wildlife Explorer",
    location: "5N Singapore",
    image: singapore14,
    highlights: [
      "Flights Included",
      "Hotel Stay",
      "Singapore Zoo",
      "River Safari",
      "Jurong Bird Park",
    ],
    rating: 8.9,
    price: "1,20,000",
    currency: "₹",
  },
  {
    _id: "pkg66",
    title: "Singapore Cruise and Stay",
    location: "6N Singapore & Cruise",
    image: singapore15,
    highlights: [
      "Flights Included",
      "Luxury Cruise",
      "Hotel Stay",
      "Sentosa Island",
      "Gourmet Dining",
    ],
    rating: 9.5,
    price: "2,00,000",
    currency: "₹",
  },
  {
    _id: "pkg67",
    title: "Singapore Educational Tour",
    location: "7N Singapore",
    image: singapore16,
    highlights: [
      "Flights Included",
      "Student Accommodation",
      "University Visits",
      "Workshops and Lectures",
      "Cultural Experiences",
    ],
    rating: 9.3,
    price: "85,000",
    currency: "₹",
  },
];

import Logo from "./Logo.jpg";
import avatar from "./avatar.png";
import arrows from "./arrows.png";
import navbar_logo from "./navbar_logo.png";
import dollar from "./dollar.png";
import booking from "./booking.png";
import experience from "./experience.png";
import FaceBook from "./FaceBook.png";
import Twitter from "./Twitter.png";
import YouTube from "./YouTube.png";
import CommonAreas from "./CommonAreas.png";
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
  avatar,
  arrows,
  navbar_logo,
  booking,
  experience,
  dollar,
  FaceBook,
  Twitter,
  YouTube,
  CommonAreas,
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

// Packages Details

export const _PackageDetails = [
  // Top Packages

  {
    _id: "pkg1",
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
    accessibility:
      "The property offers wheelchair-accessible pathways, elevators, and guest rooms. Additional amenities include accessible parking, auditory guidance, and braille signage for visually impaired guests to ensure a comfortable stay for all visitors.",
    commonAreas: ["Outdoor pool", "Bar", "Free parking"],
    packageType: "Group Tour",
  },
  {
    _id: "pkg2",
    gallery: [london4, london5, london6],
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
    accessibility:
      "The property is designed with accessibility in mind, providing wheelchair ramps, accessible rooms, and assistance for guests with disabilities.",
    commonAreas: ["Outdoor pool", "Bar", "Free parking"],
    packageType: "Family Specials",
  },
  {
    _id: "pkg3",
    gallery: [london7, london8, london9],
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
    accessibility:
      "Guests with disabilities will find the property equipped with necessary amenities, ensuring a pleasant stay.",
    commonAreas: ["Outdoor pool", "Bar", "Free parking"],
    packageType: "Group Tour",
  },
  {
    _id: "pkg4",
    gallery: [london10, london11, london12],
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
    accessibility:
      "This property provides various accessibility options to ensure all guests have a comfortable experience.",
    commonAreas: ["Outdoor pool", "Bar", "Free parking"],
    packageType: "Group Tour",
  },
  {
    _id: "pkg5",
    gallery: [london13, london14, london15],
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
    accessibility:
      "The property is family-friendly and includes amenities for families with children and guests with disabilities.",
    commonAreas: ["Outdoor pool", "Bar", "Free parking"],
    packageType: "Family Specials",
  },
  {
    _id: "pkg6",
    gallery: [london16, london17, london18],
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
    accessibility:
      "The property is accessible to all guests, providing necessary features for an enjoyable stay.",
    commonAreas: ["Outdoor pool", "Bar", "Free parking"],
    packageType: "Cruise Packages",
  },
  {
    _id: "pkg7",
    gallery: [london19, london20, london21],
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
    accessibility:
      "The property ensures accessibility for all guests, providing features for a comfortable stay.",
    commonAreas: ["Outdoor pool", "Bar", "Free parking"],
    packageType: "Cruise Packages",
  },
  {
    _id: "pkg8",
    gallery: [london22, london23, london24],
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
    accessibility:
      "The property is designed to be accessible for all guests, ensuring comfort and convenience during your stay.",
    commonAreas: ["Outdoor pool", "Bar", "Free parking"],
    packageType: "Group Tour",
  },
  {
    _id: "pkg9",
    gallery: [london1, london7, london3],
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
    accessibility:
      "The property is committed to accessibility, ensuring all guests have a pleasant stay.",
    commonAreas: ["Outdoor pool", "Bar", "Free parking"],
    packageType: "Family Specials",
  },
  {
    _id: "pkg10",
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
    accessibility:
      "The property includes features that support accessibility, ensuring all guests have a comfortable experience.",
    commonAreas: ["Outdoor pool", "Bar", "Free parking"],
    packageType: "Group Tour",
  },

  // All Packages 11 to 18

  {
    _id: "pkg11",
    gallery: [malaysia1, malaysia2, malaysia3],
    overview: [
      "Kuala Lumpur Highlights",
      "Experience the top attractions of Kuala Lumpur with city tours, luxurious 4-star accommodations, and visits to famous landmarks.",
      8.7,
    ],
    amenities: ["Free WiFi", "City Tours", "Airport Transfers", "Spa"],
    aboutProperty: {
      title: "Kuala Lumpur Highlights",
      subtitle: "Luxury stay in central Kuala Lumpur",
      description:
        "Located in the heart of Kuala Lumpur, this package offers a luxurious stay in a 4-star hotel with easy access to the city's top attractions. Guests can explore famous landmarks like the Petronas Towers and Aquaria KLCC. The hotel provides top-notch amenities like a spa, free Wi-Fi, and airport transfers for a convenient and comfortable stay.",
      perks: [
        "Free WiFi",
        "Airport transfers",
        "Spa",
        "On-site restaurant",
        "Fitness center",
        "Business center",
        "Concierge service",
        "Laundry service",
      ],
    },
    accessibility:
      "The property provides accessible rooms, elevators, and accessible parking to ensure a comfortable stay for all visitors.",
    commonAreas: ["Outdoor pool", "Restaurant", "Free parking"],
    packageType: "Group Tour",
  },

  {
    _id: "pkg12",
    gallery: [malaysia2, malaysia3, malaysia4],
    overview: [
      "Malaysia Beach Getaway",
      "Enjoy a tropical retreat in Langkawi with island hopping, water sports, and luxurious beachside accommodations.",
      9.1,
    ],
    amenities: ["Free WiFi", "Beachfront", "Spa", "Airport Transfers"],
    aboutProperty: {
      title: "Malaysia Beach Getaway",
      subtitle: "Relax in luxury at a beachfront resort",
      description:
        "Indulge in a luxurious beach getaway at a resort in Langkawi. With island hopping, water sports, and spa treatments, this package offers everything you need for a relaxing vacation. The beachfront resort provides premium accommodations, free Wi-Fi, and private transfers for a hassle-free experience.",
      perks: [
        "Free WiFi",
        "Beachfront rooms",
        "Spa",
        "On-site restaurant",
        "Private beach",
        "Water sports",
        "Concierge service",
        "Laundry service",
      ],
    },
    accessibility:
      "Wheelchair-accessible facilities are available, including pathways, elevators, and parking.",
    commonAreas: ["Private beach", "Outdoor pool", "Bar"],
    packageType: "Family Specials",
  },

  {
    _id: "pkg13",
    gallery: [malaysia3, malaysia4, malaysia5],
    overview: [
      "Cultural Malaysia Tour",
      "Discover Penang’s cultural heritage with boutique hotel stays, heritage walks, and local food tours.",
      8.5,
    ],
    amenities: [
      "Free WiFi",
      "Cultural Tours",
      "Airport Transfers",
      "Local Guides",
    ],
    aboutProperty: {
      title: "Cultural Malaysia Tour",
      subtitle: "Explore Penang's rich heritage",
      description:
        "Stay in boutique hotels and explore the cultural richness of Penang with this package. Enjoy heritage walks, local food tours, and cultural shows. The hotel offers a blend of comfort and culture with modern amenities, making your stay enjoyable and educational.",
      perks: [
        "Free WiFi",
        "Cultural tours",
        "Airport transfers",
        "Heritage walks",
        "On-site restaurant",
        "Laundry service",
      ],
    },
    accessibility:
      "Accessible facilities include wheelchair-friendly rooms, elevators, and parking.",
    commonAreas: ["Restaurant", "Free parking"],
    packageType: "Group Tour",
  },

  {
    _id: "pkg14",
    gallery: [malaysia4, malaysia5, malaysia6],
    overview: [
      "Malaysia Adventure Trip",
      "An adventurous 7-night trip with hiking, snorkeling, and exciting outdoor activities across Malaysia.",
      8.9,
    ],
    amenities: [
      "Free WiFi",
      "Adventure Tours",
      "Airport Transfers",
      "Equipment Rental",
    ],
    aboutProperty: {
      title: "Malaysia Adventure Trip",
      subtitle: "Experience adventure and nature in Malaysia",
      description:
        "Explore Malaysia's natural beauty with adventure activities like hiking, snorkeling, and trekking. Stay in comfortable hotels while enjoying outdoor excursions. The package offers all necessary amenities for adventure seekers, including free Wi-Fi and airport transfers.",
      perks: [
        "Free WiFi",
        "Adventure tours",
        "Airport transfers",
        "On-site restaurant",
        "Laundry service",
        "Concierge service",
      ],
    },
    accessibility: "The property offers accessible accommodation and parking.",
    commonAreas: ["Adventure gear rental", "Restaurant"],
    packageType: "Group Tour",
  },

  {
    _id: "pkg15",
    gallery: [malaysia5, malaysia6, malaysia7],
    overview: [
      "Malaysia Family Fun",
      "A fun-filled family package with theme parks, zoo visits, and family-friendly accommodations in Kuala Lumpur.",
      8.3,
    ],
    amenities: [
      "Free WiFi",
      "Family Activities",
      "Airport Transfers",
      "Theme Park Access",
    ],
    aboutProperty: {
      title: "Malaysia Family Fun",
      subtitle: "Perfect for a family vacation in Kuala Lumpur",
      description:
        "This package offers an exciting family vacation in Kuala Lumpur with visits to theme parks and zoos. The family-friendly hotel provides modern amenities to ensure a comfortable stay for all ages. Enjoy fun-filled activities and relax in spacious family suites.",
      perks: [
        "Free WiFi",
        "Family-friendly hotel",
        "Airport transfers",
        "Theme park access",
        "On-site restaurant",
        "Concierge service",
        "Laundry service",
      ],
    },
    accessibility:
      "Accessible facilities include family rooms, elevators, and parking.",
    commonAreas: ["Theme park", "Restaurant"],
    packageType: "Family Specials",
  },

  {
    _id: "pkg16",
    gallery: [malaysia6, malaysia7, malaysia8],
    overview: [
      "Malaysia Island Escape",
      "Escape to a private villa in Langkawi with beachside dining, island exploration, and boat tours.",
      9.2,
    ],
    amenities: ["Free WiFi", "Private Villa", "Spa", "Beachfront"],
    aboutProperty: {
      title: "Malaysia Island Escape",
      subtitle: "Luxury island retreat in Langkawi",
      description:
        "Relax in a private beachfront villa on Langkawi island. This package offers luxurious accommodations with beachside dining and island exploration. Enjoy spa treatments, boat tours, and stunning ocean views for a rejuvenating experience.",
      perks: [
        "Free WiFi",
        "Private villa",
        "Spa",
        "Beachfront dining",
        "Boat tours",
        "Concierge service",
        "Laundry service",
      ],
    },
    accessibility:
      "Wheelchair-friendly pathways, parking, and rooms are available.",
    commonAreas: ["Private beach", "Spa", "Restaurant"],
    packageType: "Family Specials",
  },

  {
    _id: "pkg17",
    gallery: [malaysia7, malaysia8, malaysia9],
    overview: [
      "Malaysia Honeymoon Special",
      "An exclusive honeymoon package with luxury resort stays, private tours, and romantic experiences.",
      9.4,
    ],
    amenities: [
      "Free WiFi",
      "Couple Spa",
      "Private Tours",
      "Airport Transfers",
    ],
    aboutProperty: {
      title: "Malaysia Honeymoon Special",
      subtitle: "Romantic getaway in a luxury resort",
      description:
        "Celebrate your honeymoon in style with this luxury package. Stay in a romantic resort with private tours and couple spa sessions. Enjoy candlelight dinners and exclusive experiences designed for couples. The resort provides top-tier services for a memorable stay.",
      perks: [
        "Free WiFi",
        "Couple spa",
        "Private tours",
        "Airport transfers",
        "On-site restaurant",
        "Candlelight dinner",
      ],
    },
    accessibility:
      "Accessible facilities include wheelchair-friendly rooms and dining areas.",
    commonAreas: ["Private beach", "Spa", "Restaurant"],
    packageType: "Cruise Packages",
  },

  {
    _id: "pkg18",
    gallery: [malaysia8, malaysia9, malaysia10],
    overview: [
      "Malaysia Backpacking Adventure",
      "A budget-friendly backpacking trip across Malaysia with hostel stays, public transport, and group tours.",
      8.1,
    ],
    amenities: [
      "Free WiFi",
      "Budget Accommodation",
      "Group Tours",
      "Public Transport",
    ],
    aboutProperty: {
      title: "Malaysia Backpacking Adventure",
      subtitle: "Explore Malaysia on a budget",
      description:
        "Designed for budget-conscious travelers, this package offers a 10-night backpacking trip across Malaysia. Stay in hostels, travel using public transport, and join group tours to explore the country. Perfect for adventurers looking to explore without breaking the bank.",
      perks: [
        "Free WiFi",
        "Budget accommodation",
        "Group tours",
        "Public transport",
        "Local dining options",
      ],
    },
    accessibility:
      "Limited accessible facilities due to the nature of budget accommodations.",
    commonAreas: ["Hostel common areas", "Shared kitchen"],
    packageType: "Group Tour",
  },

  // All Package Detail Incomplete For id 19 to 25

  {
    _id: "pkg19",
    gallery: [malaysia9, malaysia10, malaysia11],
    overview: [
      "Malaysia City Explorer",
      "Explore the vibrant city of Kuala Lumpur with exciting attractions and experiences.",
      8.6,
    ],
    amenities: [
      "Free WiFi",
      "Airport Transfers",
      "Guided Tours",
      "Food Experiences",
    ],
    aboutProperty: {
      title: "Malaysia City Explorer",
      subtitle: "Discover Kuala Lumpur's Best",
      description:
        "This package offers a deep dive into the culture and cuisine of Kuala Lumpur, allowing guests to enjoy guided tours of key landmarks and hidden gems, including street markets and local eateries.",
      perks: [
        "Free WiFi",
        "Airport transfers",
        "Guided tours",
        "Food experiences",
        "Central hotel location",
      ],
    },
    accessibility:
      "The property is designed with accessible pathways and facilities, ensuring all guests can enjoy their stay comfortably.",
    commonAreas: ["Lounge", "Restaurant", "Gift shop"],
    packageType: "Group Tour",
  },
  {
    _id: "pkg20",
    gallery: [malaysia10, malaysia11, malaysia12],
    overview: [
      "Malaysia Luxury Escape",
      "Indulge in a luxurious stay in Kuala Lumpur with top-notch amenities and personalized service.",
      9.5,
    ],
    amenities: [
      "Business Class Flights",
      "Spa",
      "Luxury Transport",
      "Private Tours",
    ],
    aboutProperty: {
      title: "Malaysia Luxury Escape",
      subtitle: "A Premium Experience in Kuala Lumpur",
      description:
        "This exclusive package includes stays in five-star hotels with luxurious amenities. Enjoy private tours and exquisite dining experiences, making it perfect for discerning travelers.",
      perks: [
        "Business Class Flights",
        "Luxury hotel stay",
        "Private city tours",
        "Fine dining experiences",
        "Luxury spa treatments",
      ],
    },
    accessibility:
      "The property offers enhanced accessibility features including ramps, elevators, and specially designed rooms.",
    commonAreas: ["Swimming pool", "Spa", "Lounge area"],
    packageType: "Family Specials",
  },
  {
    _id: "pkg21",
    gallery: [london1, london2, london3],
    overview: [
      "London City Break",
      "Experience the charm of London with a perfect blend of leisure and sightseeing.",
      9.0,
    ],
    amenities: [
      "Free WiFi",
      "Airport Transfers",
      "City Tours",
      "Breakfast Included",
    ],
    aboutProperty: {
      title: "London City Break",
      subtitle: "A Charming Stay in Central London",
      description:
        "Explore London's iconic attractions and enjoy a comfortable stay in a centrally located hotel with all essential amenities for a perfect getaway.",
      perks: [
        "Free WiFi",
        "Airport transfers",
        "Central hotel stay",
        "Breakfast included",
        "City sightseeing tours",
      ],
    },
    accessibility:
      "This property is equipped with facilities for guests with disabilities, ensuring a comfortable and accessible stay.",
    commonAreas: ["Lounge", "Bar", "Business center"],
    packageType: "Group Tour",
  },
  {
    _id: "pkg22",
    gallery: [london2, london3, london4],
    overview: [
      "London and Beyond",
      "Discover London and nearby attractions with ease and comfort.",
      9.3,
    ],
    amenities: [
      "Flights Included",
      "Multi-City Hotel Stays",
      "Transfers Included",
    ],
    aboutProperty: {
      title: "London and Beyond",
      subtitle: "A Comprehensive Tour of London and Its Surroundings",
      description:
        "Enjoy an unforgettable experience as you explore London and its surroundings, including historical sites and beautiful landscapes.",
      perks: [
        "Flights included",
        "Hotel stays in multiple cities",
        "Private transfers",
        "Guided tours of major attractions",
        "Cultural experiences",
      ],
    },
    accessibility:
      "The property is accessible with features like ramps and lifts for easy movement throughout the premises.",
    commonAreas: ["Common Lounge", "Outdoor Gardens", "Game Room"],
    packageType: "Family Specials",
  },
  {
    _id: "pkg23",
    gallery: [london3, london4, london5],
    overview: [
      "Historical London Tour",
      "Journey through London’s rich history with guided tours and iconic landmarks.",
      8.7,
    ],
    amenities: ["Round Trip Flights", "3 Star Hotel", "Breakfast Included"],
    aboutProperty: {
      title: "Historical London Tour",
      subtitle: "Explore the Historical Riches of London",
      description:
        "Immerse yourself in London's fascinating history with visits to key historical sites and expert-led tours.",
      perks: [
        "Round trip flights",
        "3-star hotel accommodation",
        "Daily breakfast",
        "Historical walking tours",
        "Access to museums and landmarks",
      ],
    },
    accessibility:
      "The property is equipped with facilities to support guests with mobility challenges.",
    commonAreas: ["Library", "Cafeteria", "Garden"],
    packageType: "Cruise Packages",
  },
  {
    _id: "pkg24",
    gallery: [london4, london5, london6],
    overview: [
      "London Family Vacation",
      "A fun-filled family vacation in London with activities for everyone.",
      9.1,
    ],
    amenities: ["Flights Included", "Family-Friendly Hotel", "Tour Packages"],
    aboutProperty: {
      title: "London Family Vacation",
      subtitle: "Create Unforgettable Memories in London",
      description:
        "Enjoy a family-friendly vacation with activities and attractions that cater to all ages, ensuring fun for the whole family.",
      perks: [
        "Flights included",
        "Family-friendly hotel accommodation",
        "Attractions suitable for kids",
        "Flexible itinerary options",
        "Meal plans for families",
      ],
    },
    accessibility:
      "The property features family-friendly accessibility options and facilities.",
    commonAreas: [
      "Children's Play Area",
      "Family Lounge",
      "Outdoor Recreation Area",
    ],
    packageType: "Family Specials",
  },
  {
    _id: "pkg25",
    gallery: [london5, london6, london7],
    overview: [
      "London Honeymoon Special",
      "Experience romance and luxury in the heart of London.",
      9.5,
    ],
    amenities: [
      "Business Class Flights",
      "Luxury Hotel Stay",
      "Candlelight Dinner",
    ],
    aboutProperty: {
      title: "London Honeymoon Special",
      subtitle: "A Romantic Escape in London",
      description:
        "Celebrate your love with a luxurious honeymoon package that includes special dining experiences and romantic excursions.",
      perks: [
        "Business class flights",
        "Luxury hotel stay",
        "Private city tours",
        "Candlelight dinners",
        "Couples' spa treatments",
      ],
    },
    accessibility:
      "The property offers a romantic yet accessible setting for all guests.",
    commonAreas: ["Rooftop Bar", "Romantic Garden", "Spa"],
    packageType: "Family Specials",
  },

  //  All Package Detail from 26 to 32

  {
    _id: "pkg26",
    gallery: [london6, london7, london8],
    overview: [
      "London Backpacking Adventure",
      "Experience an exciting backpacking journey through London, visiting key landmarks and enjoying budget-friendly options.",
      8.2,
    ],
    amenities: [
      "Public Transport Pass",
      "Free WiFi",
      "Shared Kitchen",
      "Laundry Service",
    ],
    aboutProperty: {
      title: "London Backpacking Adventure",
      subtitle: "Explore London on a budget",
      description:
        "This package is designed for adventurers who want to experience London without breaking the bank. Stay in hostels, enjoy local cuisine, and immerse yourself in the city's vibrant culture. You'll have access to free museum visits and guided city walks.",
      perks: [
        "Budget-friendly accommodation",
        "Local guides for tours",
        "Free transport passes",
        "Access to local events",
        "Shared kitchen facilities",
      ],
    },
    accessibility:
      "The accommodation offers accessible rooms and facilities, including ramps and elevators for easy access.",
    commonAreas: ["Common Room", "Outdoor Terrace", "Dining Area"],
    packageType: "Cruise Packages",
  },
  {
    _id: "pkg27",
    gallery: [london7, london8, london9],
    overview: [
      "Luxury London Retreat",
      "Indulge in a lavish stay with top-notch amenities and personalized service in the heart of London.",
      9.6,
    ],
    amenities: [
      "Spa Treatment",
      "Room Service",
      "Airport Transfers",
      "Gym Access",
    ],
    aboutProperty: {
      title: "Luxury London Retreat",
      subtitle: "Pamper yourself in style",
      description:
        "Experience the best of luxury in London with this exclusive package. Stay at a 5-star hotel with exquisite dining options, a world-class spa, and private city tours. This retreat offers everything you need for a memorable escape.",
      perks: [
        "Business Class Flights",
        "Fine dining experiences",
        "Private transfers",
        "Gourmet breakfast included",
        "Concierge service",
      ],
    },
    accessibility:
      "The hotel provides wheelchair-accessible facilities, ensuring comfort for all guests.",
    commonAreas: ["Lounge Bar", "Rooftop Terrace", "Spa Area"],
    packageType: "Cruise Packages",
  },
  {
    _id: "pkg28",
    gallery: [london8, london9, london10],
    overview: [
      "London and Paris Combo",
      "A fantastic journey through two iconic cities, including memorable sights and experiences.",
      9.4,
    ],
    amenities: [
      "Eurostar Train",
      "City Tours",
      "Hotel Stays",
      "Breakfast Included",
    ],
    aboutProperty: {
      title: "London and Paris Combo",
      subtitle: "Experience the best of London and Paris",
      description:
        "This combo package offers an unforgettable experience in both London and Paris. Enjoy stays at central hotels, guided tours, and exclusive visits to iconic landmarks in both cities.",
      perks: [
        "Flights included",
        "Central hotel stays in both cities",
        "Eiffel Tower visit",
        "Thames River cruise",
        "Local experiences and tours",
      ],
    },
    accessibility:
      "Both cities provide accessible transportation options and accommodations for guests with mobility challenges.",
    commonAreas: [
      "Hotel Lounges",
      "Public Transport Stations",
      "Common Areas in Hotels",
    ],
    packageType: "Cruise Packages",
  },
  {
    _id: "pkg29",
    gallery: [london9, london10, london11],
    overview: [
      "London Art and Culture Tour",
      "Discover London's rich cultural scene with visits to museums and galleries.",
      8.9,
    ],
    amenities: [
      "Museum Pass",
      "City Tours",
      "Local Guides",
      "Transfers Included",
    ],
    aboutProperty: {
      title: "London Art and Culture Tour",
      subtitle: "A deep dive into London's art scene",
      description:
        "Explore London's vibrant art and culture with this special package. Visit famous museums, enjoy local art galleries, and participate in historical walking tours to fully immerse yourself in the city's artistic offerings.",
      perks: [
        "Flights included",
        "Exclusive museum access",
        "Guided cultural experiences",
        "Historical site visits",
        "Local cuisine tasting",
      ],
    },
    accessibility:
      "The package includes visits to accessible venues and transportation options suitable for all guests.",
    commonAreas: ["Museum Lobbies", "Art Galleries", "Public Squares"],
    packageType: "Cruise Packages",
  },
  {
    _id: "pkg30",
    gallery: [london10, london11, singapore1],
    overview: [
      "Classic London Experience",
      "A quintessential tour of London's most iconic sights and attractions.",
      8.8,
    ],
    amenities: [
      "Central Hotel Stay",
      "Guided Tours",
      "Breakfast Included",
      "Transfers",
    ],
    aboutProperty: {
      title: "Classic London Experience",
      subtitle: "Explore the must-see sights of London",
      description:
        "This classic package includes everything you need to experience London’s iconic landmarks. Enjoy guided city tours, central hotel accommodations, and breakfast to fuel your adventures.",
      perks: [
        "Round trip flights",
        "Iconic landmark visits",
        "Shopping tours",
        "Local experiences included",
        "Private transfers available",
      ],
    },
    accessibility:
      "The package ensures accessibility at all landmarks and accommodations for guests with mobility challenges.",
    commonAreas: ["Hotel Lounge", "Tour Meeting Points", "Public Areas"],
    packageType: "Group Tour",
  },
  {
    _id: "pkg31",
    gallery: [london11, singapore1, malaysia9],
    overview: [ 
      "London Foodie Adventure",
      "A culinary journey through London’s best food spots and experiences.",
      9.2,
    ],
    amenities: ["Food Tours", "Cooking Class", "Local Guides", "Hotel Stay"],
    aboutProperty: {
      title: "London Foodie Adventure",
      subtitle: "Taste the best of London",
      description:
        "Dive into London’s diverse food scene with this unique foodie adventure. Participate in local food tours, cooking classes, and exclusive dining experiences to savor the best flavors the city has to offer.",
      perks: [
        "Flights included",
        "Local food experiences",
        "Exclusive dining options",
        "Cooking classes available",
        "Local guide for insider tips",
      ],
    },
    accessibility:
      "All venues and experiences included in the package are accessible to ensure a comfortable journey.",
    commonAreas: ["Restaurants", "Cooking Schools", "Food Markets"],
    packageType: "Family Specials",
  },
  {
    _id: "pkg32",
    gallery: [singapore1, singapore2, singapore3],
    overview: [
      "Singapore City Explorer",
      "An exciting exploration of Singapore's top attractions and experiences.",
      9.0,
    ],
    amenities: ["City Tour", "Hotel Stay", "Night Safari", "Transfers"],
    aboutProperty: {
      title: "Singapore City Explorer",
      subtitle: "Discover the wonders of Singapore",
      description:
        "This package takes you on an adventure through Singapore, including city tours, visits to iconic landmarks, and a thrilling night safari. Enjoy comfortable accommodations and seamless transfers throughout your stay.",
      perks: [
        "Flights included",
        "Hotel stay at central locations",
        "Night safari experience",
        "Guided city tours",
        "Shopping opportunities",
      ],
    },
    accessibility:
      "The city provides a range of accessible options for tourists, ensuring a comfortable experience for everyone.",
    commonAreas: ["Shopping Malls", "Public Parks", "Tourist Attractions"],
    packageType: "Cruise Package",
  },

  //  All Package Detail from 33 to 40

  {
    _id: "pkg33",
    gallery: [singapore4, singapore5, singapore6],
    overview: [
      "Singapore Adventure and Fun",
      "Explore Singapore's vibrant city and thrilling attractions, from Universal Studios to Gardens by the Bay.",
      8.7,
    ],
    amenities: ["Free WiFi", "Air conditioning", "Airport Transfers", "Spa"],
    aboutProperty: {
      title: "Singapore Adventure and Fun",
      subtitle: "Thrilling experiences in Singapore",
      description:
        "Discover the best of Singapore with this exciting package. Explore Universal Studios, Gardens by the Bay, and Adventure Cove Waterpark. Enjoy delicious local cuisine and experience the vibrant nightlife.",
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
    accessibility:
      "The property offers wheelchair-accessible pathways, elevators, and guest rooms. Additional amenities include accessible parking, auditory guidance, and braille signage for visually impaired guests to ensure a comfortable stay for all visitors.",
    commonAreas: ["Outdoor pool", "Bar", "Free parking"],
    packageType: "Cruise Packages",
  },

  {
    _id: "pkg34",
    gallery: [singapore5, singapore6, singapore7],
    overview: [
      "Singapore Cultural Delight",
      "Immerse yourself in Singapore's rich culture, exploring Chinatown, Little India, and cultural performances.",
      8.9,
    ],
    amenities: ["Free WiFi", "Air conditioning", "Airport Transfers", "Spa"],
    aboutProperty: {
      title: "Singapore Cultural Delight",
      subtitle: "Discover Singapore's vibrant culture",
      description:
        "Experience the diverse culture of Singapore with this package. Explore Chinatown, Little India, and Kampong Glam. Enjoy traditional performances and savor authentic local cuisine.",
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
    accessibility:
      "The property offers wheelchair-accessible pathways, elevators, and guest rooms. Additional amenities include accessible parking, auditory guidance, and braille signage for visually impaired guests to ensure a comfortable stay for all visitors.",
    commonAreas: ["Outdoor pool", "Bar", "Free parking"],
    packageType: "Group Tour",
  },

  {
    _id: "pkg35",
    gallery: [singapore7, singapore8, singapore9],
    overview: [
      "Singapore Luxury Getaway",
      "Indulge in luxury and sophistication with a stay at the iconic Marina Bay Sands and enjoy exclusive experiences.",
      9.5,
    ],
    amenities: ["Free WiFi", "Air conditioning", "Airport Transfers", "Spa"],
    aboutProperty: {
      title: "Singapore Luxury Getaway",
      subtitle: "Experience luxury in Singapore",
      description:
        "Experience the epitome of luxury in Singapore with this unforgettable package. Stay at the iconic Marina Bay Sands, enjoy a private yacht tour, and indulge in gourmet dining at Michelin-starred restaurants.",
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
    accessibility:
      "The property offers wheelchair-accessible pathways, elevators, and guest rooms. Additional amenities include accessible parking, auditory guidance, and braille signage for visually impaired guests to ensure a comfortable stay for all visitors.",
    commonAreas: ["Outdoor pool", "Bar", "Free parking"],
    packageType: "Cruise Packages",
  },

  {
    _id: "pkg36",
    gallery: [singapore9, singapore10, singapore11],
    overview: [
      "Singapore Honeymoon Special",
      "Create unforgettable memories with your loved one on a romantic honeymoon in Singapore.",
      9.3,
    ],
    amenities: ["Free WiFi", "Air conditioning", "Airport Transfers", "Spa"],
    aboutProperty: {
      title: "Singapore Honeymoon Special",
      subtitle: "Romantic escape in Singapore",
      description:
        "Celebrate your love with a romantic honeymoon in Singapore. Enjoy a couple's spa treatment, a romantic dinner cruise, and explore the enchanting Gardens by the Bay.",
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
    accessibility:
      "The property offers wheelchair-accessible pathways, elevators, and guest rooms. Additional amenities include accessible parking, auditory guidance, and braille signage for visually impaired guests to ensure a comfortable stay for all visitors.",
    commonAreas: ["Outdoor pool", "Bar", "Free parking"],
    packageType: "Family Specials",
  },

  {
    _id: "pkg37",
    gallery: [singapore12, singapore13, singapore16],
    overview: [
      "Singapore Family Fun Package",
      "Create lasting memories with your family on a fun-filled vacation in Singapore.",
      8.8,
    ],
    amenities: ["Free WiFi", "Air conditioning", "Airport Transfers", "Spa"],
    aboutProperty: {
      title: "Singapore Family Fun Package",
      subtitle: "Fun for the whole family in Singapore",
      description:
        "Enjoy a family-friendly vacation in Singapore with this exciting package. Visit Universal Studios, Singapore Zoo, and other kid-friendly attractions. Create unforgettable memories with your loved ones.",
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
    accessibility:
      "The property offers wheelchair-accessible pathways, elevators, and guest rooms. Additional amenities include accessible parking, auditory guidance, and braille signage for visually impaired guests to ensure a comfortable stay for all visitors.",
    commonAreas: ["Outdoor pool", "Bar", "Free parking"],
    packageType: "Family Specials",
  },

  {
    _id: "pkg38",
    gallery: [singapore5, singapore3, singapore8],
    overview: [
      "Singapore Eco-Friendly Tour",
      "Discover Singapore's sustainable side with this eco-friendly tour, focusing on nature and conservation.",
      8.6,
    ],
    amenities: ["Free WiFi", "Air conditioning", "Airport Transfers", "Spa"],
    aboutProperty: {
      title: "Singapore Eco-Friendly Tour",
      subtitle: "Sustainable adventures in Singapore",
      description:
        "Embrace sustainability with this eco-friendly tour of Singapore. Explore nature parks, learn about conservation efforts, and experience organic food and accommodations.",
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
    accessibility:
      "The property offers wheelchair-accessible pathways, elevators, and guest rooms. Additional amenities include accessible parking, auditory guidance, and braille signage for visually impaired guests to ensure a comfortable stay for all visitors.",
    commonAreas: ["Outdoor pool", "Bar", "Free parking"],
    packageType: "Group Tour",
  },

  {
    _id: "pkg39",
    gallery: [singapore7, singapore2, singapore16],
    overview: [
      "Singapore Nightlife and Party Tour",
      "Experience Singapore's vibrant nightlife with this exciting tour, featuring clubs, bars, and party scenes.",
      9.1,
    ],
    amenities: ["Free WiFi", "Air conditioning", "Airport Transfers", "Spa"],
    aboutProperty: {
      title: "Singapore Nightlife and Party Tour",
      subtitle: "Experience Singapore's vibrant nightlife",
      description:
        "Dance the night away in Singapore with this exciting party tour. Explore trendy clubs, bars, and rooftop lounges. Enjoy live music, DJs, and vibrant atmospheres.",
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
    accessibility:
      "The property offers wheelchair-accessible pathways, elevators, and guest rooms. Additional amenities include accessible parking, auditory guidance, and braille signage for visually impaired guests to ensure a comfortable stay for all visitors.",
    commonAreas: ["Outdoor pool", "Bar", "Free parking"],
    packageType: "Group Tour",
  },

  {
    _id: "pkg40",
    gallery: [london2, london6, london13],
    overview: [
      "Singapore Shopping Spree",
      "Indulge in retail therapy with this shopping package, featuring exclusive discounts and access to top malls.",
      8.9,
    ],
    amenities: ["Free WiFi", "Air conditioning", "Airport Transfers", "Spa"],
    aboutProperty: {
      title: "Singapore Shopping Spree",
      subtitle: "Shop 'til you drop in Singapore",
      description:
        "Discover Singapore's vibrant shopping scene with this exclusive package. Explore Orchard Road, VivoCity Mall, and other top shopping destinations. Enjoy exclusive discounts and personalized shopping assistance.",
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
    accessibility:
      "The property offers wheelchair-accessible pathways, elevators, and guest rooms. Additional amenities include accessible parking, auditory guidance, and braille signage for visually impaired guests to ensure a comfortable stay for all visitors.",
    commonAreas: ["Outdoor pool", "Bar", "Free parking"],
    packageType: "Group Tour",
  },

  // All Packages Detail 41 to 43

  {
    _id: "pkg41",
    gallery: [malaysia9, malaysia7, malaysia13],
    overview: [
      "Singapore Business and Leisure Tour",
      "Combine business and pleasure with this tour, offering a blend of work and leisure activities in Singapore.",
      9.4,
    ],
    amenities: ["Free WiFi", "Air conditioning", "Airport Transfers", "Spa"],
    aboutProperty: {
      title: "Singapore Business and Leisure Tour",
      subtitle: "Blend work and play in Singapore",
      description:
        "Combine business and leisure with this exciting tour. Attend business conferences, explore Singapore's attractions, and enjoy a relaxing stay in a luxury hotel. This package offers the perfect blend of work and play.",
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
    accessibility:
      "The property offers wheelchair-accessible pathways, elevators, and guest rooms. Additional amenities include accessible parking, auditory guidance, and braille signage for visually impaired guests to ensure a comfortable stay for all visitors.",
    commonAreas: ["Outdoor pool", "Bar", "Free parking"],
    packageType: "Family Specials",
  },

  {
    _id: "pkg42",
    gallery: [london7, london12, london13],
    overview: [
      "Singapore Art and Museum Tour",
      "Immerse yourself in Singapore's vibrant art scene with this tour, visiting world-class museums and galleries.",
      8.7,
    ],
    amenities: ["Free WiFi", "Air conditioning", "Airport Transfers", "Spa"],
    aboutProperty: {
      title: "Singapore Art and Museum Tour",
      subtitle: "Explore Singapore's art scene",
      description:
        "Discover Singapore's vibrant art scene with this exciting tour. Visit world-class museums like the Art Science Museum and the National Gallery. Explore local galleries and immerse yourself in Singapore's artistic heritage.",
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
    accessibility:
      "The property offers wheelchair-accessible pathways, elevators, and guest rooms. Additional amenities include accessible parking, auditory guidance, and braille signage for visually impaired guests to ensure a comfortable stay for all visitors.",
    commonAreas: ["Outdoor pool", "Bar", "Free parking"],
    packageType: "Group Tour",
  },

  {
    _id: "pkg43",
    gallery: [london3, london7, london13],
    overview: [
      "Singapore Wellness and Spa Retreat",
      "Relax and rejuvenate with this wellness and spa retreat in Singapore, offering tranquility and pampering.",
      9.2,
    ],
    amenities: ["Free WiFi", "Air conditioning", "Airport Transfers", "Spa"],
    aboutProperty: {
      title: "Singapore Wellness and Spa Retreat",
      subtitle: "Relax and rejuvenate in Singapore",
      description:
        "Escape the hustle and bustle and find inner peace with this wellness and spa retreat in Singapore. Enjoy relaxing spa treatments, yoga sessions, and healthy dining options. Restore your mind, body, and soul in this tranquil oasis.",
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
    accessibility:
      "The property offers wheelchair-accessible pathways, elevators, and guest rooms. Additional amenities include accessible parking, auditory guidance, and braille signage for visually impaired guests to ensure a comfortable stay for all visitors.",
    commonAreas: ["Outdoor pool", "Bar", "Free parking"],
    packageType: "Family Specials",
  },
];

// Top Packages

export const _TopPackages = [
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
  },
];

// All Packages

export const _AllPackages = [
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
    _id: "pkg22",
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
    _id: "pkg23",
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
    _id: "pkg24",
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
    _id: "pkg25",
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
    _id: "pkg26",
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
    _id: "pkg27",
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
    _id: "pkg28",
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
    _id: "pkg29",
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
    _id: "pkg30",
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
    _id: "pkg31",
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
    _id: "pkg32",
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
    _id: "pkg33",
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
    _id: "pkg34",
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
    _id: "pkg35",
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
    _id: "pkg36",
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
    _id: "pkg37",
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
    _id: "pkg38",
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
    _id: "pkg39",
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
    _id: "pkg40",
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
    _id: "pkg41",
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
    _id: "pkg42",
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
    _id: "pkg43",
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
];

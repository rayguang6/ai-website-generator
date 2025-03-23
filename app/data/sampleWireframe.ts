import { WireframeData } from '../types/wireframe';

export const sampleWireframe: WireframeData = {
  pageType: "landing",
  pageName: "Travel Booking Platform",
  sections: [
    {
      id: "header",
      type: "navigation",
      content: {
        logo: "Travel Co",
        menuItems: ["Flights", "Hotels", "Car Rentals", "Vacation Packages"],
        cta: "Sign Up / Log In"
      }
    },
    {
      id: "hero",
      type: "hero",
      content: {
        headline: "Discover Your Next Adventure",
        subheadline: "Book flights, hotels, and more at the best prices",
        searchBar: {
          placeholder: "Where would you like to go?",
          filters: ["Destination", "Dates", "Travelers"]
        },
        cta: {
          text: "Find Deals",
          url: "#deals"
        }
      }
    },
    {
      id: "features",
      type: "features",
      content: {
        heading: "Why Choose Us",
        subheading: "Experience the best in travel booking",
        features: [
          {
            title: "Best Prices",
            description: "We compare thousands of deals to get you the best price",
            icon: "dollar-sign"
          },
          {
            title: "Easy Booking",
            description: "Book your entire trip in just a few clicks",
            icon: "check-circle"
          },
          {
            title: "24/7 Support",
            description: "Our customer service team is always available",
            icon: "headphones"
          }
        ]
      }
    },
    {
      id: "testimonials",
      type: "testimonials",
      content: {
        heading: "What Our Customers Say",
        testimonials: [
          {
            quote: "I found the perfect vacation package at an incredible price!",
            author: "Sarah Johnson",
            role: "Frequent Traveler"
          },
          {
            quote: "The booking process was seamless and customer support was excellent.",
            author: "Michael Chen",
            role: "Business Traveler"
          }
        ]
      }
    },
    {
      id: "footer",
      type: "footer",
      content: {
        logo: "Travel Co",
        menuGroups: [
          {
            title: "Company",
            items: [
              { name: "About Us", url: "/about" },
              { name: "Careers", url: "/careers" },
              { name: "Contact", url: "/contact" }
            ]
          },
          {
            title: "Support",
            items: [
              { name: "Help Center", url: "/help" },
              { name: "FAQs", url: "/faqs" },
              { name: "Terms of Service", url: "/terms" }
            ]
          }
        ],
        copyright: "© 2023 Travel Co. All rights reserved."
      }
    }
  ]
}; 
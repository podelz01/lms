"use client";

import { useState, useEffect } from "react";
import styles from "./styles/Partner.module.css";
import PartnerCard from "./components/PartnerCard";


interface Partner {
  id: number;
  companyName: string;
  logo: string;
  summaryService: string;
  website: string;
  contactEmail: string;
  phoneNumber: string;
  location: string;
  // ... other fields
}

// Dummy data for partners (replace with actual data fetching)
const dummyPartners: Partner= [
  {
    id: 1,
    companyName: "Partner A",
    logo: "/partner_a_logo.png", // Replace with actual logo URL
    summaryService: "Provides IT training and consulting services",
    website: "https://www.partnera.com",
    contactEmail: "contact@partnera.com",
    phoneNumber: "123-456-7890",
    location: "Jakarta, Indonesia",
    // ... other fields
  },
  {
    id: 2,
    companyName: "Partner B",
    logo: "/partner_b_logo.png", // Replace with actual logo URL
    summaryService: "Specializes in leadership development programs",
    website: "https://www.partnerb.com",
    contactEmail: "info@partnerb.com",
    phoneNumber: "987-654-3210",
    location: "Surabaya, Indonesia",
    // ... other fields
  },
  {
    id: 3,
    companyName: "Partner B",
    logo: "/partner_b_logo.png", // Replace with actual logo URL
    summaryService: "Specializes in leadership development programs",
    website: "https://www.partnerb.com",
    contactEmail: "info@partnerb.com",
    phoneNumber: "987-654-3210",
    location: "Surabaya, Indonesia",
    // ... other fields
  },
  {
    id: 4,
    companyName: "Partner B",
    logo: "/partner_b_logo.png", // Replace with actual logo URL
    summaryService: "Specializes in leadership development programs",
    website: "https://www.partnerb.com",
    contactEmail: "info@partnerb.com",
    phoneNumber: "987-654-3210",
    location: "Surabaya, Indonesia",
    // ... other fields
  },  {
    id: 5,
    companyName: "Partner B",
    logo: "/partner_b_logo.png", // Replace with actual logo URL
    summaryService: "Specializes in leadership development programs",
    website: "https://www.partnerb.com",
    contactEmail: "info@partnerb.com",
    phoneNumber: "987-654-3210",
    location: "Surabaya, Indonesia",
    // ... other fields
  },  
  // ... more partners
];

export default function Partners() {
  const [partners, setPartners] = useState<Partner>();
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const fetchPartners = async () => {
      setIsLoading(true);
      try {
        // Simulate fetching data from an API
        const pager = 10;
        
        const newPartners = dummyPartners.slice(
          (currentPage - 1) * pager,
          currentPage * pager,
        );

        const nextPartners = dummyPartners.slice(
          ((currentPage+1) - 1) * pager,
          (currentPage+1) * pager,

        );

        console.log(newPartners.length );

        (partners
            ? setPartners((prevPartners) => [...prevPartners, ...newPartners])
            : setPartners(newPartners)
        );
        
        setHasMore(nextPartners.length > 0);

      } catch (error) {
        console.error("Error fetching partners:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPartners();
  }, [currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
          document.documentElement.offsetHeight &&
        hasMore &&
        !isLoading
      ) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, isLoading]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
    setCurrentPage(1); // Reset to first page when searching
    // setPartners(); // Clear existing partners
  };

  const filteredPartners =   partners && Array.isArray(partners)
  ? partners.filter((partner: Partner) => {
    const values = Object.values(partner).map((value) =>
      String(value).toLowerCase(),
    );
    return values.some((value) => value.includes(searchTerm));
  }):null;

  const handleCardClick = (partnerId: number) => {
    // Implement navigation to the partner details page
    console.log("View details for partner ID:", partnerId);
  };
  
  const loadMorePartners = () => {
    if (hasMore && !isLoading) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Partners</h1>

      <div className={styles.searchContainer}>
        <input type="text" placeholder="Search..." onChange={handleSearch} />
      </div>

      {partners && (

      <div className={styles.cardList}>
        {filteredPartners.map((partner) => (
          <PartnerCard
            key={partner.id}
            partner={partner}
            onClick={() => handleCardClick(partner.id)}
          />
        ))}
      </div>

      )}

      {isLoading && <p>Loading...</p>}

      {hasMore && !isLoading && (
        <button onClick={loadMorePartners} className={styles.loadMoreButton}>
          More
        </button>
      )}
    </div>
  );
}
//lib/data.ts
import type { Product, StoreHours } from "@/types";

export const products: Product[] = [
  // Breads
 
  {
    id: "ragbrod",
    name: "Dark Rye Bread",
    nameSv: "Mörkt Rågbröd",
    description: "Dense, hearty rye bread with a deep, earthy flavor. Perfect for open-faced sandwiches.",
    descriptionSv: "Kompakt, mättande rågbröd med en djup, jordig smak. Perfekt till smörgåsar.",
    price: 58,
    category: "bread",
    image: "/images/rye.jpg",
    available: true,
    featured: true,
    allergens: ["gluten"],
    weight: "700g",
  },
  {
    id: "Surdegsbaguett",
    name: "Baguette",
    nameSv: "Surdegsbaguett",
    description: "Crusty artisan baguette with an airy interior. Baked fresh daily.",
    descriptionSv: "Knaprig baguette med luftigt innanmäte. Nybakat varje dag.",
    price: 35,
    category: "bread",
    image: "/images/baguette.jpg",
    available: true,
    allergens: ["gluten"],
    weight: "250g",
  },
  {
    id: "havrebrod",
    name: "Oat Loaf",
    nameSv: "Havrebröd",
    description: "Soft, wholesome bread with rolled oats. Slightly sweet with a tender crumb.",
    descriptionSv: "Mjukt, nyttigt bröd med havregryn. Lätt sött med fin konsistens.",
    price: 52,
    category: "bread",
    image: "/images/rye.jpg",
    available: true,
    allergens: ["gluten", "oats"],
    weight: "600g",
  },

  
  // Pastries
  {
    id: "kanelbulle",
    name: "Cinnamon Bun",
    nameSv: "Kanelbulle",
    description: "The iconic Swedish cinnamon bun with pearl sugar. Soft, fragrant, and utterly irresistible.",
    descriptionSv: "Den ikoniska svenska kanelbullen med pärlsocker. Mjuk, doftande och oemotståndlig.",
    price: 32,
    category: "pastry",
    image: "/images/cinnamon.jpg",
    available: true,
    featured: true,
    allergens: ["gluten", "dairy", "eggs"],
  },
  {
    id: "kardemummabulle",
    name: "Cardamom Bun",
    nameSv: "Kardemummabulle",
    description: "Aromatic cardamom-spiced bun with a hint of sweetness. A fragrant twist on tradition.",
    descriptionSv: "Aromatisk kardemummakryddad bulle med en hint av sötma. En doftande twist på traditionen.",
    price: 35,
    category: "pastry",
    image: "/images/cardamom.jpg",
    available: true,
    featured: true,
    allergens: ["gluten", "dairy", "eggs"],
  },
  {
    id: "semla",
    name: "Semla",
    nameSv: "Semla",
    description: "Traditional cardamom bun filled with almond paste and whipped cream. Seasonal favorite.",
    descriptionSv: "Traditionell kardemummabulle fylld med mandelmassa och grädde. Säsongens favorit.",
    price: 48,
    category: "pastry",
    image: "/images/semla.jpg",
    available: true,
    allergens: ["gluten", "dairy", "eggs", "almonds"],
  }
 
];

export const storeHours: StoreHours[] = [
  { day: "Måndag", open: "", close: "", closed: true },
  { day: "Tisdag", open: "08:00", close: "18:00" },
  { day: "Onsdag", open: "08:00", close: "18:00" },
  { day: "Torsdag", open: "08:00", close: "18:00" },
  { day: "Fredag", open: "08:00", close: "18:00" },
  { day: "Lördag", open: "08:00", close: "16:00" },
  { day: "Söndag", open: "08:00", close: "16:00" },
];

export const bakeryInfo = {
  name: "Lilla Sur",
  tagline: "Göteborgs Hantverksbageri",
  description: "Ett ekologiskt bageri i Kålltorp sedan 2014. Vi bakar alla bröd för hand på 100% ekologiskt och KRAV-märkt svenskt mjöl.",
  address: {
    street: "Solrosgatan 11",
    postalCode: "416 51",
    city: "Göteborg",
    country: "Sverige",
  },
  contact: {
    email: "butiken@lillasur.se",
    instagram: "@lillasurgbg",
  },
  coordinates: {
    lat: 57.7202,
    lng: 12.0183,
  },
};


export function getProductsByCategory(category: string, productsList : Product[]): Product[] {
  return productsList.filter((p) => p.category === category && p.available);
}

export function getFeaturedProducts(productsList : Product[]): Product[] {
  return productsList.filter((p) => p.featured && p.available);
}

export function getProductById(id: string,productsList : Product[]): Product | undefined {
  return productsList.find((p) => p.id === id);
}

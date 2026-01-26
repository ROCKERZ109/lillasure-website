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
  },
  // {
  //   id: "appelpaaj-bulle",
  //   name: "Apple Pie Bun",
  //   nameSv: "Äppelpajbulle",
  //   description: "Soft bun filled with spiced apple compote and topped with crumble.",
  //   descriptionSv: "Mjuk bulle fylld med kryddad äppelkompott och toppad med smuldeg.",
  //   price: 38,
  //   category: "pastry",
  //   image: "/images/apple.jpg",
  //   available: true,
  //   allergens: ["gluten", "dairy", "eggs"],
  // },
  // {
  //   id: "croissant",
  //   name: "Butter Croissant",
  //   nameSv: "Smörcroissant",
  //   description: "Flaky, buttery croissant with golden layers. The perfect breakfast treat.",
  //   descriptionSv: "Frasig, smörig croissant med gyllene lager. Den perfekta frukostnjutningen.",
  //   price: 38,
  //   category: "pastry",
  //   image: "/images/croissant.jpg",
  //   available: true,
  //   allergens: ["gluten", "dairy", "eggs"],
  // },
  
  // Cookies
  // {
  //   id: "havreflarn",
  //   name: "Oat Lace Cookies",
  //   nameSv: "Havreflarn",
  //   description: "Thin, crispy oat cookies with caramelized edges. Sold by dozen.",
  //   descriptionSv: "Tunna, knapriga havrekakor med karamelliserade kanter. Säljs per dussin.",
  //   price: 55,
  //   category: "cookie",
  //   image: "/images/oatcookies.jpg",
  //   available: true,
  //   allergens: ["gluten", "oats", "dairy"],
  // },
  // {
  //   id: "skorpor",
  //   name: "Swedish Rusks",
  //   nameSv: "Skorpor",
  //   description: "Twice-baked sweet bread, crispy and perfect for dipping. Bag of 8.",
  //   descriptionSv: "Dubbelbakade söta bröd, knapriga och perfekta att doppa. Påse med 8 st.",
  //   price: 42,
  //   category: "cookie",
  //   image: "/images/rusks.jpg",
  //   available: true,
  //   allergens: ["gluten", "dairy", "eggs"],
  // },
  // {
  //   id: "saffranskorpor",
  //   name: "Saffron Rusks",
  //   nameSv: "Saffransskorpor",
  //   description: "Golden rusks infused with precious saffron. A Christmas tradition year-round.",
  //   descriptionSv: "Gyllene skorpor med dyrbar saffran. En jultradition året runt.",
  //   price: 58,
  //   category: "cookie",
  //   image: "/images/saffronrusks.jpg",
  //   available: true,
  //   featured: true,
  //   allergens: ["gluten", "dairy", "eggs"],
  // },
  
  // // Cakes
  // {
  //   id: "chokladbollars",
  //   name: "Chocolate Balls",
  //   nameSv: "Chokladbollar",
  //   description: "No-bake chocolate oat balls rolled in coconut. Pack of 6.",
  //   descriptionSv: "Chokladbollar rullade i kokos. Förpackning med 6 st.",
  //   price: 45,
  //   category: "cake",
  //   image: "/images/chocballs.jpg",
  //   available: true,
  //   allergens: ["oats", "dairy", "coconut"],
  // },
  // {
  //   id: "mandelkubb",
  //   name: "Almond Cubes",
  //   nameSv: "Mandelkubb",
  //   description: "Dense almond cake cubes dipped in dark chocolate. Pack of 4.",
  //   descriptionSv: "Kompakta mandelkakskuber doppade i mörk choklad. Förpackning med 4 st.",
  //   price: 52,
  //   category: "cake",
  //   image: "/images/almond.jpg",
  //   available: true,
  //   allergens: ["almonds", "eggs", "dairy"],
  // },
  // {
  //   id: "citrompaj",
  //   name: "Lemon Tart",
  //   nameSv: "Citronpaj",
  //   description: "Tangy lemon curd in a buttery shortcrust, topped with Italian meringue.",
  //   descriptionSv: "Syrlig citronkräm i mördegsbotten, toppad med italiensk maräng.",
  //   price: 55,
  //   category: "cake",
  //   image: "/images/lemon.jpg",
  //   available: true,
  //   allergens: ["gluten", "dairy", "eggs"],
  // },
];

export const storeHours: StoreHours[] = [
  { day: "Måndag", open: "", close: "", closed: true },
  { day: "Tisdag", open: "08:00", close: "17:00" },
  { day: "Onsdag", open: "07:00", close: "18:00" },
  { day: "Torsdag", open: "07:00", close: "18:00" },
  { day: "Fredag", open: "07:00", close: "18:00" },
  { day: "Lördag", open: "08:00", close: "13:00" },
  { day: "Söndag", open: "", close: "", closed: true },
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

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category && p.available);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured && p.available);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

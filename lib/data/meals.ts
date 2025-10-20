export type Meal = {
  slug: string;
  name: string;
  desc: string;
  cals: number;
  protein: number;
  carbs: number;
  fat: number;
  price: number;
  tag: "keto" | "low-carb" | "vegan" | "balanced";
  image?: string;
};

const img = (seed: string) =>
  `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=1200&q=80`;

export const meals: Meal[] = [
  {
    slug: "keto-chicken-bowl",
    name: "Keto Chicken Bowl",
    desc: "Ức gà nướng than, bơ Hass, xà lách romaine và sốt chanh dây ít carb.",
    cals: 480,
    protein: 38,
    carbs: 8,
    fat: 32,
    price: 89000,
    tag: "keto",
    image: img("photo-1523475472560-d2df97ec485c"),
  },
  {
    slug: "vegan-buddha-bowl",
    name: "Vegan Buddha Bowl",
    desc: "Đậu gà, quinoa, rau củ nướng và sốt tahini chanh bổ dưỡng.",
    cals: 560,
    protein: 22,
    carbs: 74,
    fat: 18,
    price: 79000,
    tag: "vegan",
    image: img("photo-1484723091739-30a097e8f929"),
  },
  {
    slug: "lowcarb-beef-salad",
    name: "Low-carb Beef Salad",
    desc: "Thịt bò áp chảo, trứng lòng đào, rau rocket và phô mai Parmesan.",
    cals: 520,
    protein: 40,
    carbs: 12,
    fat: 32,
    price: 99000,
    tag: "low-carb",
    image: img("photo-1478144592103-25e218a04891"),
  },
  {
    slug: "balanced-salmon-rice",
    name: "Balanced Salmon Rice",
    desc: "Cơm gạo lứt, cá hồi áp chảo, bông cải xanh và sốt teriyaki nhẹ.",
    cals: 610,
    protein: 34,
    carbs: 56,
    fat: 26,
    price: 119000,
    tag: "balanced",
    image: img("photo-1512621776951-a57141f2eefd"),
  },
  {
    slug: "keto-egg-bites",
    name: "Keto Egg Bites",
    desc: "Trứng hấp phô mai cheddar, rau bina, bacon và sốt pesto béo ngậy.",
    cals: 320,
    protein: 24,
    carbs: 6,
    fat: 22,
    price: 69000,
    tag: "keto",
    image: img("photo-1546069901-ba9599a7e63c"),
  },
  {
    slug: "balanced-tofu-teriyaki",
    name: "Balanced Tofu Teriyaki",
    desc: "Đậu hũ hữu cơ áp chảo, cơm gạo lứt, cải thìa và sốt teriyaki thủ công.",
    cals: 540,
    protein: 28,
    carbs: 62,
    fat: 18,
    price: 85000,
    tag: "balanced",
    image: img("photo-1504674900247-0877df9cc836"),
  },
  {
    slug: "vegan-pho-chay",
    name: "Phở Rau Củ",
    desc: "Nước dùng rau củ 12 giờ, nấm đùi gà, đậu hũ non và thảo mộc tươi.",
    cals: 430,
    protein: 18,
    carbs: 62,
    fat: 12,
    price: 75000,
    tag: "vegan",
    image: img("photo-1482049016688-2d3e1b311543"),
  },
  {
    slug: "lowcarb-shrimp-zoodles",
    name: "Tôm Zoodle Low-carb",
    desc: "Tôm áp chảo, mì bí ngòi, cà chua bi và sốt tỏi olive ít carb.",
    cals: 360,
    protein: 32,
    carbs: 10,
    fat: 20,
    price: 92000,
    tag: "low-carb",
    image: img("photo-1543353071-873f17a7a088"),
  },
];

export function getMeal(slug: string) {
  return meals.find((m) => m.slug === slug);
}

import dishBigBreakfast from "@/assets/dish-big-breakfast.jpg";
import dishBreakfast from "@/assets/dish-breakfast.jpg";
import dishChai from "@/assets/dish-chai.jpg";
import dishCoffee from "@/assets/dish-coffee.jpg";
import dishCappuccino from "@/assets/dish-cappuccino.jpg";
import dishCornPlantain from "@/assets/dish-corn-plantain.jpg";
import dishCurry from "@/assets/dish-curry.jpg";
import dishDawa from "@/assets/dish-dawa.jpg";
import dishDessert from "@/assets/dish-dessert.jpg";
import dishDrinks from "@/assets/dish-drinks.jpg";
import dishGardenBowl from "@/assets/dish-garden-bowl.jpg";
import dishGrill from "@/assets/dish-grill.jpg";
import dishHotChocolate from "@/assets/dish-hot-chocolate.jpg";
import dishLemonade from "@/assets/dish-lemonade.jpg";
import dishMandazi from "@/assets/dish-mandazi.jpg";
import dishMandaziPudding from "@/assets/dish-mandazi-pudding.jpg";
import dishPannaCotta from "@/assets/dish-panna-cotta.jpg";
import dishPassionCooler from "@/assets/dish-passion-cooler.jpg";
import dishPilau from "@/assets/dish-pilau.jpg";
import dishPourOver from "@/assets/dish-pour-over.jpg";
import dishSoup from "@/assets/dish-soup.jpg";
import dishStarter from "@/assets/dish-starter.jpg";
import dishSukuma from "@/assets/dish-sukuma.jpg";
import dishTamarind from "@/assets/dish-tamarind.jpg";
import dishTilapia from "@/assets/dish-tilapia.jpg";
import dishVeg from "@/assets/dish-veg.jpg";

export const MENU_CATEGORIES = [
  "Breakfast",
  "Starters & Small Plates",
  "Main Courses",
  "Vegetarian",
  "Desserts",
  "Coffee & Hot Drinks",
  "Fresh Juices & Signature Drinks",
] as const;

export type MenuCategory = (typeof MENU_CATEGORIES)[number];

export interface MenuItem {
  name: string;
  description: string;
  price: number; // Kenyan shillings (sample pricing)
  category: MenuCategory;
  image?: string;
  imageAlt?: string;
  dietary?: "Vegetarian" | "Vegan" | "Gluten-free option";
  signature?: boolean;
}

export const MENU_ITEMS: MenuItem[] = [
  // Breakfast
  {
    name: "The Saffron Breakfast Plate",
    description: "Eggs any style, grilled sausage, roasted tomato, sautéed mushrooms and toasted sourdough.",
    price: 850,
    category: "Breakfast",
    image: dishBigBreakfast,
    imageAlt: "Full breakfast plate with fried eggs, grilled sausage, roasted tomato, mushrooms and sourdough toast",
  },
  {
    name: "Avocado Sourdough Toast",
    description: "Smashed avocado on charred sourdough with poached eggs, chili flakes and microgreens.",
    price: 650,
    category: "Breakfast",
    image: dishBreakfast,
    imageAlt: "Avocado sourdough toast topped with poached eggs, served with roasted tomatoes and a flat white coffee",
    dietary: "Vegetarian",
    signature: true,
  },
  {
    name: "Stone Porridge Bowl",
    description: "Warm millet porridge with banana, toasted nuts, a drizzle of honey and a pinch of cinnamon.",
    price: 450,
    category: "Breakfast",
    image: dishPorridge,
    imageAlt: "Warm millet porridge bowl topped with banana slices, toasted nuts and a honey drizzle",
    dietary: "Vegetarian",
  },
  {
    name: "Mandaazi & Chai",
    description: "Two golden spiced doughnuts served with freshly brewed cardamom tea.",
    price: 400,
    category: "Breakfast",
    image: dishMandazi,
    imageAlt: "Two golden spiced mandazi doughnuts on a plate beside a glass of milky cardamom tea",
    dietary: "Vegetarian",
  },

  // Starters & Small Plates
  {
    name: "Crispy Samosa Trio",
    description: "Beef and vegetable samosas with tamarind, coriander and chili dipping sauces.",
    price: 480,
    category: "Starters & Small Plates",
    image: dishStarter,
    imageAlt: "Golden crispy samosas and plantain wedges on a wooden board with three dipping sauces",
  },
  {
    name: "Nyama Choma Skewers",
    description: "Flame-grilled beef skewers rubbed in East African spices, served with fresh kachumbari.",
    price: 750,
    category: "Starters & Small Plates",
    image: dishGrill,
    imageAlt: "Charred grilled beef skewers plated with greens and a tomato-chili salsa",
    signature: true,
  },
  {
    name: "Grilled Corn & Plantain Bites",
    description: "Charred sweetcorn salsa with crispy plantain wedges and a lime yogurt dip.",
    price: 520,
    category: "Starters & Small Plates",
    image: dishCornPlantain,
    imageAlt: "Charred sweetcorn salsa with crispy plantain wedges, lime wedges and a lime yogurt dip",
    dietary: "Vegetarian",
  },
  {
    name: "Soup of the Day",
    description: "A seasonal vegetable soup, slowly simmered and served with warm bread.",
    price: 380,
    category: "Starters & Small Plates",
    image: dishSoup,
    imageAlt: "A rustic bowl of creamy vegetable soup garnished with herbs, beside slices of crusty bread",
    dietary: "Vegetarian",
  },

  // Main Courses
  {
    name: "Grilled Tilapia & Herb Butter",
    description: "Whole grilled tilapia with charred lemon, herb butter and roasted market vegetables.",
    price: 1450,
    category: "Main Courses",
    image: dishTilapia,
    imageAlt: "Whole grilled tilapia with charred lemon slices and roasted vegetables on a ceramic platter",
    signature: true,
  },
  {
    name: "Coconut Chicken Pilau",
    description: "Fragrant coconut pilau rice topped with grilled chicken, fresh coriander and sliced chili.",
    price: 1150,
    category: "Main Courses",
    image: dishPilau,
    imageAlt: "Coconut pilau rice with grilled chicken, coriander and sliced red chili in a dark ceramic bowl",
    signature: true,
  },
  {
    name: "Slow-Roasted Beef Brisket",
    description: "Twelve-hour beef brisket with an East African spice rub, potato wedges and kachumbari.",
    price: 1350,
    category: "Main Courses",
    image: dishBrisket,
    imageAlt: "Sliced slow-roasted spiced beef brisket with potato wedges and tomato-onion kachumbari",
  },
  {
    name: "Chicken Tikka & Hand-Cut Chips",
    description: "Yogurt-marinated chicken tikka off the grill, with hand-cut chips and garlic mayo.",
    price: 950,
    category: "Main Courses",
    image: dishTikka,
    imageAlt: "Charred yogurt-marinated chicken tikka with hand-cut chips and a bowl of garlic mayo",
  },
  {
    name: "Coast Seafood Platter",
    description: "Grilled prawns, calamari and fish bites with lemon rice and coconut salsa, for one hungry diner.",
    price: 1600,
    category: "Main Courses",
    image: dishSeafood,
    imageAlt: "Seafood platter with grilled prawns, calamari rings, fish bites, lemon rice and coconut salsa",
  },

  // Vegetarian
  {
    name: "Grilled Halloumi & Chimichurri Plate",
    description: "Charred halloumi with roasted sweet potato, greens and a herby chimichurri.",
    price: 950,
    category: "Vegetarian",
    image: dishVeg,
    imageAlt: "Grilled halloumi slices with chimichurri, roasted sweet potato wedges and charred greens",
    dietary: "Vegetarian",
  },
  {
    name: "Sweet Potato & Chickpea Curry",
    description: "Slow-simmered coconut curry with steamed rice and a side of tomato sambal.",
    price: 850,
    category: "Vegetarian",
    image: dishCurry,
    imageAlt: "Sweet potato and chickpea coconut curry with steamed rice and tomato sambal",
    dietary: "Vegan",
  },
  {
    name: "Sukuma & Mushroom Stir-Fry",
    description: "Garlicky sukuma wiki and mushrooms served over crispy ugali croutons.",
    price: 700,
    category: "Vegetarian",
    image: dishSukuma,
    imageAlt: "Garlicky sukuma wiki greens and mushrooms stir-fry over crispy golden ugali croutons",
    dietary: "Vegan",
  },
  {
    name: "The Garden Bowl",
    description: "Quinoa, avocado, roasted seasonal vegetables and a citrus dressing.",
    price: 900,
    category: "Vegetarian",
    image: dishGardenBowl,
    imageAlt: "Garden bowl with quinoa, sliced avocado and colorful roasted vegetables",
    dietary: "Vegetarian",
  },

  // Desserts
  {
    name: "Stone Chocolate Fondant",
    description: "Warm molten dark chocolate fondant with cardamom ice cream and berry coulis.",
    price: 550,
    category: "Desserts",
    image: dishDessert,
    imageAlt: "Molten chocolate fondant with cardamom ice cream, berries and berry coulis on a cream plate",
    dietary: "Vegetarian",
    signature: true,
  },
  {
    name: "Mandazi Pudding",
    description: "Warm spiced mandazi pudding with vanilla custard and toasted coconut.",
    price: 450,
    category: "Desserts",
    image: dishMandaziPudding,
    imageAlt: "Warm spiced mandazi pudding with vanilla custard and toasted coconut flakes",
    dietary: "Vegetarian",
  },
  {
    name: "Mango & Passion Panna Cotta",
    description: "Silky panna cotta with fresh mango and passion fruit coulis.",
    price: 520,
    category: "Desserts",
    image: dishPannaCotta,
    imageAlt: "Silky panna cotta topped with fresh mango cubes and passion fruit coulis",
    dietary: "Vegetarian",
  },

  // Coffee & Hot Drinks
  {
    name: "Flat White",
    description: "Double shot of Kenyan espresso with silky steamed milk.",
    price: 320,
    category: "Coffee & Hot Drinks",
    image: dishCoffee,
    imageAlt: "Flat white with latte art beside a fresh croissant on a wooden table",
  },
  {
    name: "Kenyan Pour-Over",
    description: "Single-origin Kenyan beans, brewed by the cup. Bright, blackcurrant, clean.",
    price: 380,
    category: "Coffee & Hot Drinks",
    image: dishPourOver,
    imageAlt: "Pour-over coffee brewing in a filter dripper over a carafe, with a small tasting cup and coffee beans",
  },
  {
    name: "Cappuccino",
    description: "Classic cappuccino with a dusting of cocoa, made on Kenyan espresso.",
    price: 340,
    category: "Coffee & Hot Drinks",
    image: dishCappuccino,
    imageAlt: "Cappuccino in a white ceramic cup with cocoa-dusted milk foam on a saucer",
  },
  {
    name: "Masala Chai",
    description: "Black tea simmered with milk, cardamom, cinnamon and ginger.",
    price: 250,
    category: "Coffee & Hot Drinks",
    image: dishChai,
    imageAlt: "Glass cup of masala chai with cardamom pods, a cinnamon stick and fresh ginger beside a bowl of spices",
    dietary: "Vegetarian",
  },
  {
    name: "Rich Hot Chocolate",
    description: "Dark drinking chocolate topped with steamed milk.",
    price: 350,
    category: "Coffee & Hot Drinks",
    image: dishHotChocolate,
    imageAlt: "Rich dark hot chocolate in a ceramic mug topped with steamed milk and cocoa dusting",
    dietary: "Vegetarian",
  },

  // Fresh Juices & Signature Drinks
  {
    name: "Mango Sunshine",
    description: "Fresh mango blended with a squeeze of lime, served over ice.",
    price: 380,
    category: "Fresh Juices & Signature Drinks",
    image: dishDrinks,
    imageAlt: "Tall glasses of fresh mango and passion fruit juices with mint on a wooden counter",
  },
  {
    name: "Passion & Pineapple Cooler",
    description: "Passion fruit and pressed pineapple, lightly sparkling.",
    price: 400,
    category: "Fresh Juices & Signature Drinks",
    image: dishPassionCooler,
    imageAlt: "Tall glass of sparkling passion fruit and pineapple cooler with ice and tropical garnish",
  },
  {
    name: "Dawa Cooler",
    description: "The classic Kenyan dawa reworked — honey, lemon and ginger over crushed ice.",
    price: 420,
    category: "Fresh Juices & Signature Drinks",
    image: dishDawa,
    imageAlt: "Tall glass of Kenyan dawa cooler — honey, lemon and ginger over crushed ice — with a honey dipper",
  },
  {
    name: "Tamarind Fizz",
    description: "House tamarind syrup with soda, lime and a hint of chili.",
    price: 380,
    category: "Fresh Juices & Signature Drinks",
    image: dishTamarind,
    imageAlt: "Tall glass of sparkling amber tamarind fizz with a lime wheel and red chili garnish",
  },
  {
    name: "Saffron Lemonade",
    description: "House lemonade steeped with saffron and a touch of honey.",
    price: 450,
    category: "Fresh Juices & Signature Drinks",
    image: dishLemonade,
    imageAlt: "Tall glass of golden saffron lemonade with ice, a lemon wheel and saffron strands",
    signature: true,
  },
];

export const SIGNATURE_ITEMS = MENU_ITEMS.filter((item) => item.signature);

export const MENU_ITEM_BY_NAME = (name: string) =>
  MENU_ITEMS.find((item) => item.name === name);

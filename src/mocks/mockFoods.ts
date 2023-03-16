import { Food } from "../food";

export const mockDiner: Food[] = [
  {
    id: 1,
    name: "Burger",
    image: "burger.jpg",
    price: 8.99,
    description:
      "This ain't your average burger. Topped with our tangy cheddar cheese sauce, fresh lettuce, and tomato.",
    tags: ["Lunch", "Dinner"],
  },
  {
    id: 2,
    name: "Banana Blueberry French Toast",
    image: "banana-french-toast.jpg",
    price: 9.99,
    description: "Delicious french toast with banana and blueberry.",
    tags: ["Breakfast"],
  },
];

export const mockIceCreamShop: Food[] = [
  {
    id: 1,
    name: "Vanilla Ice Cream Cone",
    image: "cone.jpg",
    price: 4.99,
    description: "Tasty.",
    tags: ["Dessert"],
  },
];

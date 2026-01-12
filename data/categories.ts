import { Category } from "@/model/category";
import { v4 } from "uuid";

export const categories: Category[] = [
  {
    id: v4(),
    name: "Performance",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Programação",
    id: v4(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Tecnologia",
    id: v4(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Design",
    id: v4(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

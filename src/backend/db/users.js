import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Adarsh",
    lastName: "Balka",
    username: "adarshbalka",
    email:'adarshbalka@gmail.com',
    password: "adarshBalika123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Roushan",
    lastName: "Raj",
    username: "roushanraj",
    email: 'roushan@gmail.com',
    password: "rajRoushan123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Jhon",
    lastName: "Doe",
    username: "jhondoe",
    email: 'jhon@gmail.com',
    password: "doeJhon123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Mike",
    lastName: "Tyson",
    username: "miketyson",
    email: 'mike@gmail.com',
    password: "tysonMike123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];

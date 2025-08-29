import { defineLinks } from "rwsdk/router";

export const link = defineLinks([
  "/",
  "/protected",
  "/login",
  "/logout",
  "/settings",
  "/users/:id",
]);

//TODO: add a book
//TODO: post a book
//TODO: delete a book
//TODO: update a book
import {isValidIsbn10, isValidIsbn13} from "../hooks/isbn"
import z from "zod";
const isbnSchema = z
  .string()
  .trim()
  .transform((val) => val.replace(/[-\s]/g, ""))
  .refine((val) => /^\d{9}[\dXx]$/.test(val) || /^\d{13}$/.test(val), {
    message: "ISBN invalide: format attendu ISBN-10 ou ISBN-13",
  })
  .refine((val) => isValidIsbn10(val) || isValidIsbn13(val), {
    message: "ISBN invalide: chiffre de contrôle incorrect",
  });

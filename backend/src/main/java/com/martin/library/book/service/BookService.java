package com.martin.library.book.service;

import java.time.Year;

import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

import com.martin.library.book.Repository.BookRepository;
import com.martin.library.book.exception.BookCreationException;
import com.martin.library.book.model.BookEntity;

import io.micrometer.common.util.StringUtils;

@Slf4j
@Service
public class BookService {
    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public BookEntity createBook(String bookName, String isbn, Integer year, Integer bookPages, String description) {
        if (bookName == null || StringUtils.isBlank(isbn))
            throw new BookCreationException("Le nom du isbn ne peut pas être null");
        if (!BookService.isValidIsbn13(isbn))
            throw new BookCreationException("L'ISBN du livre doit être valide");
        if (bookName == null || StringUtils.isBlank(bookName))
            throw new BookCreationException("Le nom du livre ne peut pas être null");
        if (year == null || year > Year.now().getValue())
            throw new BookCreationException("L'année n'est pas valide");
        if (bookPages == null || bookPages <= 0)
            throw new BookCreationException("Le nombre de page ne peut pas être inférieur a 1");
        /*
         * BookEntity existingBook = bookRepository.findByIsbn(isbn);
         * 
         * if (existingBook != null)
         * throw new BookCreationException("Le livre existe déjà");
         */

        BookEntity newBook = BookEntity.builder()
                .isbn(isbn)
                .name(bookName)
                .pages(bookPages)
                .year(year)
                .description(description)
                .build();
        bookRepository.save(newBook);
        return newBook;
    }

    public static boolean isValidIsbn13(String rawIsbn) {
        if (rawIsbn == null) {
            return false;
        }

        // 1. Nettoyage : on enlève espaces et tirets
        String isbn = rawIsbn.replaceAll("[\\s-]+", "");

        // 2. Vérifier la longueur et que tout est bien numérique
        if (!isbn.matches("\\d{13}")) {
            return false;
        }
        return true;
        // 3. Calcul du check digit
        /*
         * int sum = 0;
         * for (int i = 0; i < 12; i++) {
         * int digit = isbn.charAt(i) - '0';
         * 
         * // positions paires/impaires en base 0
         * if (i % 2 == 0) {
         * // poids 1 pour d1, d3, d5 ... => i = 0,2,4...
         * sum += digit;
         * } else {
         * // poids 3 pour d2, d4, d6 ... => i = 1,3,5...
         * sum += 3 * digit;
         * }
         * }
         * 
         * int checkDigit = (10 - (sum % 10)) % 10;
         * return checkDigit == (isbn.charAt(12) - '0');
         */
    }
}
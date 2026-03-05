package com.martin.library.book.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import lombok.extern.slf4j.Slf4j;

import com.martin.library.book.dto.BookDTO;
import com.martin.library.book.exception.BookCreationException;
import com.martin.library.book.model.BookEntity;
import com.martin.library.book.service.BookService;

import jakarta.validation.Valid;

@Slf4j
@RestController
public class BookRestController {
    private final BookService bookService;

    public BookRestController(BookService bookService) {
        this.bookService = bookService;
    }

    @PostMapping("/book")
    @ResponseStatus(HttpStatus.CREATED)
    public BookDTO.PostOuput createBook(@Valid @RequestBody BookDTO.PostInput input) throws BookCreationException {
        log.info(input.getIsbn());
        log.info(input.getName());
        log.info(String.valueOf(input.getYear()));
        log.info(String.valueOf(input.getPages()));
        log.info(input.getDescription());
        BookEntity newBook = bookService.createBook(input.getName(), input.getIsbn(), input.getYear(),
                input.getPages(), input.getDescription());
        return BookDTO.PostOuput.builder()
                .id(newBook.getId())
                .isbn(newBook.getIsbn())
                .name(newBook.getName())
                .year(newBook.getYear())
                .pages(newBook.getPages())
                .description(newBook.getDescription())
                .build();
    }
}
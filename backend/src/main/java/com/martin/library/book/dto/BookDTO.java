package com.martin.library.book.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

public class BookDTO {
    @Data
    @AllArgsConstructor
    @Builder
    public static class PostInput {
        @NotNull
        @NotBlank
        @Column(unique = true)
        String isbn;
        @NotNull
        @NotBlank
        String name;
        @NotNull
        Integer pages;
        @NotNull
        Integer year;
        String description;
    }

    @Data
    @AllArgsConstructor
    @Builder
    public static class PostOuput {
        Long id;
        String isbn;
        String name;
        Integer pages;
        Integer year;
        String description;
    }
}

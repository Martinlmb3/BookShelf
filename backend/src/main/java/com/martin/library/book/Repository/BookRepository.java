package com.martin.library.book.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.martin.library.book.model.BookEntity;

@Repository
public interface BookRepository extends JpaRepository<BookEntity, Long> {
    public BookEntity findByNameAndPages(String name, Integer pages);

    public BookEntity findByIsbn(String isbn);
}
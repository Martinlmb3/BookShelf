package com.martin.library.uploadBook.repository;

import com.martin.library.uploadBook.model.UploadBookEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UploadBookRepository extends JpaRepository<UploadBookEntity, Long> {
}
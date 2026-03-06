package com.martin.library.user.repository;

import com.martin.library.user.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByVerificationCode(String verificationCode);
}

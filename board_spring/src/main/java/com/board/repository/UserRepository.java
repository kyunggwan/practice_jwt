package com.board.repository;

import com.board.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, String> {
    public boolean existsByuserEmailAndUserPassword(String userEmail, String userPassword);

    public UserEntity findByUserEmail(String userEmail);

    boolean existsByuserEmail(String userEmail);

    List <UserEntity> findByUserEmailContaining(String keyword);
}
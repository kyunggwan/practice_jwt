package com.board.repository;

import com.board.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<MemberEntity, Long> {

    Optional<MemberEntity> findByEmail(String email);
    boolean existsByEmail(String email);
    List<MemberEntity> findByEmailContaining(String keyword);

}
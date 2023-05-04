package com.board.repository;

import com.board.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<MemberEntity, Long> {
    // 중복 코드 상태 MemberRepository랑 겹친다.
    Optional<MemberEntity> findByEmail(String email);
}

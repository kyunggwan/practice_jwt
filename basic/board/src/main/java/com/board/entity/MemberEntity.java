package com.board.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@Getter
@Entity(name="member")
@Table(name="member")
public class MemberEntity {

    @Id
    @Column(name = "member_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private Authority authority;

    @Builder
    public MemberEntity(String email, String password, Authority authority) {
        this.email = email;
        this.password = password;
        this.authority = authority;
    }
    public void setAuthority(Authority authority) {
        this.authority = authority;
    }
}

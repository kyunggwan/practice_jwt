package com.board.entity;


import com.board.domain.Authority;
import jakarta.persistence.*;
import lombok.Data;



@Data
@Entity(name="member")
@Table(name="member")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String userEmail; // 이메일
    private String userPassword; // 비밀번호

    @Enumerated(EnumType.STRING)
    private Authority authority;		//권한

    public Member (String userEmail, String userPassword, Authority authority){
        this.userEmail = userEmail;
        this.userPassword = userPassword;
        this.authority = authority;
    }

    public Member() {

    }
}

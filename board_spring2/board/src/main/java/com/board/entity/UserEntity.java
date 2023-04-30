package com.board.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="user")
@Table(name = "user")
public class UserEntity {

    @Id
    private String userEmail;
    private String userPassword;
    private String userPasswordCheck;
    private String userNickname;
    private int userPhoneNumber;
    private String userAddress;
    private String userAddressDetail;

    @Enumerated(EnumType.STRING)
    private Authority authority;

    @Builder
    public UserEntity(String userEmail, String userPassword, Authority authority) {
        this.userEmail = userEmail;
        this.userPassword = userPassword;
        this.authority = authority;
    }
}

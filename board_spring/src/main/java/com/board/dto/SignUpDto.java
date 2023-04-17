package com.board.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignUpDto {    // 회원 가입 시에 필요한 정보들 Dto

    private String userEmail;
    private String userPassword;
    private String userPasswordCheck;
    private String userNickname;
    private String userPhoneNumber;
    private String userAddress;
    private String userAddressDetail;

}

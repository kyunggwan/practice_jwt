package com.board.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoDto {

    private String userEmail;
    private String userNickname;
    private String userPhoneNumber;
    private String userAddress;
    private String userAddressDetail;
}

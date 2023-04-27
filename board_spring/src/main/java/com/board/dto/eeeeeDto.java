package com.board.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class eeeeeDto {

    private String userEmail; // 이메일
    private String userPassword; // 비밀번호


//    public eeeeeDto tomember(PasswordEncoder passwordEncoder){
//        return eeeeeDto.builder()
//                .email(email)
//                .password(passwordEncoder.encode(password))
//                .authority(Authority.ROLE_USER)
//    }
}

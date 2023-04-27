package com.board.dto;

import com.board.domain.Authority;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class eeeeeDto {
    private Long id;
    private String userEmail; // 이메일
    private String userPassword; // 비밀번호

    private Authority authority;
}

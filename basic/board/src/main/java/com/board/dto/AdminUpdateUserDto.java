package com.board.dto;

import com.board.entity.Authority;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminUpdateUserDto {

    private String id;
    private String email;
    private Authority authority;
}

package com.board.dto;

import com.board.entity.Authority;
import com.board.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignInDto {

    private String userEmail;
    private String userPassword;

    public UserEntity toUserEntity(PasswordEncoder passwordEncoder){
        return UserEntity.builder()
                .userEmail(userEmail)
                .userPassword(passwordEncoder.encode(userPassword))
                .authority(Authority.ROLE_USER)
                .build();
    }
}

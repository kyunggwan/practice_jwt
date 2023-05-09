package com.board.dto;

import com.board.entity.Authority;
import com.board.entity.MemberEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MemberRequestDto {

    private String email;
    private String password;
    private String nickname;

    public MemberEntity toMember(PasswordEncoder passwordEncoder, Authority auth) {
        if (password == null) {
            throw new IllegalArgumentException("Password cannot be null");
        }
        return MemberEntity.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .nickname(nickname)
                .authority(auth)
                .build();
    }

    public UsernamePasswordAuthenticationToken toAuthentication() {
        return new UsernamePasswordAuthenticationToken(email, password);
    }
}

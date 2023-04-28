package com.board.dto;


import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignInDto {

    @NotBlank
    private String userEmail;
    @NotBlank
    private String userPassword;

//    @NotNull   null만 허용하지 않음, ""(초기화된 String)와 " "(공백)은 허용한다.
//    @NotEmpty  null ""(초기화된 String)만 허용하지 않음, " "(공백)은 허용한다.
//    @NotBlank  null, " ", "" 허용 않음
//public UserEntity toUserEntity(PasswordEncoder passwordEncoder) {
//    return UserEntity.builder()
//            .userEmail(userEmail)
//            .userPassword(passwordEncoder.encode(userPassword))
//            .authority(Authority.ROLE_USER)	//.authority(auth)
//            .build();
//}
//
//    public UsernamePasswordAuthenticationToken toAuthentication() {
//        return new UsernamePasswordAuthenticationToken(userEmail, userPassword);
//    }

}

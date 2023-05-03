package com.board.controller;

import com.board.dto.*;
import com.board.entity.Authority;
import com.board.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signUp")
    public ResponseEntity<MemberResponseDto> signup(@RequestBody MemberRequestDto memberRequestDto) {
        Authority authority = Authority.ROLE_ADMIN; // 회원 권한 설정
        MemberResponseDto memberResponseDto = authService.signup(memberRequestDto, authority);
        return ResponseEntity.ok(memberResponseDto);
    }

    //MemberRequestDto == 사용자가 로그인 시도한 ID / PW String
    @PostMapping("/signIn")
    public ResponseEntity<TokenDto> login(@RequestBody MemberRequestDto memberRequestDto) {
        return ResponseEntity.ok(authService.login(memberRequestDto));
    }

    //TokenRequestDto == 재발급을 위한 AccessToken / RefreshToken String
    @PostMapping("/reissue")
    public ResponseEntity<TokenDto> reissue(@RequestBody TokenRequestDto tokenRequestDto) {
        System.out.println(tokenRequestDto.getRefreshToken());
        return ResponseEntity.ok(authService.reissue(tokenRequestDto));
    }

}

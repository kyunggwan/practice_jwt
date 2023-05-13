package com.board.controller;

import com.board.dto.*;
import com.board.entity.Authority;
import com.board.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signUp")
    public ResponseEntity<MemberResponseDto> signup(@Valid @RequestBody MemberRequestDto memberRequestDto,  Errors errors) {
        Authority authority = Authority.ROLE_USER; // 회원 권한 설정
        MemberResponseDto memberResponseDto = authService.signup(memberRequestDto, authority);
        return ResponseEntity.ok(memberResponseDto);
    }

    //MemberRequestDto == 사용자가 로그인 시도한 ID / PW String
    @PostMapping("/signIn")
    public ResponseEntity<TokenDto> login(@Valid @RequestBody MemberRequestDto memberRequestDto,  Errors errors) {
        return ResponseEntity.ok(authService.login(memberRequestDto));
    }

    //TokenRequestDto == 재발급을 위한 AccessToken / RefreshToken String
    @PostMapping("/reissue")
    public ResponseEntity<TokenDto> reissue(@RequestBody TokenRequestDto tokenRequestDto) {
        System.out.println(tokenRequestDto.getRefreshToken());
        return ResponseEntity.ok(authService.reissue(tokenRequestDto));
    }

    // 비밀번호 찾기에서 이메일이 있는지 확인
    @GetMapping("/{email}")
    public ResponseEntity<Boolean> emailCheck(@PathVariable String email){
        System.out.println("비번 찾기 회원 검색");
        return ResponseEntity.ok(authService.emailCheck(email));
    }

}

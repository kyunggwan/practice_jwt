//package com.board.controller;
//
//
//import com.board.dto.TokenDto;
//import com.board.dto.TokenRequestDto;
//import com.board.service.AuthService;
//import org.springframework.http.ResponseEntity;
////실제로 사용자 로그인 요청이 들어왔을 때 인증 처리 후에 JWT 토큰을 발급하는 과정
//
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//
//import lombok.RequiredArgsConstructor;
//
//@RestController
//@RequiredArgsConstructor
//public class AuthController {
//    //회원 인증 관련 API
//    private final AuthService authService;
//
//    @PostMapping("/data/auth/signup")
//    public ResponseEntity<MemberResponseDto> signup(@RequestBody MemberRequestDto memberRequestDto) {
//        return ResponseEntity.ok(authService.signup(memberRequestDto));
//    }
//
//    //MemberRequestDto == 사용자가 로그인 시도한 ID / PW String
//    @PostMapping("/data/auth/login")
//    public ResponseEntity<TokenDto> login(@RequestBody MemberRequestDto memberRequestDto) {
//        return ResponseEntity.ok(authService.login(memberRequestDto));
//    }
//
//    //TokenRequestDto == 재발급을 위한 AccessToken / RefreshToken String
//    @PostMapping("/data/auth/reissue")
//    public ResponseEntity<TokenDto> reissue(@RequestBody TokenRequestDto tokenRequestDto) {
//        System.out.println(tokenRequestDto.getRefreshToken());
//        return ResponseEntity.ok(authService.reissue(tokenRequestDto));
//    }
//}
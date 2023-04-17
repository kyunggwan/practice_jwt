package com.board.controller;

import com.board.dto.ResponseDto;
import com.board.dto.SignInDto;
import com.board.dto.SignInResponseDto;
import com.board.dto.SignUpDto;
import com.board.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthService authService;

    @PostMapping("/signUp") // signUp 메서드, SignUpDto 형태의 data를 받아와서 authService의 signUp메소드에 넣으면 result를 받아온다.
    public ResponseDto<?> signUp(@RequestBody SignUpDto requestBody) {
        ResponseDto<?> result = authService.signUp(requestBody);
        return result;
    }

    @PostMapping("/signIn")
    public ResponseDto<SignInResponseDto> sigin(@RequestBody SignInDto requesetBody) {
        ResponseDto<SignInResponseDto> result = authService.signIn(requesetBody);
        return result;
    }

}

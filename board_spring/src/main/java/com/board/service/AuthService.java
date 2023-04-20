package com.board.service;

import com.board.dto.ResponseDto;
import com.board.dto.SignInDto;
import com.board.dto.SignInResponseDto;
import com.board.dto.SignUpDto;
import com.board.entity.UserEntity;
import com.board.repository.UserRepository;
import com.board.security.TokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class AuthService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    TokenProvider tokenProvider;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public ResponseDto<?> signUp(SignUpDto dto) {
        String userEmail = dto.getUserEmail();
        String userPassword = dto.getUserPassword();
        String userPasswordCheck = dto.getUserPasswordCheck();

        // (검사 부분)
        // Repository로 DB 접근하는 부분은 try/catch문으로 처리할 것
        try {
            // email 중복 확인
            if (userRepository.existsById(userEmail))
                return ResponseDto.setFailed("Existed email"); // 중복한다면 ResponseDto에 있는 setFailed메서드 실행
        } catch (Exception error) {
            return ResponseDto.setFailed("Data Base Error!!!");
        }

        // 비밀번호, 비밀번호 체크가 서로 다르면 failed response
        if (!userPassword.equals(userPasswordCheck)) {
            return ResponseDto.setFailed("password does not matched!");
        }

        // UserEntity 생성
        UserEntity userEntity = new UserEntity(dto);

        // 비밀번호 암호화
        String encodedPassword = passwordEncoder.encode(userPassword);
        userEntity.setUserPassword(encodedPassword);

        // (저장부분)
        // UserRepository를 이용해서 데이터베이스 Entity 저장
        try {
            userRepository.save(userEntity);
        } catch (Exception error) {
            return ResponseDto.setFailed("Data Base Error!!!");
        }

        // 성공 시 success response 반환
        return ResponseDto.setSuccess("SignUp Success", dto);

    }

    public ResponseDto<SignInResponseDto> signIn(SignInDto dto) {
        String userEmail = dto.getUserEmail();
        String userPassword = dto.getUserPassword();

        UserEntity userEntity = null;

        try {
            userEntity = userRepository.findByUserEmail(userEmail);
            // 잘못된 이메일
            if (userEntity == null)
                return ResponseDto.setFailed("Sign In Failed, email is null");
            // 잘못된 비밀번호
            if (!passwordEncoder.matches(userPassword, userEntity.getUserPassword()))
                return ResponseDto.setFailed("Sign In Failed, wrong password");
        } catch (Exception error) {
            return ResponseDto.setFailed("Database Error");
        }

        userEntity.setUserPassword("");
        // 로그인 시 userEmail로 토큰 생성
        String token = tokenProvider.create(userEmail);
        int exprTime = 3600000;

        SignInResponseDto loginSuccess = new SignInResponseDto(token, exprTime, userEntity);
        return ResponseDto.setSuccess("Sign In Success", loginSuccess);

    }

//    @Transactional
//    public TokenDto reissue(TokenRequestDto tokenRequestDto) {
//        // 1. Refresh Token 검증
//        if (!tokenProvider.validateToken(tokenRequestDto.getRefreshToken())) {
//            throw new RuntimeException("Refresh Token 이 유효하지 않습니다.");
//        }
//
//        // 2. Access Token 에서 Member ID 가져오기
//        Authentication authentication = tokenProvider.getAuthentication(tokenRequestDto.getAccessToken());
//
//        // 3. 저장소에서 Member ID 를 기반으로 Refresh Token 값 가져옴(로그인하면 refreshtoken db에서도 삭제되어야 함-구현 필요함)
//        RefreshToken refreshToken = refreshTokenRepository.findByKey(authentication.getName())
//                .orElseThrow(() -> new RuntimeException("로그아웃 된 사용자입니다."));
//
//        // 4. Refresh Token 일치하는지 검사
//        if (!refreshToken.getValue().equals(tokenRequestDto.getRefreshToken())) {
//            throw new RuntimeException("토큰의 유저 정보가 일치하지 않습니다.");
//        }
//
//        // 5. 새로운 토큰 생성
//        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);
//
//        // 6. 저장소 정보 업데이트
//        RefreshToken newRefreshToken = refreshToken.updateValue(tokenDto.getRefreshToken());
//        refreshTokenRepository.save(newRefreshToken);
//        System.out.println(tokenDto);
//        // 토큰 발급
//        return tokenDto;
//    }
}
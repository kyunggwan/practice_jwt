package com.board.security;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Service
public class TokenProvider {

    // JWT 생성 및 검증을 위한 키
    private static final String SECURITY_KEY = "jwtseckey!@";

    // JWT 생성하는 함수
    public String create(String userEmail) {
        // 만료 날짜를 현재 날짜 + 1시간
        Date exprTime = Date.from(Instant.now().plus(1, ChronoUnit.HOURS));

        // JWT를 생성
        return Jwts.builder().signWith(SignatureAlgorithm.HS512, SECURITY_KEY) // 암호화에 사용할 알고리즘
                .setSubject(userEmail)  // JWT 제목, 필요한 데이터 더 추가 가능
                .setIssuedAt(new Date())  // jwt 생성일
                .setExpiration(exprTime)    // JWT 만료일
                .compact();     // 생성

    }

    // JWT 검증, 복호화
    public String validate(String token) {
        // 매개변수로 받은 token을 키를 사용해서 복호화 (디코딩)
        Claims claims = Jwts.parser().setSigningKey(SECURITY_KEY).parseClaimsJws(token).getBody();

        // 복호화된 토큰의 payload에서 제목을 가져옴
        return claims.getSubject(); // 지정된 subject를 받아 올 수 있다.(지금은 userEmail이군)
    }
}

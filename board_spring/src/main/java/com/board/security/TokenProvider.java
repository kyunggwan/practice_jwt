package com.board.security;


import com.board.repository.UserRepository;
import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;


// JWT: Jason Web Tokken
// JSON 형태로 된 웹 토큰
// {header}.{payload}.{signature}로 구성

// header: typ (해당 토큰의 타입), alg (토큰을 서명하기 위해 사용된 해시 알고리즘)
// payload: sub (해당 토큰의 주인), iat (토큰이 발행된 시간), exp (토큰이 만료되는 시간)

@Slf4j
@Service
public class TokenProvider {

    @Autowired
    private UserRepository userRepo;

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
                .claim("auth", "ROLE_ADMIN")
                .compact();     // 생성
    }

//    public TokenDto generateToken(Authentication authentication) {
//        //Authentication객체에서 권한정보들 가져오기
//        String authorities = authentication.getAuthorities().stream()
//                .map(GrantedAuthority::getAuthority)
//                .collect(Collectors.joining(","));
//        long now = (new Date()).getTime();
//
//        // Access Token 생성
//        Date accessTokenExpiresIn = new Date(now + 1000 * 60 * 20);
//        String accessToken = Jwts.builder()
//                .setSubject(authentication.getName())       // payload "sub": "name" == memberId)
//                .claim("auth", authorities)        // payload "auth": "ROLE_USER"
//                .setExpiration(accessTokenExpiresIn)        // payload "exp": 1516239022 (예시)
//                .signWith(SignatureAlgorithm.HS512, SECURITY_KEY)    // header "alg": "HS512"
//                .compact();
//        //.setSubject(memberRepo.findById(Long.parseLong(authentication.getName())).get().getEmail())
//
//
//
//        return TokenDto.builder()
//                .grantType("Bearer")
//                .accessToken(accessToken)
//                .accessTokenExpiresIn(accessTokenExpiresIn.getTime())
//                .build();
//    }

    // JWT 검증, 복호화
    public String validate(String token) {
        // 매개변수로 받은 token을 키를 사용해서 복호화 (디코딩)
        System.out.println(token);
        Claims claims = Jwts.parser().setSigningKey(SECURITY_KEY).parseClaimsJws(token).getBody();

        // 복호화된 토큰의 payload에서 제목을 가져옴
        return claims.getSubject(); // 지정된 subject를 받아 올 수 있다.(지금은 userEmail)
    }

    public Authentication getAuthentication(String token) {
        // 토큰 복호화

//        Claims claims = parseClaims(accessToken);
        Claims claims = Jwts.parser().setSigningKey(SECURITY_KEY).parseClaimsJws(token).getBody();

        if (claims.get("auth") == null) {
            throw new RuntimeException("권한 정보가 없는 토큰입니다.");
        }

        // 클레임에서 권한 정보 가져오기
        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get("auth").toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

        // UserDetails 객체를 만들어서 Authentication 리턴
        //claims.getSubject == email정보, authorities == 권한 정보(ROLE_~~)
        UserDetails principal = new User(claims.getSubject(), "", authorities);

        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    }

    //토큰 정보 검증
    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(SECURITY_KEY).parseClaimsJws(token).getBody();
            return true;
//        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
//            log.info("잘못된 JWT 서명입니다.");
        } catch (ExpiredJwtException e) {
            log.info("만료된 JWT 토큰입니다.");
        } catch (UnsupportedJwtException e) {
            log.info("지원되지 않는 JWT 토큰입니다.");
        } catch (IllegalArgumentException e) {
            log.info("JWT 토큰이 잘못되었습니다.");
        }
        return false;
    }

}

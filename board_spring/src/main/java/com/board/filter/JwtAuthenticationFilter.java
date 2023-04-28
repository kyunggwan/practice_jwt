package com.board.filter;

import com.board.security.TokenProvider;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collection;

@Component

public class JwtAuthenticationFilter extends OncePerRequestFilter {
    // filter, filterchain, requestDispatcher, GenericFilterBean 공부 필요

// Request가 들어왔을 때 Request Header의 Authorization 필드의 Bearer Token을 가져옴
// 가져온 토큰을 검증하고 검증 결과를 SecurityContext에 추가(여기서는 userEmail이 되겠다.)
    @Autowired
    private TokenProvider tokenProvider;

//    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userName, null, List.of(new SimpleGrantedAuthority(ROLE_USER)))

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        try {
            String token = parseBearerToken(request); // 아래 메소드로 Bearer 토큰을 가져온다

//            if (StringUtils.hasText(token) && tokenProvider.validateToken(token)) {
//                Authentication authentication = tokenProvider.getAuthentication(token);
//                SecurityContextHolder.getContext().setAuthentication(authentication);
//            }

            if (token != null && !token.equalsIgnoreCase("null")) { // 토큰이 있다면(equalsIgnoreCase: 대소문자 구분 안함)
                // 토큰을 검증해서 payload의 userEmail을 가져옴
                String userEmail = tokenProvider.validate(token);

                Collection<SimpleGrantedAuthority> authorities;
                authorities = Arrays.asList(new SimpleGrantedAuthority("ROLE_USER"));

                // AbstractAuthenticationToken은 SecurityContext에 추가할 객체 ( 그래야 해당 thread가 지속적으로 누구인지 알 수있음)
                // Bearer 토큰에서 가져온 userEmail을 추가한다
                AbstractAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userEmail, null,
                        authorities);
                // 디테일 값도 넣어준다.. 잘 모르겠음
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // SecurityContext에 AbstractAuthenticationToken 객체를 추가해서
                // 해당 Thread가 지속적으로 인증 정보를 가질수 있도록 해줌
                SecurityContext securityContext = SecurityContextHolder.createEmptyContext(); // 빈 Context 추가하고
                securityContext.setAuthentication(authentication);  // 내가 만든 authentication 객체 추가
                SecurityContextHolder.setContext(securityContext);  // holder에 추가해서 지속적으로...
            }

        } catch (Exception exception) {
            exception.printStackTrace();
        }
        filterChain.doFilter(request, response); // 여기서 정의한 필터를 거치고, 다음 필터(원래 있던 필터)로 넘어감
    }

    // Request가 들어왔을 때 Request Header의 Authorization 필드의 Bearer Token을 가져오는 메서드
    private String parseBearerToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization"); // Header에서 Authorization필드에서 토큰을 가져온다

        // StringUtils = 스프링 프레임워크의 유틸, hasText는 포함되어 있는가? , 'Bearer '로 시작하는가?
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7); // 맞다면 (Bearer 가 7자리 이므로 7번째 부터 읽음)
        }
        return null;
    }

}

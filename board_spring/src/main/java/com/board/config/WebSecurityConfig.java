package com.board.config;

import com.board.filter.JwtAccessDeniedHandler;
import com.board.filter.JwtAuthenticationEntryPoint;
import com.board.filter.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity  // Spring Security를 사용하여 웹 보안을 활성화
@RequiredArgsConstructor    // 모든 final 필드를 초기화 하는 생성자 생성
public class WebSecurityConfig {

//    private final CorsFilter corsFilter
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    @Autowired
    JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    protected SecurityFilterChain configure(HttpSecurity httpsecurity) throws Exception {
        httpsecurity
                // cors 정책 (현재는 CorsConfig에서 작업을 해뒀으므로 기본 설정 사용)
                .cors().and()
                // filter추가하여 CORS 해결도 가능
//                .addFilter(corsFilter)
                // csrf 대책 (현재는 CSRF에 대한 대책을 비활성화)
                .csrf().disable()
                // exception handling 할 때 우리가 만든 클래스를 추가
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)
                .and()
                // basic 인증 (현재는 bearer token 인증방법을 사용하기 때문에 비활성화)
                .httpBasic().disable()
                // 세션 기반 인증 사용않음(현재는 Session 기반 인증을 사용하지 않기 때문에 상태를 없앰) STATELESS한 서버를 만듦
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()

                // SignUp, SignIn 페이지의 auth URL은 인증않고 허용
                .authorizeHttpRequests()
                // '/', '/api/auth' 모듈에 대해서는 모두 허용 (인증을 하지 않고 사용 가능하게 함)
                .requestMatchers("/", "/api/auth/**").permitAll()
                // 권한 부여에 따른 URL 허용, 수정 필요
//                .requestMatchers("/api/admin/**", "/api/board/**").hasRole("ROLE_ADMIN")
//                .requestMatchers("/api/manager/**").hasAnyRole("ROLE_ADMIN", "ROLE_MANAGER")
                .anyRequest().authenticated(); // 위의 경우를 제외한 URL은 인증해야함


                // URL에 따라 권한 설정 가능
                // 버전에 따라서 authorizaeHttpRequest() 또는 authorizeRequests() 골라써야함
                // 버전에 따라서 requestMatchers() 또는 antMatchers() 골라써야함

        // 필터에 추가한다.
        httpsecurity.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return httpsecurity.build(); // 빌드값 반환
    }
}
package com.board.config;

import com.board.jwt.JwtAccessDeniedHandler;
import com.board.jwt.JwtAuthenticationEntryPoint;
import com.board.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
@Configuration
@RequiredArgsConstructor
public class WebSecurityConfig {
    private final TokenProvider tokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // CSRF 설정 Disable
        http.csrf().disable()
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeHttpRequests()
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // OPTIONS 요청 허용
                .requestMatchers("/api/auth/**", "/api/board/**").permitAll()   // token 없이 통과 가능
                .requestMatchers("/api/admin/**").hasAuthority("ADMIN")
//                .requestMatchers("/api/user/**").hasAnyRole("ADMIN", "USER")
                .anyRequest().authenticated()   // 나머지는 토큰이 있어야 함
                .and()
                .apply(new JwtSecurityConfig(tokenProvider));   // JwtSecurityConfig에 적용시킴(Spring Security)

        return http.build();
    }
}
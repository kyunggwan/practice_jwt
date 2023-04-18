package com.board.config;

import com.board.filter.JwtAuthenticationFilter;
import com.board.filter.MyFilter1;
import jakarta.servlet.Filter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {

    private final CorsFilter corsFilter;

    @Autowired
    JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    protected SecurityFilterChain configure(HttpSecurity httpsecurity) throws Exception {
        httpsecurity
                .addFilterBefore((Filter) new MyFilter1(), BasicAuthenticationFilter.class);
                // cors 정책 (현재는 Application에서 작업을 해뒀으므로 기본 설정 사용)
        httpsecurity
//                .cors().and()
                // 위에가 안먹혀서 filter추가하여 CORS 해결
                .addFilter(corsFilter)
                // csrf 대책 (현재는 CSRF에 대한 대책을 비활성화)
                .csrf().disable()
                // basic 인증 (현재는 bearer token 인증방법을 사용하기 때문에 비활성화)
                .httpBasic().disable()
                // 세션 기반 인증 사용않음(현재는 Session 기반 인증을 사용하지 않기 때문에 상태를 없앰) STATELESS한 서버를 만듦
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                // '/', '/api/auth' 모듈에 대해서는 모두 허용 (인증을 하지 않고 사용 가능하게 함)
                .authorizeHttpRequests().requestMatchers("/", "/api/auth/**").permitAll()
                // 나머지 Request에 대해서는 모두 인증된 사용자만 사용가능하게 함
                .anyRequest().authenticated();

        // URL에 따라 권한 설정 가능
//        .authorizeRequests()
//        .antMatchers("/api/auth/user/**")
//        .access("hasRole('ROLE_USER') or hasROLE('ROLE_MANAGER) or hasROLE('ROLE_ADMIN')")
//        .antMatchers("/api/auth/manager/**")
//        .access("hasROLE('ROLE_MANAGER) or hasROLE('ROLE_ADMIN')")
//        .antMatchers("/api/auth/admin/**")
//        .access("hasROLE('ROLE_ADMIN')")
//        .anyRequest().permitAll(); // 다른 요청은 권한 없이 들어갈 수 있다.

        httpsecurity.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return httpsecurity.build();
    }
}
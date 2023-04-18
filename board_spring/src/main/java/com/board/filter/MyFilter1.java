package com.board.filter;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

public class MyFilter1 implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException{

        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;
        // id, pw 정상적으로 들어와서 로그인이 되면, 토큰을 준다. 그 토큰을 응답해준다
        // 요청할 떄마다 header에 Authorization에 value값으로 토큰을 가지고 온다
        // 그때 내가 만든 토큰인지 검증하면 된다.

        if(req.getMethod().equals("POST")){
            System.out.println("POST 요청됨");
            String headerAuth = req.getHeader("Authorization");
            System.out.println(headerAuth);
        }

//        if(headerAuth.equals("cos")){
//            chain.doFilter(request, response);
//        } else {
//            PrintWriter outPrintWriter = res.getWriter();
//            outPrintWriter.print("인증안됨");
//        }



    }
}

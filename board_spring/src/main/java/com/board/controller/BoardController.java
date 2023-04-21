package com.board.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/board")
public class BoardController {

    // @AuthenticationPrincipal 은 필터에서 담은 userEmail을 사용할 수 있게 해준다
    @GetMapping("/")
    public String getBoard(@AuthenticationPrincipal String userEmail){

        System.out.println(userEmail);
        return "로그인된 사용자는 " + userEmail + "입니다. 반갑습니다.";
    }

}

package com.board.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//@CrossOrigin(originPatterns = "http://localhost:3000")
@RestController // 해당 클래스를 Controller 레이어로 인식하도록 함 Rest한 형태로
@RequestMapping("/")    // Request의 Url을 보고 해당하는 패턴이 왔을 때 해당 클래스를 실행
public class MainController {

    @GetMapping("")
    public String hello() {
        return "Connection Success";
    }
}

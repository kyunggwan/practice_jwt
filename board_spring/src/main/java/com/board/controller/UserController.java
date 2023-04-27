package com.board.controller;

import com.board.entity.UserEntity;
import com.board.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }
    // 모든 유져 보기

    @GetMapping("/")
    public List<UserEntity> getUser() {
        List<UserEntity> result = userService.getUser();
        System.out.println("get user is worked?");
        return result;
    }


}

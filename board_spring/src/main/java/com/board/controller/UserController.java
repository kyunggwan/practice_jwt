package com.board.controller;

import com.board.entity.UserEntity;
import com.board.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/{keyword}")
    public List<UserEntity> findUser(@PathVariable String keyword) {
        List<UserEntity> result = userService.findUser(keyword);
        System.out.println("찾기 기능 실행되긴 했냐?");
        return result;
    }

    @PutMapping("/")
    public void changeUser(@RequestBody UserEntity userEntity) {
        System.out.println(userEntity);
        userService.changeUser(userEntity);
        System.out.println("change user is worked?");

    }

    @DeleteMapping("/{userEmail}")
    public void deleteUser(@PathVariable String userEmail){
        userService.deleteUser(userEmail);
        System.out.println("deleteUser");

    }


}

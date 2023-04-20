package com.board.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/user")
public class UserController {

//    @PatchMapping("/")
//    public ResponseDto<PatchUserResponseDto> patchUser(@RequestBody PatchUserDto requestbody,
//                                                       @AuthenticationPrincipal String userEmail) {
//        return null;
//    }

//    @Autowired
//    UserService userService;
//
//    @GetMapping("/info")
//    public ResponseDto<?> userInfo(@AuthenticationPrincipal String userEmail) {
//        ResponseDto<?> result = userService.userInfo(userEmail);
//        return result;
//    }

}
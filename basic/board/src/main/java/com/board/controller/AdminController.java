package com.board.controller;

import com.board.dto.AdminUpdateUserDto;
import com.board.entity.MemberEntity;
import com.board.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;


    // 권한 변경값이 dto 형태로 넘어오면 그것 대로 수정해줄 것
    @PutMapping("/updateuser")
    public MemberEntity updateUser(@RequestBody AdminUpdateUserDto dto){
        System.out.println("Admin Controller!!!!!");
        return adminService.updateUser(dto);

    }

    // email을 받아서 검색해서 유저를 삭제할 것
    @DeleteMapping("{email}")
    public void deleteUser(@PathVariable String email){

    }

}

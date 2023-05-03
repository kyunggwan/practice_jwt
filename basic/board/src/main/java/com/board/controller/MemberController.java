package com.board.controller;

import com.board.entity.MemberEntity;
import com.board.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/")
    public List<MemberEntity> getUser() {
        List<MemberEntity> result = memberService.getUser();
        System.out.println("get user is worked?");
        return result;
    }

    @GetMapping("/{keyword}")
    public List<MemberEntity> findUser(@PathVariable String keyword) {
        List<MemberEntity> result = memberService.findUser(keyword);
        System.out.println("찾기 기능 실행되긴 했냐?");
        return result;
    }

    @PutMapping("/")
    public void changeUser(@RequestBody MemberEntity memberEntity) {
        System.out.println(memberEntity);
        memberService.changeUser(memberEntity);
        System.out.println("change user is worked?");

    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id){
        memberService.deleteUser(id);
        System.out.println("deleteUser");

    }

}

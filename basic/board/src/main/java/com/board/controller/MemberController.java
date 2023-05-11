package com.board.controller;

import com.board.dto.ChangePasswordRequestDto;
import com.board.dto.MemberRequestDto;
import com.board.dto.MemberResponseDto;
import com.board.entity.MemberEntity;
import com.board.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    // 모든 회원목록을 호출
    @GetMapping("/")
    public List<MemberEntity> getUser() {
        List<MemberEntity> result = memberService.getUser();
        System.out.println("You are Looking Profile ");
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
    public String deleteUser(@PathVariable Long id){
        memberService.deleteUser(id);
        return "다음에 다시 이용해주세요";
    }

    @GetMapping("/me")
    public ResponseEntity<MemberResponseDto> getMyInfoBySecurity(){
        MemberResponseDto myInfoBySecurity = memberService.getMyInfoBySecurity();
        System.out.println(myInfoBySecurity.getNickname());
        return ResponseEntity.ok((myInfoBySecurity));
    }

    @PostMapping("/nickname")
    public ResponseEntity<MemberResponseDto> setMemberNickname(@RequestBody MemberRequestDto memberRequestDto){
        return ResponseEntity.ok(memberService.changeMemberNickname(memberRequestDto.getEmail(), memberRequestDto.getNickname()));
    }

    @PostMapping("/password")
    public ResponseEntity<MemberResponseDto> setMemberPassword(@RequestBody ChangePasswordRequestDto dto){
        return ResponseEntity.ok(memberService.changeMemberPassword(dto.getEmail(), dto.getExPassword(), dto.getNewPassword()));
    }

}

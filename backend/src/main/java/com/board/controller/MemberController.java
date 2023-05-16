package com.board.controller;

import com.board.dto.ChangeNicknameRequestDto;
import com.board.dto.ChangePasswordRequestDto;
import com.board.dto.MemberRequestDto;
import com.board.dto.MemberResponseDto;
import com.board.entity.MemberEntity;
import com.board.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

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

    @PutMapping("/nickname")
    public ResponseEntity<MemberResponseDto> setMemberNickname(@RequestBody ChangeNicknameRequestDto dto){
        System.out.println("setNickname worked?");
        return ResponseEntity.ok(memberService.changeMemberNickname(dto.getEmail(), dto.getNickname()));
    }
//        try {
//            return ResponseEntity.ok(memberService.changeMemberNickname(dto.getEmail(), dto.getNickname()));
//        } catch (RuntimeException e) {
//            String errorMessage = e.getMessage();
//            if (errorMessage != null && (errorMessage.equals("중복된 닉네임입니다.") || errorMessage.equals("이모티콘 및 일부 특수문자는 사용할 수 없습니다.") || errorMessage.equals("로그인 유저 정보가 없습니다."))) {
//                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MemberResponseDto(errorMessage));
//            } else {
//                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MemberResponseDto("서버 오류가 발생했습니다."));
//            }
//        }
//    }

    @PutMapping("/password")
    public ResponseEntity<MemberResponseDto> setMemberPassword(@RequestBody ChangePasswordRequestDto dto){
        System.out.println("실행은 되었냐 패스와드 변환");
        return ResponseEntity.ok(memberService.changeMemberPassword(dto.getEmail(), dto.getExPassword(), dto.getNewPassword()));
    }

}

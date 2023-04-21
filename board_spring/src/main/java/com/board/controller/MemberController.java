package com.board.controller;

import com.board.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/member")
public class MemberController {

    @Autowired
    private final MemberService memberService;


    @GetMapping("/api/member/{idx}")
    public ResponseEntity<ApiResponse> findByMemberUseremail(@PathVariable String UserEmail) {
        try {
            return ResponseMessageUtil.successMessage(memberService.findByMemberIdx(idx));

        } catch (Exception e) {
            return ResponseMessageUtil.errorMessage(e);
        }
    }



    @PutMapping ("/")
    public ResponseEntity<ApiResponse> updateByMemberIdx(@RequestBody MemberDTO.Update updateInfo) {
        try {
            memberService.updateByMemberIdx(SecurityUtil.getCurrentMemberId(), updateInfo);
            return ResponseMessageUtil.successMessage();
        } catch (CustomException ce) {
            return ResponseMessageUtil.errorMessage(ce.getCode());
        } catch (Exception e) {
            return ResponseMessageUtil.errorMessage(e);
        }
    }

    @DeleteMapping("/api/member")
    public ResponseEntity<ApiResponse> deleteByMemberIdx(@RequestBody MemberDTO.Delete deleteInfo) {
        try {
            memberService.deleteByMemberIdx(SecurityUtil.getCurrentMemberId(), deleteInfo);
            return ResponseMessageUtil.successMessage();
        } catch (CustomException ce) {
            return ResponseMessageUtil.errorMessage(ce.getCode());
        } catch (Exception e) {
            return ResponseMessageUtil.errorMessage(e);
        }
    }
}
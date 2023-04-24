package com.board.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/member")
public class MemberController {
//
//    @Autowired
//    private MemberRepository memberRepo;
//
//    @PostMapping("/join")
//    public String join (Member member){
//        System.out.println("member");
//        member.setRole("ROLE_USER");
//        memberRepo.save(member);
//        return member.getEmail();
//    }
}

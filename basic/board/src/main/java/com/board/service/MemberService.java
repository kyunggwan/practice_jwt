package com.board.service;

import com.board.entity.MemberEntity;
import com.board.repository.MemberRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MemberService {

    MemberRepository memberRepo;

    // 모든 유저 출력
    public List<MemberEntity> getUser() {
        try {
            List<MemberEntity> userList = memberRepo.findAll();
            return userList;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // 검색 유저 출력
    public List<MemberEntity> findUser(String keyword) {
        try {
            List <MemberEntity> user = memberRepo.findByEmailContaining(keyword);
            return user;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // 일부분 출력
    public void changeUser(MemberEntity memberEntity) {
        try {

            MemberEntity member = memberRepo.findByEmail(memberEntity.getEmail()).get();
            member = new MemberEntity(
                    member.getEmail(),
                    member.getPassword(),
                    member.getAuthority()
            );
            memberRepo.save(member);

        } catch (Exception e) {
            e.printStackTrace();

        }
    }

    public void deleteUser(Long id) {
        try {
            memberRepo.deleteById(id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("deleteUser success");
    }
}

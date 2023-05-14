package com.board.service;

import com.board.dto.AdminUpdateUserDto;
import com.board.entity.MemberEntity;
import com.board.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class AdminService {
//    updateUser
    private final AdminRepository adminRepository;

    // 모든 유저 출력
    public List<MemberEntity> getUser() {
        try {
            List<MemberEntity> userList = adminRepository.findAll();
            return userList;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public List<MemberEntity> updateUser(List<AdminUpdateUserDto> dtoList) {
        try {
            List<MemberEntity> updatedMembers = new ArrayList<>();

            for (AdminUpdateUserDto updateDto : dtoList) {
                MemberEntity updateMember = adminRepository.findById(Long.valueOf(updateDto.getId())).orElseThrow();

                updateMember.setAuthority(updateDto.getAuthority());
                adminRepository.save(updateMember);

                updatedMembers.add(updateMember);
            }

            return updatedMembers;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}

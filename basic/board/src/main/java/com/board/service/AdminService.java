package com.board.service;

import com.board.dto.AdminUpdateUserDto;
import com.board.entity.MemberEntity;
import com.board.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class AdminService {
//    updateUser
    private final AdminRepository adminRepository;

    public MemberEntity updateUser(AdminUpdateUserDto dto){
        try {
            MemberEntity updateMember = adminRepository.findById(Long.valueOf(dto.getId())).orElseThrow();

            updateMember.setAuthority(dto.getAuthority());

            adminRepository.save(updateMember);
            return updateMember;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }



}

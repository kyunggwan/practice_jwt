package com.board.service;
import com.board.dto.MemberResponseDto;
import com.board.entity.MemberEntity;
import com.board.repository.MemberRepository;

import com.board.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberService {

    private final MemberRepository memberRepo;
    private final PasswordEncoder passwordEncoder;

    // 헤더에 있는 token값을 토대로 Member의 data를 건내주는 메소드
    public MemberResponseDto getMyInfoBySecurity(){
        return memberRepo.findById(SecurityUtil.getCurrentMemberId())
                .map(MemberResponseDto::of)
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다."));
    }

    // 닉네임 변경
    @Transactional
    public MemberResponseDto changeMemberNickname(String email, String nickname){
        // 이모티콘 및 일부 특수문자 사용 제한
        String specialCharsPattern = "[&<>()'/]";

        // 중복 닉네임 확인
        if (memberRepo.existsByNickname(nickname)) {
            throw new RuntimeException("중복된 닉네임입니다.");
        }

        // 이모티콘 및 특수문자 사용 확인
        if (Pattern.matches(specialCharsPattern, nickname)) {
            throw new RuntimeException("이모티콘 및 일부 특수문자는 사용할 수 없습니다.");
        }

        MemberEntity member = memberRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다."));
        member.setNickname(nickname);
        return MemberResponseDto.of(memberRepo.save(member));
    }

    // password 변경
    @Transactional
    public MemberResponseDto changeMemberPassword(String email, String exPassword, String newPassword){
        // 토큰 값의 Id정보를 이용하여 member를 찾고, password를 변경
        MemberEntity member = memberRepo.findById(SecurityUtil.getCurrentMemberId()).orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다."));
        if(!passwordEncoder.matches(exPassword, member.getPassword())){
            throw new RuntimeException("비밀번호가 맞지 않습니다.");
        }
        member.setPassword(passwordEncoder.encode((newPassword)));
        return MemberResponseDto.of(memberRepo.save(member));
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
                    member.getNickname(),
                    member.getAuthority()
            );
            memberRepo.save(member);

        } catch (Exception e) {
            e.printStackTrace();

        }
    }

    // 유저 삭제
    @Transactional
    public void deleteUser(Long id) {
        try {
            memberRepo.deleteById(id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("deleteUser success");
    }
}

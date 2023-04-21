package com.board.service;

import com.board.dto.MemberDto;
import com.board.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@Service
@Transactional(readOnly = true)
public class MemberService {
    private final MemberRepository memberRepository;

    @Autowired
    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Transactional
    public MemberDto createMember(MemberDto memberDto) {
        Member member = new Member();
        member.setUserNickname(memberDto.getUserNickname());
        member.setUserEmail(memberDto.getUserEmail());
        member.setUserPassword(memberDto.getUserPassword());
        member.setUserAddress(memberDto.getUserAddress());
        member.setUserAddressDetail(memberDto.getUserAddressDetail());
        member.setUserPhoneNumber(memberDto.getUserPhoneNumber());
        member.setAuthority(memberDto.getAuthority());

        Member savedMember = memberRepository.save(member);
        return new MemberDto(savedMember);
    }

    public List<MemberDto> getAllMembers() {
        List<Member> members = memberRepository.findAll();
        return members.stream().map(MemberDto::new).collect(Collectors.toList());
    }

    public MemberDto getMemberByIdx(Long idx) {
        Member member = memberRepository.findByIdx(idx);
        if (member == null) {
            throw new NotFoundException("Member not found");
        }
        return new MemberDto(member);
    }

    @Transactional
    public MemberDto updateMember(Long idx, MemberDto memberDto) {
        Member member = memberRepository.findByIdx(idx);
        if (member == null) {
            throw new NotFoundException("Member not found");
        }

        member.setUserNickname(memberDto.getUserNickname());
        member.setUserEmail(memberDto.getUserEmail());
        member.setUserPassword(memberDto.getUserPassword());
        member.setUserAddress(memberDto.getUserAddress());
        member.setUserAddressDetail(memberDto.getUserAddressDetail());
        member.setUserPhoneNumber(memberDto.getUserPhoneNumber());
        member.setAuthority(memberDto.getAuthority());

        Member updatedMember = memberRepository.save(member);
        return new MemberDto(updatedMember);
    }

    @Transactional
    public void deleteMember(Long idx) {
        Member member = memberRepository.findByIdx(idx);
        if (member == null) {
            throw new NotFoundException("Member not found");
        }
        memberRepository.delete(member);
    }
}

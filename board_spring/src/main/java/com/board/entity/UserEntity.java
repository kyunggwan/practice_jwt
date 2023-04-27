package com.board.entity;

import com.board.dto.SignUpDto;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "user") // 해당 클래스를 Entity 클래스로 지정하고, 이름 User
@Table(name = "user")  // Table 이름 (User = DB의 테이블 명) 매핑해줌
@Builder
public class UserEntity {

    @Id
    private String userEmail; // 이메일
    private String userPassword; // 비밀번호
    private String userPasswordCheck;// 비밀번호 확인
    private String userNickname;// 닉네임
    private String userPhoneNumber;// 휴대폰번호
    private String userAddress; // 주소
    private String userAddressDetail;// 상세주소

//    @Enumerated(EnumType.STRING)
//    private Authority authority;		//권한

    public UserEntity(SignUpDto dto) {
        this.userEmail = dto.getUserEmail();
        this.userPassword = dto.getUserPassword();
        this.userNickname = dto.getUserNickname();
        this.userPhoneNumber = dto.getUserPhoneNumber();
        this.userAddress = dto.getUserAddress() + " " + dto.getUserAddressDetail();
    }
    
}

package com.board.entity;

// 임시로 RDB 에 저장하는 방식으로 구현
//	RDB 를 저장소로 사용한다면 배치 작업을 통해 만료된 토큰들을 삭제해주는 작업이 필요(구현 필요)

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Table(name = "refresh_token")
@Entity
public class RefreshToken {

    @Id
    @Column(name = "rt_key")
    private String key;	//member_id값

    @Column(name = "rt_value")
    private String value;	//token값

    @Builder
    public RefreshToken(String key, String value) {
        this.key = key;
        this.value = value;
    }

    public RefreshToken updateValue(String token) {
        this.value = token;
        return this;
    }

    //생성/수정 시간 컬럼을 추가하여 배치 작업으로 만료된 토큰들을 삭제

}
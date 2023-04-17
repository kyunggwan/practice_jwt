package com.board.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor(staticName = "set") // set 이라는 고정된 이름으로 사용 하겠다
public class ResponseDto<D> {   // 모든 Response에 대한 dto
    private boolean result; // 결과가 True인지 False 인지
    private String message; // 결과에 대한 내용 (성공하면 성공, email이 중복된다, 패스워드 불일치 등)
    private D data; // { token, exprTime }

    // 성공했을 경우, 성공한 인스턴스 만드는 메소드
    public static <D> ResponseDto<D> setSuccess(String message, D data) {
        return ResponseDto.set(true, message, data);
    }

    // 실패 했을 경우, 실패한 인스턴스 만드는 메소드
    public static <D> ResponseDto<D> setFailed(String message) {
        return ResponseDto.set(false, message, null);
    }
}

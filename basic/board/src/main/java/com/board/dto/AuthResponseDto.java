package com.board.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor(staticName = "set")
public class AuthResponseDto<D> {

    private boolean result; // TF 출력
    private String message; // 결과에 따른 메시지 적어서 출력
    private D date;

    // 성공했을 경우, 성공한 인스턴스 만드는 메소드
    public static <D> AuthResponseDto<D> setSuccess(String message, D data) {
        return AuthResponseDto.set(true, message, data);
    }

    // 실패 했을 경우, 실패한 인스턴스 만드는 메소드
    public static <D> AuthResponseDto<D> setFailed(String message) {
        return AuthResponseDto.set(false, message, null);
    }
}

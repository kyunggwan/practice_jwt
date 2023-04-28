package com.board.domain;

import lombok.Getter;

@Getter
public enum Authority {
  ROLE_USER, ROLE_ADMIN;

    private String value;

}

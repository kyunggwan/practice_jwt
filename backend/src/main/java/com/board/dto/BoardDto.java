package com.board.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BoardDto {

    private long id;
    private String boardTitle;
    private String boardContent;
    private String boardWriter;
    private String boardCreateTime;

}

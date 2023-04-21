package com.board.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class BoardEntity {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id; // pk
    private String title;
    private String content;
    private String writer;
    private int hits;
    private char deleteYn; // 삭제 여부
    private LocalDateTime createdDate = LocalDateTime.now(); // 생성일
    private LocalDateTime modifiedDate; // 수정일
    
    @Builder
    public BoardEntity(String title, String content, String writer, int hits, char deleteYn){
        this.title = title;
        this.content = content;
        this.writer = writer;
        this.hits = hits;
        this.deleteYn = deleteYn;
        
    }
    
}

package com.board;

import com.board.entity.BoardEntity;
import com.board.repository.BoardRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class BoardTest {

    @Autowired
    BoardRepository boardRepo;

//
//    public BoardTest(BoardRepository boardRepo) {
//        this.boardRepo = boardRepo;
//    }

    @Test
    void save() {
        // 1. 게시글 파라미터 생성
        BoardEntity params = BoardEntity.builder()
                .title("1번 게시글 제목")
                .content("1번 게시글 내용")
                .writer("작가")
                .hits(0)
                .deleteYn('N')
                .build();

        // 2. 게시글 저장
        boardRepo.save(params);

        // 3. 1번 게시글 정보 조회
        BoardEntity boardEntity = boardRepo.findById((long) 1).get();
        assertEquals(boardEntity.getTitle(), "1번 게시글 제목");
        assertEquals(boardEntity.getContent(), "1번 게시글 내용");
        assertEquals(boardEntity.getWriter(), "작가");

    }


    @Test
    void fineAll() {
        // 1. 전체 게시글 수 조회
        long boardsCount = boardRepo.count();

        // 2. 전체 게시글 리스트 조회
        List<BoardEntity> boards = boardRepo.findAll();
    }

    @Test
    void delete() {

        // 1. 게시글 조회
        BoardEntity entity = boardRepo.findById((long) 1).get();

        // 2. 게시글 삭제
        boardRepo.delete(entity);
    }


}

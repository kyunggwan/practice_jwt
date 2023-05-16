package com.board.service;

import com.board.dto.BoardDto;
import com.board.entity.BoardEntity;
import com.board.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class BoardService {

    private final BoardRepository boardRepo;

    // 전체 게시글 가져오기
    public List<BoardDto> getBoardList() {

     List<BoardEntity> boardEntities = boardRepo.findAll();
     List<BoardDto> dtos = new ArrayList<>();

     for(BoardEntity entity : boardEntities){
         BoardDto dto = BoardDto.builder()
                 .id(entity.getId())
                 .boardWriter(entity.getBoardWriter())
                 .boardContent(entity.getBoardContent())
                 .boardTitle(entity.getBoardTitle())
                 .boardCreateTime(entity.getBoardCreateTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss")))
                 .build();

         dtos.add(dto);
     }
     return dtos;
    }

    // 특정 게시글 가져오기
    public BoardDto getBoard(Long id) {
        BoardEntity entity = boardRepo.findById(id).orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));
        return BoardDto.builder()
                .id(entity.getId())
                .boardWriter(entity.getBoardWriter())
                .boardTitle(entity.getBoardTitle())
                .boardContent(entity.getBoardContent())
                .boardCreateTime(entity.getBoardCreateTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss")))
                .build();
    }

    // 게시글 등록
    public BoardEntity create(BoardDto boardDto){
        BoardEntity entity = BoardEntity.builder()
                .id(boardDto.getId())
                .boardWriter(boardDto.getBoardWriter())
                .boardTitle(boardDto.getBoardTitle())
                .boardContent(boardDto.getBoardContent())
                .boardCreateTime(LocalDateTime.now())
                .build();
        return boardRepo.save(entity);
    }

    // 게시글 수정
    public BoardEntity update(BoardDto boardDto){
        BoardEntity entity = boardRepo.findById(boardDto.getId()).orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));
        entity.setBoardTitle(boardDto.getBoardTitle());
        entity.setBoardContent(boardDto.getBoardContent());
        return boardRepo.save(entity);
    }

    public void delete(Long id){
        BoardEntity entity = boardRepo.findById(id).orElseThrow(() -> new RuntimeException("삭제하려는 id를 찾을 수 없습니다."));
        boardRepo.save(entity);
    }
}

package com.board.controller;

import com.board.dto.BoardDto;
import com.board.entity.BoardEntity;
import com.board.service.boardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/board")
public class BoardController {

    private final boardService boardService;

    @GetMapping("/list")
    public List<BoardDto> boardList() {
        return boardService.getBoardList();
    }

    @GetMapping("/list/{id}")
    public BoardDto getBoard(@PathVariable Long id){
        return boardService.getBoard(id);
    }

    @PostMapping("/")
    public BoardEntity create(@RequestBody BoardDto boardDto){
        return boardService.create(boardDto);
    }

    @PatchMapping("/")
    public BoardEntity update(@RequestBody BoardDto boardDto){
        return boardService.update(boardDto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        boardService.delete(id);
    }
}

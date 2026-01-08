package com.example.springrest.domain.boards.board.controller;

import com.example.springrest.domain.boards.board.model.dto.BoardRequest;
import com.example.springrest.domain.boards.board.model.dto.BoardSearchDto;
import com.example.springrest.domain.boards.board.model.entity.Board;
import com.example.springrest.domain.boards.board.service.BoardService;
import com.example.springrest.global.model.dto.ApiResponse;
import com.example.springrest.global.model.dto.PageResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Board - Post Management", description = "게시물 관리 API")
@Slf4j
@RestController
@RequestMapping("/api/v1/boards/board")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @Operation(summary = "게시물 목록 조회")
    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<Board>>> getAllBoards(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @ModelAttribute BoardSearchDto searchDto) {
        return ResponseEntity.ok(ApiResponse.success(boardService.getBoardList(page, size, searchDto)));
    }

    @Operation(summary = "게시물 상세 조회")
    @GetMapping("/{boardId}")
    public ResponseEntity<ApiResponse<Board>> getBoardById(@PathVariable Integer boardId) {
        Board board = boardService.getBoard(boardId);
        return board != null ? ResponseEntity.ok(ApiResponse.success(board)) : ResponseEntity.notFound().build();
    }

    @Operation(summary = "게시물 생성")
    @PostMapping(consumes = { "multipart/form-data" })
    public ResponseEntity<ApiResponse<Void>> createBoard(
            @RequestPart(value = "request") @Valid BoardRequest request,
            @RequestPart(value = "files", required = false) List<MultipartFile> files) throws Exception {
        boardService.createBoard(request, files);
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @Operation(summary = "게시물 수정")
    @PutMapping(value = "/{boardId}", consumes = { "multipart/form-data" })
    public ResponseEntity<ApiResponse<Void>> updateBoard(
            @PathVariable Integer boardId,
            @RequestPart(value = "request") @Valid BoardRequest request,
            @RequestPart(value = "files", required = false) List<MultipartFile> files) throws Exception {
        boardService.updateBoard(boardId, request, files);
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @Operation(summary = "게시물 삭제")
    @DeleteMapping("/{boardId}")
    public ResponseEntity<ApiResponse<Void>> deleteBoard(@PathVariable Integer boardId) {
        boardService.deleteBoard(boardId);
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}

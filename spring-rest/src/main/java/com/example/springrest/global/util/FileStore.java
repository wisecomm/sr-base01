package com.example.springrest.global.util;

import com.example.springrest.domain.boards.board.model.entity.BoardFile;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Component
public class FileStore {

    @Value("${app.file.upload-dir}")
    private String fileDir;

    public String getFullPath(String filename) {
        return fileDir + filename;
    }

    public List<BoardFile> storeFiles(List<MultipartFile> multipartFiles, Integer boardId) throws IOException {
        List<BoardFile> storeFileResult = new ArrayList<>();
        if (multipartFiles == null || multipartFiles.isEmpty()) {
            return storeFileResult;
        }

        for (MultipartFile multipartFile : multipartFiles) {
            if (!multipartFile.isEmpty()) {
                storeFileResult.add(storeFile(multipartFile, boardId));
            }
        }
        return storeFileResult;
    }

    public BoardFile storeFile(MultipartFile multipartFile, Integer boardId) throws IOException {
        if (multipartFile.isEmpty()) {
            return null;
        }

        String originalFilename = multipartFile.getOriginalFilename();
        String storeFileName = createStoreFileName(originalFilename);
        String subPath = "/board/"; // Can be dynamic based on requirements

        // Ensure directory exists
        File uploadDir = new File(getFullPath(subPath));
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }

        multipartFile.transferTo(new File(getFullPath(subPath + storeFileName)));

        return BoardFile.builder()
                .boardId(boardId)
                .orgFileNm(originalFilename)
                .strFileNm(storeFileName)
                .filePath(subPath)
                .fileSize(multipartFile.getSize())
                .fileExt(extractExt(originalFilename))
                .mimeType(multipartFile.getContentType())
                .useYn("1")
                .build();
    }

    private String createStoreFileName(String originalFilename) {
        String ext = extractExt(originalFilename);
        String uuid = UUID.randomUUID().toString();
        return uuid + "." + ext;
    }

    private String extractExt(String originalFilename) {
        int pos = originalFilename.lastIndexOf(".");
        return originalFilename.substring(pos + 1);
    }
}

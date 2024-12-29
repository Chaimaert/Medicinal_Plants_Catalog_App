package com.example.plantes.catalogueplantesapplication.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/admin/files")
public class FileUploadController {

    private static final Logger logger = LoggerFactory.getLogger(FileUploadController.class);

    @Value("${file.upload.dir}")
    private String uploadDir;

    @PostMapping("/upload")
    public String uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
        logger.info("Uploading file: {}", file.getOriginalFilename());

        Path uploadPath = Paths.get(uploadDir, file.getOriginalFilename());
        Files.createDirectories(uploadPath.getParent());
        file.transferTo(uploadPath.toFile());

        logger.info("File uploaded to: {}", uploadPath);
        return uploadPath.toString();
    }

    @DeleteMapping("/{filename}")
    public String deleteFile(@PathVariable String filename) throws IOException {
        Path filePath = Paths.get(uploadDir, filename);

        if (Files.exists(filePath)) {
            Files.delete(filePath);
            return "File deleted successfully";
        } else {
            return "File not found";
        }
    }
}

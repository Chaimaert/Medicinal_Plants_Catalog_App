package com.example.plantes.catalogueplantesapplication.config;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.File;

@Component
public class FileUploadHelper {

    @Value("${file.upload.dir}")
    private String uploadDir;

    public File getTestFile(String fileName) {
        return new File(uploadDir + File.separator + fileName);
    }
}


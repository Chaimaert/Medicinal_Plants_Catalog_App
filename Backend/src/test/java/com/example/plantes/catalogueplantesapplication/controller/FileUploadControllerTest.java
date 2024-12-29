package com.example.plantes.catalogueplantesapplication.controller;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import static org.junit.jupiter.api.Assertions.*;

class FileUploadControllerTest {

    private static final Logger logger = LoggerFactory.getLogger(FileUploadControllerTest.class);

    private static final String TEST_UPLOAD_DIR = "D:\\projects\\Medicinal_Plants_Catalog_App\\Backend\\uploads\\";
    private Path testFilePath;

    @BeforeEach
    void setUp() throws IOException {
        testFilePath = Paths.get(TEST_UPLOAD_DIR, "test.txt");
        Files.createDirectories(testFilePath.getParent());
        Files.createFile(testFilePath);
    }

    @Test
    void testFileDeletion() throws IOException {
        // Assert that the file exists before deletion
        assertTrue(Files.exists(testFilePath), "The uploaded file should exist.");

        // Perform file deletion
        Files.delete(testFilePath);

        // Assert that the file no longer exists after deletion
        assertFalse(Files.exists(testFilePath), "The uploaded file should be deleted.");
    }

    @AfterEach
    void tearDown() {
        // Ensure the test file is deleted to clean up the test environment
        try {
            if (Files.exists(testFilePath)) {
                Files.delete(testFilePath);
                logger.info("Test file deleted successfully: {}", testFilePath);
            }
        } catch (IOException e) {
            logger.error("Failed to clean up test file: {}", testFilePath, e);
        }
    }
}

package com.attandance.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.attandance.backend.dto.ApiResponse;
import com.attandance.backend.dto.request.QrRequest.QrInputRequest;
import com.attandance.backend.dto.request.QrRequest.QrScanRequest;
import com.attandance.backend.dto.response.QrResponse.QRRecordResponse;
import com.attandance.backend.entity.QRCode.QRCodeEntity;
import com.attandance.backend.entity.User.UserEntity;
import com.attandance.backend.repository.UserRepository;
import com.attandance.backend.service.QRCodeService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import javax.imageio.ImageIO;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/qr")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class QRCodeController {

    QRCodeService qrCodeService;
    UserRepository userRepository;

    @GetMapping
    public ApiResponse<List<QRCodeEntity>> getQrCodes(@RequestParam(required = false) String createdDay) {
        var result = qrCodeService.getQrCodes(createdDay);
        return ApiResponse.<List<QRCodeEntity>>builder().result(result).build();
    }

    @PostMapping(value = "/create", produces = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<byte[]> createQr(@RequestBody QrInputRequest qrInputRequest, @AuthenticationPrincipal String email) throws Exception {
        UserEntity currentUser = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        BufferedImage image = qrCodeService.createQrCode(qrInputRequest, currentUser.getId());

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(image, "png", baos);

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_PNG)
                .body(baos.toByteArray());
    }
        
    @PostMapping("/scan")
    public ApiResponse<QRRecordResponse> scanQr(@RequestParam String token, @RequestBody QrScanRequest qrScanRequest, @AuthenticationPrincipal String email) {
        var result = qrCodeService.scanQr(token, qrScanRequest, email);
        return ApiResponse.<QRRecordResponse>builder().result(result).build();
    }
}

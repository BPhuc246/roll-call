package com.attandance.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.attandance.backend.dto.ApiResponse;
import com.attandance.backend.dto.request.QrRequest.QrInputRequest;
import com.attandance.backend.dto.request.QrRequest.QrScanRequest;
import com.attandance.backend.dto.response.QrResponse.GetAllQRCodeResponse;
import com.attandance.backend.dto.response.QrResponse.QRCodeResponse;
import com.attandance.backend.dto.response.QrResponse.QRRecordResponse;
import com.attandance.backend.service.QRCodeService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

import org.springframework.security.core.Authentication;
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

    @GetMapping
    public ApiResponse<List<GetAllQRCodeResponse>> getQrCodes(@RequestParam(required = false) String createdDay) {
        var result = qrCodeService.getQrCodes(createdDay);
        return ApiResponse.<List<GetAllQRCodeResponse>>builder().result(result).build();
    }

    @PostMapping("/create")
    public ApiResponse<QRCodeResponse> createQr(@RequestBody QrInputRequest qrInputRequest, Authentication authentication) {
        String email = authentication.getName();
        QRCodeResponse response = qrCodeService.createQrCode(qrInputRequest, email);
        return ApiResponse.<QRCodeResponse>builder().result(response).build();
    }
        
    @PostMapping("/scan")
    public ApiResponse<QRRecordResponse> scanQr(@RequestParam String token, @RequestBody QrScanRequest qrScanRequest, @AuthenticationPrincipal String email, HttpServletRequest httpRequest) {
        String ipAddress = httpRequest.getHeader("X-Forwarded-For");
        if (ipAddress == null || ipAddress.isBlank()) {
            ipAddress = httpRequest.getRemoteAddr();
        }
        var result = qrCodeService.scanQr(token, qrScanRequest, email, ipAddress);
        return ApiResponse.<QRRecordResponse>builder().result(result).build();
    }
}

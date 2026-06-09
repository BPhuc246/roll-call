package com.attandance.backend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.attandance.backend.dto.request.QrRequest.QrInputRequest;
import com.attandance.backend.dto.request.QrRequest.QrScanRequest;
import com.attandance.backend.dto.response.QrResponse.QRRecordResponse;
import com.attandance.backend.entity.QRCode.QRCodeEntity;
import com.attandance.backend.entity.QRCode.QRCodeEnumStatus;
import com.attandance.backend.entity.QRCode.QRRecord;
import com.attandance.backend.entity.User.UserEntity;
import com.attandance.backend.mapper.QRCodeMapper;
import com.attandance.backend.repository.QRRecordRepository;
import com.attandance.backend.repository.QRRepository;
import com.attandance.backend.repository.UserRepository;
import com.attandance.backend.util.GeneratorFunction;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;

import jakarta.transaction.Transactional;

import java.awt.image.BufferedImage;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE)
public class QRCodeService {

    @NonFinal
    @Value("${backend.url}")
    String BACKEND_URL;

    final QRRepository qrRepository;
    final UserRepository userRepository;
    final QRRecordRepository qrRecordRepository;
    final GeneratorFunction generatorFunction;
    final QRCodeMapper qrCodeMapper;

    public List<QRCodeEntity> getQrCodes(String createdDay) {
        if (createdDay == null || createdDay.isBlank()) {
            return qrRepository.findAll();
        }
        LocalDateTime now = LocalDateTime.now();
        return switch (createdDay.toLowerCase()) {
            case "day" ->
                qrRepository.findByCreatedAtAfter(
                    now.minusDays(1));

            case "week" ->
                qrRepository.findByCreatedAtAfter(
                    now.minusWeeks(1));

            case "month" ->
                qrRepository.findByCreatedAtAfter(
                    now.minusMonths(1));

            default ->
                qrRepository.findAll();
        };
    }

    public BufferedImage createQrCode(QrInputRequest qrInputRequest, Long creatorId) throws WriterException {

        int maxRetries = 5;
        for (int attempt = 0; attempt < maxRetries; attempt++) {
            try {
                String token = UUID.randomUUID().toString();
                String code = generatorFunction.generateEightDigitCode();

                QRCodeEntity newQrCode = QRCodeEntity.builder()
                    .title(qrInputRequest.getTitle())
                    .creatorId(creatorId)
                    .code(code)
                    .token(token)
                    .startTime(qrInputRequest.getStartTime())
                    .endTime(qrInputRequest.getEndTime())
                    .locationMethod(qrInputRequest.getLocationMethod())
                    .build();

                qrRepository.save(newQrCode);

                String qrContent = BACKEND_URL + "/api/qr/scan?token=" + token;

                QRCodeWriter qrCodeWriter = new QRCodeWriter();
                BitMatrix bitMatrix = qrCodeWriter.encode(
                    qrContent,
                    BarcodeFormat.QR_CODE,
                    300,
                    300
                );

                BufferedImage image = new BufferedImage(300, 300, BufferedImage.TYPE_INT_RGB);
                for (int x = 0; x < 300; x++) {
                    for (int y = 0; y < 300; y++) {
                        image.setRGB(x, y, bitMatrix.get(x, y) ? 0xFF000000 : 0xFFFFFFFF);
                    }
                }
                return image;

            } catch (DataIntegrityViolationException e) {
                if (attempt == maxRetries - 1) {
                    throw new RuntimeException("Failed to generate unique code, please try again");
                }
            }
        }

        throw new RuntimeException("Unexpected error during QR code creation");
    }

    void validateQRCode(QRCodeEntity qrCode) {
        if (qrCode.getStatus() != QRCodeEnumStatus.ACTIVE) {
            throw new RuntimeException("QR Code is not active");
        }
        LocalDateTime now = LocalDateTime.now();
        if (qrCode.getStartTime() != null && now.isBefore(qrCode.getStartTime())) {
            throw new RuntimeException("Session not started yet");
        }
        if (qrCode.getEndTime() != null && now.isAfter(qrCode.getEndTime())) {
            throw new RuntimeException("Session has expired");
        }
    }

    @Transactional
    public QRRecordResponse scanQr(String token, QrScanRequest qrScanRequest, String email) {
        QRCodeEntity qrCode = qrRepository.findByToken(token)
            .orElseThrow(() -> new RuntimeException("QR Code not found"));

        if (qrCode.getStatus() != QRCodeEnumStatus.ACTIVE) {
            throw new RuntimeException("QR Code is not active");
        }

        validateQRCode(qrCode);

        if (!qrScanRequest.getCode().isEmpty() && !qrScanRequest.getCode().equals(qrCode.getCode())) {
            throw new RuntimeException("Wrong code");
        }


        LocalDateTime now = LocalDateTime.now();
        if (qrCode.getStartTime() != null && now.isBefore(qrCode.getStartTime())) {
            throw new RuntimeException("QR Code is not yet valid");
        }
        if (qrCode.getEndTime() != null && now.isAfter(qrCode.getEndTime())) {
            throw new RuntimeException("QR Code has expired");
        }

        UserEntity user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

        QRRecord records = qrRecordRepository.findByQrCodeAndMember(qrCode, user)
            .map(existing -> {
                existing.setAmountCheckIn(existing.getAmountCheckIn() + 1);
                return qrRecordRepository.save(existing);
            })
            .orElseGet(() -> qrRecordRepository.save(
                QRRecord.builder()
                    .qrCode(qrCode)
                    .member(user)
                    .build()
            ));
        
        return qrCodeMapper.toRecordResponse(records);
    }
}

package com.attandance.backend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.attandance.backend.dto.request.QrRequest.QrInputRequest;
import com.attandance.backend.entity.QRCode.QRCodeEntity;
import com.attandance.backend.entity.User.UserEntity;
import com.attandance.backend.repository.QRRepository;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import java.awt.image.BufferedImage;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class QRCodeService {

    QRRepository qrRepository;

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

    public BufferedImage createQrCode(QrInputRequest qrInputRequest, UserEntity currentUser) throws WriterException {
        
        QRCodeWriter qrCodeWriter = new QRCodeWriter();

        BitMatrix bitMatrix = qrCodeWriter.encode(
                qrInputRequest.getTitle(),
                BarcodeFormat.QR_CODE,
                300,
                300);

        BufferedImage image = new BufferedImage(
                300,
                300,
                BufferedImage.TYPE_INT_RGB);

        for (int x = 0; x < 300; x++) {
            for (int y = 0; y < 300; y++) {
                image.setRGB(
                        x,
                        y,
                        bitMatrix.get(x, y)
                                ? 0xFF000000
                                : 0xFFFFFFFF);
            }
        }

        QRCodeEntity newQrCode = QRCodeEntity.builder()
            .title(qrInputRequest.getTitle())
            .createdBy(currentUser)
            .token(UUID.randomUUID().toString())
            .startTime(qrInputRequest.getStartTime())
            .endTime(qrInputRequest.getEndTime())
            .locationMethod(qrInputRequest.getLocationMethod())
            .build();
        
        qrRepository.save(newQrCode);

        return image;
    }


}

package com.attandance.backend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.attandance.backend.dto.request.QrRequest.QrInputRequest;
import com.attandance.backend.dto.request.QrRequest.QrScanRequest;
import com.attandance.backend.dto.response.QrResponse.GetAllQRCodeResponse;
import com.attandance.backend.dto.response.QrResponse.QRCodeResponse;
import com.attandance.backend.dto.response.QrResponse.QRRecordResponse;
import com.attandance.backend.entity.QRCode.QRCodeEntity;
import com.attandance.backend.entity.QRCode.QRCodeEnumMethod;
import com.attandance.backend.entity.QRCode.QRCodeEnumStatus;
import com.attandance.backend.entity.QRCode.QRRecord;
import com.attandance.backend.entity.User.UserEntity;
import com.attandance.backend.mapper.QRCodeMapper;
import com.attandance.backend.repository.QRRecordRepository;
import com.attandance.backend.repository.QRRepository;
import com.attandance.backend.repository.UserRepository;
import com.attandance.backend.util.GeneratorFunction;

import jakarta.transaction.Transactional;

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

    public List<GetAllQRCodeResponse> getQrCodes(String createdDay) {
        List<QRCodeEntity> qrCodeEntity;
        if (createdDay == null || createdDay.isBlank()) {
            qrCodeEntity = qrRepository.findAll();
        } else {
            LocalDateTime now = LocalDateTime.now();
            switch (createdDay.toLowerCase()) {
            case "day" ->
                qrCodeEntity = qrRepository.findByCreatedAtAfter(
                    now.minusDays(1));

            case "week" ->
                qrCodeEntity = qrRepository.findByCreatedAtAfter(
                    now.minusWeeks(1));

            case "month" ->
                qrCodeEntity = qrRepository.findByCreatedAtAfter(
                    now.minusMonths(1));

            default ->
                qrCodeEntity = qrRepository.findAll();            
            };
        }

        return qrCodeEntity.stream()
            .map(qr -> qrCodeMapper.toGetAllQRCodeResponse(qr))
            .toList();
    }

    public QRCodeResponse createQrCode(
        QrInputRequest qrInputRequest,
        String email) {

    UserEntity currentUser = userRepository
            .findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

    int maxRetries = 5;

    for (int attempt = 0; attempt < maxRetries; attempt++) {
        try {

            String token = UUID.randomUUID().toString();
            String code = generatorFunction.generateEightDigitCode();

            QRCodeEntity newQrCode = QRCodeEntity.builder()
                    .title(qrInputRequest.getTitle())
                    .createdBy(currentUser)
                    .token(token)
                    .code(code)
                    .startTime(qrInputRequest.getStartTime())
                    .endTime(qrInputRequest.getEndTime())
                    .locationMethod(qrInputRequest.getLocationMethod())
                    .ipAddress(
                            qrInputRequest.getLocationMethod()
                                    == QRCodeEnumMethod.IP_ADDRESS
                                            ? qrInputRequest.getIpAddress()
                                            : "")
                    .build();
            qrRepository.save(newQrCode);
            return QRCodeResponse.builder()
                    .id(newQrCode.getId())
                    .token(newQrCode.getToken())
                    .code(newQrCode.getCode())
                    .build();

        } catch (DataIntegrityViolationException e) {

            if (attempt == maxRetries - 1) {
                throw new RuntimeException(
                        "Failed to generate unique code");
            }
        }
    }

    throw new RuntimeException(
            "Unexpected error during QR creation");
}

    void validateQRCode(QRCodeEntity qrCode, String ipAddress) {
        if (qrCode.getStatus() != QRCodeEnumStatus.ACTIVE) 
            throw new RuntimeException("QR Code is not active");
        if (!qrCode.getIpAddress().equals(ipAddress)) 
            throw new RuntimeException("Invalid ip address");
        LocalDateTime now = LocalDateTime.now();
        if (qrCode.getStartTime() != null && now.isBefore(qrCode.getStartTime())) 
            throw new RuntimeException("Session not started yet");
        if (qrCode.getEndTime() != null && now.isAfter(qrCode.getEndTime())) 
            throw new RuntimeException("Session has expired");
    }

    @Transactional
    public QRRecordResponse scanQr(String token, QrScanRequest qrScanRequest, String email, String ipAddress) {
        QRCodeEntity qrCode = qrRepository.findByToken(token)
            .orElseThrow(() -> new RuntimeException("QR Code not found"));
        validateQRCode(qrCode, ipAddress);
        if (!qrScanRequest.getCode().isEmpty() && !qrScanRequest.getCode().equals(qrCode.getCode())) {
            throw new RuntimeException("Wrong code");
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

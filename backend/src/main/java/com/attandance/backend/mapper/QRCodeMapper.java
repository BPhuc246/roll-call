package com.attandance.backend.mapper;

import org.springframework.stereotype.Component;

import com.attandance.backend.dto.response.QrResponse.GetAllQRCodeResponse;
import com.attandance.backend.dto.response.QrResponse.QRCodeResponse;
import com.attandance.backend.dto.response.QrResponse.QRRecordResponse;
import com.attandance.backend.entity.QRCode.QRCodeEntity;
import com.attandance.backend.entity.QRCode.QRRecord;

@Component
public class QRCodeMapper {
    public QRRecordResponse toRecordResponse(QRRecord record) {
        return QRRecordResponse.builder()
            .id(record.getId())
            .qrCodeId(record.getQrCode().getId())
            .memberEmail(record.getMember().getEmail())
            .amountCheckIn(record.getAmountCheckIn())
            .createdAt(record.getCreatedAt())
            .build();
    }

    public QRCodeResponse toQRCodeResponse(QRCodeEntity qrCode) {
        return QRCodeResponse.builder()
            .id(qrCode.getId())
            .title(qrCode.getTitle())
            .token(qrCode.getToken())
            .code(qrCode.getCode())
            .records(qrCode.getRecords()
                .stream()
                .map(this::toRecordResponse)
                .toList())
            .build();
    }

    public GetAllQRCodeResponse toGetAllQRCodeResponse(QRCodeEntity qrCodeEntity) {
        return GetAllQRCodeResponse.builder()
            .id(qrCodeEntity.getId())
            .title(qrCodeEntity.getTitle())
            .token(qrCodeEntity.getToken())
            .username(qrCodeEntity.getCreatedBy().getUsername())
            .email(qrCodeEntity.getCreatedBy().getEmail())
            .avatar(qrCodeEntity.getCreatedBy().getAvatar())
            .startTime(qrCodeEntity.getStartTime())
            .endTime(qrCodeEntity.getEndTime())
            .locationMethod(qrCodeEntity.getLocationMethod())
            .status(qrCodeEntity.getStatus())
            .build();
    }
}

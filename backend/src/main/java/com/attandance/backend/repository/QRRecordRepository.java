package com.attandance.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.attandance.backend.entity.QRCode.QRRecord;
import com.attandance.backend.entity.QRCode.QRCodeEntity;
import com.attandance.backend.entity.User.UserEntity;

public interface QRRecordRepository extends JpaRepository<QRRecord, Long> {
    Optional<QRRecord> findByQrCodeAndMember(QRCodeEntity qrCode, UserEntity member);
    List<QRRecord> findByQrCode(QRCodeEntity qrCode);
}
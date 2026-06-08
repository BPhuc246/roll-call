package com.attandance.backend.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.attandance.backend.entity.QRCode.QRCodeEntity;

public interface QRRepository extends JpaRepository<QRCodeEntity, Long> {
    List<QRCodeEntity> findByCreatedAtAfter(LocalDateTime createdAt);

}

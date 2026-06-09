package com.attandance.backend.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.attandance.backend.entity.QRCode.QRCodeEntity;
public interface QRRepository extends JpaRepository<QRCodeEntity, Long> {
    List<QRCodeEntity> findByCreatedAtAfter(LocalDateTime createdAt);
    Optional<QRCodeEntity> findByToken(String token);
    Optional<QRCodeEntity> findByCode(String code); 
    boolean existsByCode(String code);       

}

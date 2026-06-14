package com.attandance.backend.entity.QRCode;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.attandance.backend.entity.Room.RoomEntity;
import com.attandance.backend.entity.User.UserEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "qr_codes")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class QRCodeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(nullable = false, length = 30)
    String title;

    @Column(unique = true, nullable = false)
    String token;

    @Column(unique = true, nullable = true, length = 8)
    String code;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    RoomEntity room;

    @ManyToOne
    @JoinColumn(name = "created_by")
    UserEntity createdBy;

    LocalDateTime startTime;

    LocalDateTime endTime;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    QRCodeEnumMethod locationMethod = QRCodeEnumMethod.NONE;

    @Column(length = 100)
    String ipAddress;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    QRCodeEnumStatus status = QRCodeEnumStatus.ACTIVE;

    @OneToMany(
        mappedBy = "qrCode",
        fetch = FetchType.LAZY
    )
    List<QRRecord> records;

    @Column(nullable = false)
    @Builder.Default
    Boolean isDeleted = false;

    @CreationTimestamp
    LocalDateTime createdAt;

    @UpdateTimestamp
    LocalDateTime updatedAt;
}

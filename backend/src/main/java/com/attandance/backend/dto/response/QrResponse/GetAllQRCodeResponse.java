package com.attandance.backend.dto.response.QrResponse;

import java.time.LocalDateTime;

import com.attandance.backend.entity.QRCode.QRCodeEnumMethod;
import com.attandance.backend.entity.QRCode.QRCodeEnumStatus;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class GetAllQRCodeResponse {
    Long id;
    String title;
    String token;
    String username;
    String email;
    String avatar;
    LocalDateTime startTime;
    LocalDateTime endTime;
    QRCodeEnumMethod locationMethod;
    QRCodeEnumStatus status;
}

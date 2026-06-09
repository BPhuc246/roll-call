package com.attandance.backend.dto.response.QrResponse;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class QRRecordResponse {
    Long id;
    Long qrCodeId;     
    String memberEmail;
    Integer amountCheckIn;
    LocalDateTime createdAt;
}

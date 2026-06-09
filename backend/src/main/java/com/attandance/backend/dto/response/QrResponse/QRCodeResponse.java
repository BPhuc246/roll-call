package com.attandance.backend.dto.response.QrResponse;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class QRCodeResponse {
    Long id;
    String title;
    String token;
    String code;
    List<QRRecordResponse> records;
}

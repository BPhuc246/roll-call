package com.attandance.backend.dto.request.QrRequest;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotBlank;
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
@FieldDefaults(level = AccessLevel.PRIVATE)
public class QrInputRequest {
    @NotBlank(message = "Title is required")
    String title;    

    LocalDateTime startTime;
    LocalDateTime endTime;

    @NotBlank(message = "LocationMethod is required")
    String locationMethod;
}

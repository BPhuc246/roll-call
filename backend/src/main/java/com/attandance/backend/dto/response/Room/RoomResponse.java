package com.attandance.backend.dto.response.Room;

import java.time.LocalDateTime;
import java.util.List;

import com.attandance.backend.dto.response.QrResponse.QRCodeResponse;
import com.attandance.backend.dto.response.UserResponse.UserResponse;

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
public class RoomResponse {
    Long id;
    String name;
    List<String> allowMembersEmail;
    List<UserResponse> members;
    UserResponse owner;
    List<QRCodeResponse> qrCodes;
    LocalDateTime createdAt;
}

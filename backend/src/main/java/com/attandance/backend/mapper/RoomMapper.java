package com.attandance.backend.mapper;

import org.springframework.stereotype.Component;

import com.attandance.backend.dto.response.Room.RoomResponse;
import com.attandance.backend.entity.Room.RoomEntity;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class RoomMapper {

    private final UserMapper userMapper;
    private final QRCodeMapper qrCodeMapper;

    public RoomResponse toRoomResponse(RoomEntity roomEntity) {
        return RoomResponse.builder()
            .id(roomEntity.getId())
            .name(roomEntity.getName())        
            .allowMembersEmail(roomEntity.getAllowMembersEmail())
            .members(roomEntity.getMembers().stream().map((member -> userMapper.toUserRespons(member.getUser()))).toList())
            .owner(userMapper.toUserRespons(roomEntity.getOwner()))
            .qrCodes(roomEntity.getQrCodes().stream().map((qr -> qrCodeMapper.toQRCodeResponse(qr))).toList())
            .createdAt(roomEntity.getCreatedAt())
            .build();
    }
}

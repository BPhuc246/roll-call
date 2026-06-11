package com.attandance.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.attandance.backend.dto.request.Room.RoomInputRequest;
import com.attandance.backend.dto.response.Room.RoomResponse;
import com.attandance.backend.entity.Room.RoomEntity;
import com.attandance.backend.entity.User.UserEntity;
import com.attandance.backend.mapper.RoomMapper;
import com.attandance.backend.repository.RoomRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoomService {

    RoomRepository roomRepository;
    RoomMapper roomMapper;

    public List<RoomResponse> getMyRooms(Long ownerId) {
    return roomRepository.findRoomByOwnerId(ownerId)
            .stream()
            .map(roomMapper::toRoomResponse)
            .toList();
    }

    public RoomResponse getMyDetailRoom(Long roomId, Long ownerId) {
        RoomEntity room = roomRepository.findById(roomId)
                        .orElseThrow(() -> new RuntimeException("Room not found"));
        if(!ownerId.equals(room.getOwner().getId())) throw new RuntimeException("Not allow to access this room");

        return roomMapper.toRoomResponse(room);
    }

    public RoomResponse createRoom(RoomInputRequest roomInputRequest, UserEntity owner) {
        RoomEntity newRoom = RoomEntity.builder()
            .name(roomInputRequest.getName())
            .allowMembersEmail(roomInputRequest.getAllowMembersEmail())
            .owner(owner)
            .build();
        
        newRoom = roomRepository.save(newRoom);
        
        return roomMapper.toRoomResponse(newRoom);
    }

}

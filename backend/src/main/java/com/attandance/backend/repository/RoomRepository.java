package com.attandance.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.attandance.backend.entity.Room.RoomEntity;

public interface RoomRepository extends JpaRepository<RoomEntity, Long> {
    List<RoomEntity> findRoomByOwnerId(Long id);
}

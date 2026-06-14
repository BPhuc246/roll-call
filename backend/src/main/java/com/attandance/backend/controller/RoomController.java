package com.attandance.backend.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.attandance.backend.dto.ApiResponse;
import com.attandance.backend.dto.request.QrRequest.JoinRoomRequest;
import com.attandance.backend.dto.request.Room.RoomInputRequest;
import com.attandance.backend.dto.response.Room.RoomResponse;
import com.attandance.backend.entity.User.UserEntity;
import com.attandance.backend.repository.UserRepository;
import com.attandance.backend.service.RoomService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/room")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoomController {

    RoomService roomService;
    UserRepository userRepository;

        @PostMapping("/create")
        public ApiResponse<RoomResponse> createRoom(@RequestBody RoomInputRequest roomInputRequest, Authentication authentication) {
            String email = authentication.getName(); 
            UserEntity owner = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            var result = roomService.createRoom(roomInputRequest, owner);
            return ApiResponse.<RoomResponse>builder().result(result).build();
        }

    @GetMapping
    public ApiResponse<List<RoomResponse>> getMyRooms(Authentication authentication) {
        String email = authentication.getName();
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        var result = roomService.getMyRooms(user.getId());
        return ApiResponse.<List<RoomResponse>>builder().result(result).build();
    }
    
    @GetMapping("/detail")
    public ApiResponse<RoomResponse> getMyRooms(@RequestParam Long roomId, Authentication authentication) {
        String email = authentication.getName();
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        var result = roomService.getMyDetailRoom(roomId, user.getId());
        return ApiResponse.<RoomResponse>builder().result(result).build();
    }

    @PostMapping("join")
    public ApiResponse<RoomResponse> joinRoom(@RequestBody JoinRoomRequest request) {
        var result = roomService.joinRoom(request);
        return ApiResponse.<RoomResponse>builder().result(result).build();
    }
    

}

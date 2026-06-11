package com.attandance.backend.mapper;

import org.springframework.stereotype.Component;

import com.attandance.backend.dto.response.UserResponse.UserResponse;
import com.attandance.backend.entity.User.UserEntity;

@Component
public class UserMapper {
    public UserResponse toUserRespons(UserEntity userEntity) {
        return UserResponse.builder()
            .id(userEntity.getId())
            .username(userEntity.getUsername())
            .email(userEntity.getEmail())
            .avatar(userEntity.getAvatar())
            .build();
    }
}

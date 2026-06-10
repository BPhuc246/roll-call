package com.attandance.backend.service;

import org.springframework.stereotype.Service;

import com.attandance.backend.dto.response.UserResponse.UserResponse;
import com.attandance.backend.exception.AppException;
import com.attandance.backend.exception.ErrorCode;
import com.attandance.backend.repository.UserRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserService {

    UserRepository userRepository;

    public UserResponse getUsers(String email) {
        return this.userRepository.findByEmail(email)
            .map(user -> UserResponse.builder()
                    .id(user.getId())
                    .username(user.getUsername())
                    .email(user.getEmail())
                    .avatar(user.getAvatar())
                    .build())
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

    }

}

package com.attandance.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.attandance.backend.dto.response.UserResponse.UserResponse;
import com.attandance.backend.service.UserService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;


@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {
    

    UserService userService;
    
    @GetMapping("")
    public List<UserResponse> getAllUsers() {
        return this.userService.getUsers();
    }
}

package com.attandance.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.attandance.backend.entity.InvalidToken;

public interface InvalidTokenRepository extends JpaRepository<InvalidToken, String> {

}

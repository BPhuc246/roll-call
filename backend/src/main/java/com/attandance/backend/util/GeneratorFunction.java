package com.attandance.backend.util;

import java.security.SecureRandom;
import java.util.UUID;

import org.springframework.stereotype.Component;

import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;


@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Component
public class GeneratorFunction {

    private static final SecureRandom random = new SecureRandom();
    
    public String generateToken() {
        return UUID.randomUUID().toString().replace("-", "");
    }

    public String generateEightDigitCode() {
        int number = random.nextInt(90_000_000) + 10_000_000; 
        return String.valueOf(number);
    }
}

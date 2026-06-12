package com.attandance.backend.service;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.attandance.backend.dto.request.AuthRequest.LoginRequest;
import com.attandance.backend.dto.request.AuthRequest.LogoutRequest;
import com.attandance.backend.dto.request.AuthRequest.RegisterRequest;
import com.attandance.backend.dto.response.AuthResponse.AuthResponse;
import com.attandance.backend.entity.InvalidToken;
import com.attandance.backend.entity.User.UserEntity;
import com.attandance.backend.exception.AppException;
import com.attandance.backend.exception.ErrorCode;
import com.attandance.backend.repository.InvalidTokenRepository;
import com.attandance.backend.repository.UserRepository;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSObject;
import com.nimbusds.jose.JWSVerifier;
import com.nimbusds.jose.Payload;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;

import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthService {

    UserRepository userRepository;
    PasswordEncoder passwordEncoder;
    InvalidTokenRepository invalidTokenRepository;

    @NonFinal
    @Value("${jwt.refreshKey}")
    protected String SPRING_SECRET_REFRESH_KEY;
    
    @NonFinal
    @Value("${jwt.accessKey}")
    protected String SPRING_SECRET_ACCESS_KEY;

    @NonFinal
    @Value("${jwt.durationRefresh}")
    protected String DURATION_TIME_REFRESH;

    @NonFinal
    @Value("${jwt.durationAccess}")
    protected String DURATION_TIME_ACCESS;


    @NonFinal
    @Value("${jwt.chronoRefresh}")
    protected String CHRONO_REFRESH;

    @NonFinal
    @Value("${jwt.chronoAccess}")
    protected String CHRONO_ACCESS;

    public AuthResponse register(RegisterRequest data) {

        if (
            data.getUsername().isBlank() ||
            data.getEmail().isBlank() ||
            data.getPassword().isBlank()
        ) throw new AppException(ErrorCode.INVALID_INPUT);
        else if (
            data.getUsername().length() < 4 ||
            data.getUsername().length() > 20
        ) throw  new AppException(ErrorCode.INVALID_USERNAME);
        else if (
            !data.getEmail().endsWith("@gmail.com")
        ) throw new AppException(ErrorCode.INVALID_EMAIL);
        else if (
            data.getPassword().length() < 6
        )  throw new AppException(ErrorCode.INVALID_PASSWORD);

        // Check duplicate username
        if (this.userRepository.existsByUsername(data.getUsername())) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        // Check duplicate email
        if (userRepository.existsByEmail(data.getEmail())) {
            throw new AppException(ErrorCode.EMAIL_EXISTED);
        }

        String hashedPassword = passwordEncoder.encode(data.getPassword());


        UserEntity newUser = UserEntity.builder()
                                    .username(data.getUsername())
                                    .email(data.getEmail())
                                    .password(hashedPassword).build();

        this.userRepository.save(newUser);

         var accessToken = generateToken(
            newUser,
            SPRING_SECRET_ACCESS_KEY,
            Long.parseLong(DURATION_TIME_ACCESS),
            ChronoUnit.valueOf(CHRONO_ACCESS)
        );

        var refreshToken = generateToken(
            newUser,
            SPRING_SECRET_REFRESH_KEY,
            Long.parseLong(DURATION_TIME_REFRESH),
            ChronoUnit.valueOf(CHRONO_REFRESH)
        );

        return AuthResponse.builder().accessToken(accessToken).refreshToken(refreshToken).authenticated(true).build();
    }

    public AuthResponse login(LoginRequest data) {
        if (
            data.getEmail().isBlank() ||
            data.getPassword().isBlank()
        ) throw new AppException(ErrorCode.INVALID_INPUT);
        else if (
            !data.getEmail().endsWith("@gmail.com") &&
            !data.getEmail().endsWith("@gm.uit.edu.vn")
        ) throw new AppException(ErrorCode.INVALID_EMAIL);
        else if (
            data.getPassword().length() < 6
        ) throw new RuntimeException("Password must be at least 6 characters");

        UserEntity existingUser = userRepository.findByEmail(data.getEmail()).orElseThrow(() -> new RuntimeException("User not found"));

        if(existingUser == null) throw new AppException((ErrorCode.EMAIL_NOTFOUND));

        boolean authenticated = passwordEncoder.matches(
            data.getPassword(),
            existingUser.getPassword()
        );
        if (!authenticated) throw new AppException(ErrorCode.UNAUTHENTICATED);

        var accessToken = generateToken(
            existingUser,
            SPRING_SECRET_ACCESS_KEY,
            Long.parseLong(DURATION_TIME_ACCESS),
            ChronoUnit.valueOf(CHRONO_ACCESS)
        );

        var refreshToken = generateToken(
            existingUser,
            SPRING_SECRET_REFRESH_KEY,
            Long.parseLong(DURATION_TIME_REFRESH),
            ChronoUnit.valueOf(CHRONO_REFRESH)
        );

        return AuthResponse.builder().accessToken(accessToken).refreshToken(refreshToken).authenticated(authenticated).build();
    }

    public void logout(LogoutRequest request) throws ParseException, JOSEException {
        if (request.getAccessToken() == null || request.getAccessToken().isBlank())
            throw new AppException(ErrorCode.INVALID_INPUT);

        SignedJWT signedJWT = verifyToken(request.getAccessToken(), SPRING_SECRET_ACCESS_KEY);

        String jwtId = signedJWT.getJWTClaimsSet().getJWTID();
        Date expiryTime = signedJWT.getJWTClaimsSet().getExpirationTime();

        InvalidToken invalidated = InvalidToken.builder()
            .jwtId(jwtId).expiryTime(expiryTime).build();

        invalidTokenRepository.save(invalidated);
    }

    private SignedJWT verifyToken(String token, String secretKey) throws JOSEException, ParseException {
        JWSVerifier jwsVerifier = new MACVerifier(secretKey.getBytes());

        SignedJWT signedJWT = SignedJWT.parse(token);

        Date expiredDate = signedJWT.getJWTClaimsSet().getExpirationTime();

        var verified = signedJWT.verify(jwsVerifier);

        if (!verified || expiredDate.before(new Date()))
            throw new AppException(ErrorCode.UNAUTHENTICATED);

        return signedJWT;
    }

    private String generateToken(UserEntity userEntity, String secretKey, Long duration, ChronoUnit unit) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS256);

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
            .subject(userEntity.getEmail())
            .claim("email", userEntity.getEmail())
            .issuer("roll-call.com")
            .issueTime(new Date())
            .expirationTime(new Date(
                    Instant.now().plus(duration, unit).toEpochMilli()))
            .jwtID(UUID.randomUUID().toString())
            .claim("scope", "ROLE_" + userEntity.getRole().name())
            .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());
        JWSObject jwsObject = new JWSObject(header, payload);

        try {
            jwsObject.sign(new MACSigner(secretKey.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            log.error("Cannot create token", e);
            throw new RuntimeException(e);
        }
    }

    private JWTClaimsSet getClaims(String token, String secretKey) {
        try {
            SignedJWT signedJWT = SignedJWT.parse(token);
            JWSVerifier verifier = new MACVerifier(secretKey.getBytes());

            if (!signedJWT.verify(verifier))
                throw new AppException(ErrorCode.UNAUTHENTICATED);

            return signedJWT.getJWTClaimsSet();
        } catch (ParseException | JOSEException e) {
            log.warn("Failed to parse/verify token: {}", e.getMessage());
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
    }

    public String extractUsername(String accessToken) {
        return getClaims(accessToken, SPRING_SECRET_ACCESS_KEY).getSubject();
    }

    public List<String> extractAuthorities(String accessToken) {
        try {
            String scope = getClaims(accessToken, SPRING_SECRET_ACCESS_KEY)
                    .getStringClaim("scope");
            if (scope == null || scope.isBlank()) return List.of();
            return List.of(scope.split(" "));
        } catch (ParseException e) {
            return List.of();
        }
    }

    public Date extractExpiry(String accessToken) {
        return getClaims(accessToken, SPRING_SECRET_ACCESS_KEY).getExpirationTime();
    }

    public String extractJwtId(String accessToken) {
        return getClaims(accessToken, SPRING_SECRET_ACCESS_KEY).getJWTID();
    }

    public boolean isAccessTokenValid(String token) {
        try {
            JWTClaimsSet claims = getClaims(token, SPRING_SECRET_ACCESS_KEY);
            return claims.getExpirationTime() != null
                    && claims.getExpirationTime().after(new Date());
        } catch (AppException e) {
            return false;
        }
    }

    public boolean isRefreshTokenValid(String token) {
        try {
            JWTClaimsSet claims = getClaims(token, SPRING_SECRET_REFRESH_KEY);
            return claims.getExpirationTime() != null
                    && claims.getExpirationTime().after(new Date());
        } catch (AppException e) {
            return false;
        }
    }


    public String extractUsernameFromRefreshToken(String refreshToken) {
        return getClaims(refreshToken, SPRING_SECRET_REFRESH_KEY).getSubject();
    }

    public AuthResponse refreshToken(String refreshToken) {
        if (refreshToken == null || refreshToken.isBlank())
            throw new AppException(ErrorCode.UNAUTHENTICATED);

        if (!isRefreshTokenValid(refreshToken))
            throw new AppException(ErrorCode.UNAUTHENTICATED);

        String email = extractUsernameFromRefreshToken(refreshToken);

        UserEntity existingUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.UNAUTHENTICATED));

        var newAccessToken = generateToken(
            existingUser,
            SPRING_SECRET_ACCESS_KEY,
            Long.parseLong(DURATION_TIME_ACCESS),
            ChronoUnit.valueOf(CHRONO_ACCESS)
        );

        var newRefreshToken = generateToken(
            existingUser,
            SPRING_SECRET_REFRESH_KEY,
            Long.parseLong(DURATION_TIME_REFRESH),
            ChronoUnit.valueOf(CHRONO_REFRESH)
        );

        return AuthResponse.builder()
                .accessToken(newAccessToken)
                .refreshToken(newRefreshToken)
                .authenticated(true)
                .build();
    }
}

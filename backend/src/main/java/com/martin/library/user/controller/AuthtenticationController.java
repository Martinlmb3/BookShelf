package com.martin.library.user.controller;

import com.martin.library.user.dto.VerifyUserDto;
import com.martin.library.user.dto.request.LoginUserDto;
import com.martin.library.user.dto.request.RegisterUserDto;
import com.martin.library.user.model.User;
import com.martin.library.user.responses.LoginResponse;
import com.martin.library.user.service.AuthenticationService;
import com.martin.library.user.service.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/auth")
@RestController
public class AuthtenticationController {
    private final JwtService jwtService;
    private final AuthenticationService authenticationService;

    public AuthtenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    /**
     * Registers a new user account.
     *
     * <p>
     * Creates the user (disabled until email is verified), sends a 6-digit
     * verification code to their email, and returns a short-lived opaque token
     * stored in Redis. The token is used in place of the email on the verify
     * endpoint so the email is never exposed in the URL.
     *
     * @param req the signup payload containing {@code username}, {@code email}, and
     *            {@code password}
     * @return {@code 200} with {@code { "verificationToken": "<uuid>" }}
     */
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest req) {
        userService.createUser(req);

        // Generate opaque token, store mapping in Redis or DB
        String token = UUID.randomUUID().toString();
        redisTemplate.opsForValue().set(
                "verify:token:" + token,
                req.getEmail(),
                Duration.ofMinutes(10));

        return ResponseEntity.ok(Map.of("verificationToken", token));
    }

    /**
     * Authenticates a user and returns a JWT.
     *
     * <p>
     * Validates the credentials against the database. The account must have
     * been verified before login is permitted. On success, returns a signed
     * HS256 JWT and its expiry duration in milliseconds.
     *
     * @param loginUserDto the login payload containing {@code email} and
     *                     {@code password}
     * @return {@code 200} with {@link LoginResponse} containing the token and
     *         expiry,
     *         or {@code 401} if credentials are invalid or the account is not
     *         verified
     */
    @PostMapping("/login")
    public ResponseEntity<Void> authenticate(
            @RequestBody LoginUserDto loginUserDto,
            HttpServletResponse response) {
        User authenticatedUser;

        try {
            authenticatedUser = authenticationService.authenticate(loginUserDto);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }
        String jwtToken = jwtService.generateToken(authenticatedUser);

        ResponseCookie cookie = ResponseCookie.from("token", jwtToken)
                .httpOnly(true)
                .secure(false)
                .sameSite("Lax")
                .path("/")
                .maxAge(Duration.ofMillis(jwtService.getExpirationTime()))
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return ResponseEntity.ok().build();
    }

    /**
     * Verifies a user's email address using an opaque token and a 6-digit code.
     *
     * <p>
     * Looks up the email mapped to the given token in Redis. If the token has
     * expired or does not exist, returns {@code 400}. On success, enables the
     * account and deletes the token from Redis so it cannot be reused.
     *
     * @param req the verify payload containing {@code token} (opaque UUID) and
     *            {@code code} (6-digit string)
     * @return {@code 200} on success, {@code 400} if the token is expired or
     *         invalid
     */
    @PostMapping("/verify")
    public ResponseEntity<?> verify(@RequestBody VerifyRequest req) {
        String key = "verify:token:" + req.getToken();
        String email = (String) redisTemplate.opsForValue().get(key);

        if (email == null)
            return ResponseEntity.status(400).body("Token expired");

        verificationService.verify(email, req.getCode());
        redisTemplate.delete(key);

        return ResponseEntity.ok().build();
    }

    /**
     * Resends the email verification code to the given address.
     *
     * <p>
     * Generates a new 6-digit code, updates the stored code for the account,
     * and sends a fresh email. The account must exist and must not already be
     * verified. Intended for users who did not receive or lost their original code.
     *
     * @param email the email address to resend the code to (passed as a query
     *              param)
     * @return {@code 200} with a confirmation message, or {@code 400} if the
     *         account does not exist or is already verified
     */
    @PostMapping("/resend")
    public ResponseEntity<?> resendVerificationCode(@RequestParam String email) {
        try {
            authenticationService.resendVerificationCode(email);
            return ResponseEntity.ok("Verification code sent");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from("token", "")
                .httpOnly(true)
                .path("/")
                .maxAge(0)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return ResponseEntity.ok().build();
    }
}

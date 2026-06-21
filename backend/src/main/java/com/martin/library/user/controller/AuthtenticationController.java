package com.martin.library.user.controller;

import com.martin.library.user.dto.VerifyUserDto;
import com.martin.library.user.dto.request.LoginUserDto;
import com.martin.library.user.dto.request.RegisterUserDto;
import com.martin.library.user.model.User;
import com.martin.library.user.service.AuthenticationService;
import com.martin.library.user.service.JwtService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.time.Duration;

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
     * Creates the user (disabled until email is verified) and sends a 6-digit
     * verification code to their email.
     *
     * @param input the signup payload containing firstName, lastName, email, and password
     * @return 200 on success
     */
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody RegisterUserDto input) {
        authenticationService.signup(input);
        return ResponseEntity.ok().build();
    }

    /**
     * Authenticates a user and sets an HttpOnly JWT cookie.
     *
     * @param loginUserDto the login payload containing email and password
     * @param response     used to attach the Set-Cookie header
     * @return 200 on success, 401 if credentials are invalid or account is unverified
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
     * Verifies a user's email address using the 6-digit code sent at signup.
     *
     * @param input the verify payload containing email and verificationCode
     * @return 200 on success, 400 if the code is invalid or expired
     */
    @PostMapping("/verify")
    public ResponseEntity<?> verify(@RequestBody VerifyUserDto input) {
        try {
            authenticationService.verifyUser(input);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * Resends the email verification code.
     *
     * @param email the email address to resend the code to
     * @return 200 with confirmation message, 400 if not found or already verified
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

    /**
     * Logs out the current user by clearing the JWT cookie.
     *
     * @param response used to attach the cleared Set-Cookie header
     * @return 200
     */
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

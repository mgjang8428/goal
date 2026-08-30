package com.haloomin.goal.api.v1.user.info;

import com.haloomin.goal.api.v1.user.info.dto.request.SignUpRequestDto;
import com.haloomin.goal.api.v1.user.info.dto.request.DeleteUserRequestDto;
import com.haloomin.goal.api.v1.user.info.dto.request.UpdateMyInfoRequestDto;
import com.haloomin.goal.api.v1.user.info.dto.response.MyInfoResponseDto;
import com.haloomin.goal.global.dto.ResponseDto;
import com.haloomin.goal.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@Validated
@RequestMapping("/api/v1/user")
@RestController
public class UserController implements UserControllerDocs {

    private final UserService userService;

    @PostMapping
    @Override
    public ResponseEntity<ResponseDto<Void>> signUp(SignUpRequestDto requestDto) {
        userService.signUp(requestDto);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(ResponseDto.success(null));
    }

    @GetMapping
    @Override
    public ResponseEntity<ResponseDto<MyInfoResponseDto>> getMyInfo(UserDetails userDetails) {
        return null;
    }

    @PatchMapping
    @Override
    public ResponseEntity<ResponseDto<Void>> updateMyInfo(UserDetails userDetails, UpdateMyInfoRequestDto requestDto) {
        return null;
    }

    @DeleteMapping
    @Override
    public ResponseEntity<ResponseDto<Void>> deleteUser(UserDetails userDetails, DeleteUserRequestDto requestDto) {
        return null;
    }
}

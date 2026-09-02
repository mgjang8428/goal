package com.haloomin.goal.api.v1.user.info;

import com.haloomin.goal.api.v1.user.info.dto.request.DeleteUserRequestDto;
import com.haloomin.goal.api.v1.user.info.dto.request.SignUpRequestDto;
import com.haloomin.goal.api.v1.user.info.dto.request.UpdateMyInfoRequestDto;
import com.haloomin.goal.api.v1.user.info.dto.response.MyInfoResponseDto;
import com.haloomin.goal.global.response.dto.ResponseDto;
import com.haloomin.goal.global.response.util.ResponseUtil;
import com.haloomin.goal.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@Validated
@RequestMapping("/api/v1/user")
@RestController
public class UserController implements UserControllerDocs {

    private final UserService userService;

    private final ResponseUtil responseUtil;

    @PostMapping
    @Override
    public ResponseEntity<ResponseDto<Void>> signUp(
            @Valid @RequestBody SignUpRequestDto requestDto
    ) {
        userService.signUp(requestDto);
        return responseUtil.okResponse();
    }

    @GetMapping
    @Override
    public ResponseEntity<ResponseDto<MyInfoResponseDto>> getMyInfo(
            @AuthenticationPrincipal String username
    ) {
        MyInfoResponseDto responseDto = userService.getMyInfo(username);
        return responseUtil.okResponse(responseDto);
    }

    @PatchMapping
    @Override
    public ResponseEntity<ResponseDto<Void>> updateMyInfo(
            @AuthenticationPrincipal String username,
            @Valid @RequestBody UpdateMyInfoRequestDto requestDto
    ) {
        userService.updateMyInfo(username, requestDto);
        return responseUtil.okResponse();
    }

    @DeleteMapping
    @Override
    public ResponseEntity<ResponseDto<Void>> deleteUser(
            @AuthenticationPrincipal String username,
            @Valid @RequestBody DeleteUserRequestDto requestDto
    ) {
        userService.deleteUser(username, requestDto);
        return responseUtil.okResponse();
    }
}

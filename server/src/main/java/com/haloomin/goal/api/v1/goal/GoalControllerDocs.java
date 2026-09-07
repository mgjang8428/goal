package com.haloomin.goal.api.v1.goal;

import com.haloomin.goal.global.response.dto.ResponseDto;
import com.haloomin.goal.goal.dto.request.CreateGoalRequestDto;
import com.haloomin.goal.goal.dto.request.UpdateGoalRequestDto;
import com.haloomin.goal.goal.dto.response.GetGoalDetailResponseDto;
import com.haloomin.goal.goal.dto.response.GetGoalListResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@SuppressWarnings("unused")
@Validated
@Tag(name = "목표 API")
public interface GoalControllerDocs {

    @Operation(
            summary = "목표 생성",
            description = "목표 생성",
            method = "POST"
    )
    ResponseEntity<ResponseDto<Void>> create(
            @AuthenticationPrincipal String username,
            @Valid @RequestBody CreateGoalRequestDto requestDto
    );

    @Operation(
            summary = "생성된 목표 리스트",
            description = "생성된 목표 리스트(유저 본인 생성)",
            method = "GET"
    )
    ResponseEntity<ResponseDto<List<GetGoalListResponseDto>>> getGoalList(
            @AuthenticationPrincipal String username
    );

    @Operation(
            summary = "목표 상세 정보",
            description = "목표 상세 정보(유저 본인 생성)",
            method = "GET"
    )
    ResponseEntity<ResponseDto<GetGoalDetailResponseDto>> getGoalDetail(
            @AuthenticationPrincipal String username,
            @PathVariable Long goalId
    );

    @Operation(
            summary = "목표 업데이트",
            description = "목표 내용 변경",
            method = "PATCH"
    )
    ResponseEntity<ResponseDto<Void>> updateGoal(
            @AuthenticationPrincipal String username,
            @PathVariable Long goalId,
            @Valid @RequestBody UpdateGoalRequestDto requestDto
    );

    @Operation(
            summary = "목표 삭제",
            description = "목표 삭제",
            method = "DELETE"
    )
    ResponseEntity<ResponseDto<Void>> deleteGoal(
            @AuthenticationPrincipal String username,
            @PathVariable Long goalId
    );
}

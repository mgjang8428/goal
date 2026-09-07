package com.haloomin.goal.api.v1.goal;

import com.haloomin.goal.global.response.dto.ResponseDto;
import com.haloomin.goal.global.response.util.ResponseUtil;
import com.haloomin.goal.goal.dto.request.CreateGoalRequestDto;
import com.haloomin.goal.goal.dto.request.UpdateGoalRequestDto;
import com.haloomin.goal.goal.dto.response.GetGoalDetailResponseDto;
import com.haloomin.goal.goal.dto.response.GetGoalListResponseDto;
import com.haloomin.goal.goal.service.GoalService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/v1/goal")
@RestController
public class GoalController implements GoalControllerDocs {

    private final GoalService goalService;

    private final ResponseUtil responseUtil;

    @Override
    @PostMapping
    public ResponseEntity<ResponseDto<Void>> create(
            @AuthenticationPrincipal String username,
            @Valid @RequestBody CreateGoalRequestDto requestDto
    ) {
        goalService.create(username, requestDto);
        return responseUtil.okResponse();
    }

    @Override
    @GetMapping
    public ResponseEntity<ResponseDto<List<GetGoalListResponseDto>>> getGoalList(
            @AuthenticationPrincipal String username
    ) {
        List<GetGoalListResponseDto> goalListDto = goalService.getGoalList(username);
        return responseUtil.okResponse(goalListDto);
    }

    @Override
    @GetMapping("/{goalId}")
    public ResponseEntity<ResponseDto<GetGoalDetailResponseDto>> getGoalDetail(
            @AuthenticationPrincipal String username,
            @PathVariable Long goalId
    ) {
        GetGoalDetailResponseDto goalDetailDto = goalService.getGoalDetail(username, goalId);
        return responseUtil.okResponse(goalDetailDto);
    }

    @Override
    @PatchMapping("/{goalId}")
    public ResponseEntity<ResponseDto<Void>> updateGoal(
            @AuthenticationPrincipal String username,
            @PathVariable Long goalId,
            @Valid @RequestBody UpdateGoalRequestDto requestDto
    ) {
        goalService.updateGoal(username, goalId, requestDto);
        return responseUtil.okResponse();
    }

    @Override
    @DeleteMapping("{goalId}")
    public ResponseEntity<ResponseDto<Void>> deleteGoal(
            @AuthenticationPrincipal String username,
            @PathVariable Long goalId
    ) {
        goalService.deleteGoal(username, goalId);
        return responseUtil.okResponse();
    }
}

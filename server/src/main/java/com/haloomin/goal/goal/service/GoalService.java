package com.haloomin.goal.goal.service;

import com.haloomin.goal.goal.dto.request.CreateGoalRequestDto;
import com.haloomin.goal.goal.dto.request.UpdateGoalRequestDto;
import com.haloomin.goal.goal.dto.response.GetGoalDetailResponseDto;
import com.haloomin.goal.goal.dto.response.GetGoalListResponseDto;

import java.util.List;

public interface GoalService {

    void create(String username, CreateGoalRequestDto requestDto);

    List<GetGoalListResponseDto> getGoalList(String username);

    GetGoalDetailResponseDto getGoalDetail(String username, Long goalId);

    void updateGoal(String username, Long goalId, UpdateGoalRequestDto requestDto);

    void deleteGoal(String username, Long goalId);
}

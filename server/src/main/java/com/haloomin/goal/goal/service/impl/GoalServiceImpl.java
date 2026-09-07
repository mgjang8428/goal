package com.haloomin.goal.goal.service.impl;

import com.haloomin.goal.goal.dto.request.CreateGoalRequestDto;
import com.haloomin.goal.goal.dto.request.UpdateGoalRequestDto;
import com.haloomin.goal.goal.dto.response.GetGoalDetailResponseDto;
import com.haloomin.goal.goal.dto.response.GetGoalListResponseDto;
import com.haloomin.goal.goal.entity.Goal;
import com.haloomin.goal.goal.exception.AccessDeniedException;
import com.haloomin.goal.goal.exception.AlreadyDeletedException;
import com.haloomin.goal.goal.exception.NotFoundGoalException;
import com.haloomin.goal.goal.repository.GoalJpaRepository;
import com.haloomin.goal.goal.service.GoalService;
import com.haloomin.goal.user.entity.UserAuth;
import com.haloomin.goal.user.entity.UserEntity;
import com.haloomin.goal.user.exception.NotFoundUsernameException;
import com.haloomin.goal.user.repository.UserAuthJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class GoalServiceImpl implements GoalService {

    private final GoalJpaRepository goalJpaRepository;
    private final UserAuthJpaRepository userAuthJpaRepository;

    @Override
    @Transactional
    public void create(String username, CreateGoalRequestDto requestDto) {
        UserAuth userAuth = userAuthJpaRepository.findByUsernameAndDeletedAtIsNull(username)
                .orElseThrow(NotFoundUsernameException::new);
        Goal goal = Goal.builder()
                .title(requestDto.title())
                .content(requestDto.content())
                .userEntity(userAuth.getUserEntity())
                .build();
        goalJpaRepository.save(goal);
    }

    @Override
    public List<GetGoalListResponseDto> getGoalList(String username) {
        UserAuth userAuth = userAuthJpaRepository.findByUsernameAndDeletedAtIsNull(username)
                .orElseThrow(NotFoundUsernameException::new);
        UserEntity userEntity = userAuth.getUserEntity();
        List<Goal> goals = goalJpaRepository.findByUserEntityAndDeletedAtIsNull(userEntity);
        List<GetGoalListResponseDto> result = new ArrayList<>();
        for (Goal goal : goals) {
            GetGoalListResponseDto getGoalListResponseDto = new GetGoalListResponseDto(
                    goal.getId(),
                    goal.getTitle()
            );
            result.add(getGoalListResponseDto);
        }
        return result;
    }

    @Override
    public GetGoalDetailResponseDto getGoalDetail(String username, Long goalId) {
        UserAuth userAuth = userAuthJpaRepository.findByUsername(username)
                .orElseThrow(NotFoundUsernameException::new);
        Goal goal = goalJpaRepository.findById(goalId)
                .orElseThrow(NotFoundGoalException::new);
        // 삭제 여부 확인
        if (!(goal.getDeletedAt() == null)) {
            throw new AlreadyDeletedException();
        }

        // 사용자 소유 여부 확인
        if (!goal.getUserEntity().equals(userAuth.getUserEntity())) {
            throw new AccessDeniedException();
        }

        return new GetGoalDetailResponseDto(
                goal.getId(),
                goal.getTitle(),
                goal.getContent(),
                goal.getCreatedAt(),
                goal.getUpdatedAt()
        );
    }

    @Override
    @Transactional
    public void updateGoal(String username, Long goalId, UpdateGoalRequestDto requestDto) {
        Goal goal = goalJpaRepository.findById(goalId)
                .orElseThrow(NotFoundGoalException::new);
        UserAuth userAuth = userAuthJpaRepository.findByUsername(username)
                .orElseThrow(NotFoundUsernameException::new);
        // 수정 권한 확인 (생성자만 가능)
        if (!goal.getUserEntity().equals(userAuth.getUserEntity())) {
            throw new AccessDeniedException();
        }
        goal.updateTitle(requestDto.title());
        goal.updateContent(requestDto.content());
    }

    @Override
    @Transactional
    public void deleteGoal(String username, Long goalId) {
        Goal goal = goalJpaRepository.findById(goalId)
                .orElseThrow(NotFoundGoalException::new);
        UserAuth userAuth = userAuthJpaRepository.findByUsername(username)
                .orElseThrow(NotFoundUsernameException::new);
        // 삭제 권한 확인 (생성자만 가능)
        if (!goal.getUserEntity().equals(userAuth.getUserEntity())) {
            throw new AccessDeniedException();
        }
        goal.softDelete();
    }
}

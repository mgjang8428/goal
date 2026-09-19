package com.haloomin.goal.goal.service.impl;

import com.haloomin.goal.goal.dto.request.CreateGoalRequestDto;
import com.haloomin.goal.goal.dto.request.RepeatInfoRequestDto;
import com.haloomin.goal.goal.dto.request.UpdateGoalRequestDto;
import com.haloomin.goal.goal.dto.response.GetGoalDetailResponseDto;
import com.haloomin.goal.goal.dto.response.GetGoalListResponseDto;
import com.haloomin.goal.goal.dto.response.RepeatInfoResponseDto;
import com.haloomin.goal.goal.entity.Goal;
import com.haloomin.goal.goal.entity.GoalRepeatInfo;
import com.haloomin.goal.goal.exception.AccessDeniedException;
import com.haloomin.goal.goal.exception.AlreadyDeletedException;
import com.haloomin.goal.goal.exception.NotFoundGoalException;
import com.haloomin.goal.goal.repository.GoalJpaRepository;
import com.haloomin.goal.goal.repository.GoalRepeatInfoJpaRepository;
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
    private final GoalRepeatInfoJpaRepository goalRepeatInfoJpaRepository;
    private final UserAuthJpaRepository userAuthJpaRepository;

    @Override
    @Transactional
    public void create(String username, CreateGoalRequestDto requestDto) {
        UserAuth userAuth = userAuthJpaRepository.findByUsernameAndDeletedAtIsNull(username)
                .orElseThrow(NotFoundUsernameException::new);
        Goal goal = Goal.builder()
                .title(requestDto.title())
                .content(requestDto.content())
                .isActive(requestDto.isActive())
                .userEntity(userAuth.getUserEntity())
                .startDate(requestDto.startDate())
                .endDate(requestDto.endDate())
                .repeatType(requestDto.repeatType())
                .build();

        List<GoalRepeatInfo> goalRepeatInfoList = makeGoalRepeatInfoListByCereatGoalRequestDto(requestDto, goal);

        goalJpaRepository.save(goal);
        goalRepeatInfoJpaRepository.saveAll(goalRepeatInfoList);
    }

    private List<GoalRepeatInfo> makeGoalRepeatInfoListByCereatGoalRequestDto(
            CreateGoalRequestDto requestDto,
            Goal goal
    ) {
        List<GoalRepeatInfo> resultList = new ArrayList<>();
        for (RepeatInfoRequestDto repeatInfo : requestDto.repeatInfo()) {
            GoalRepeatInfo goalRepeatInfo = GoalRepeatInfo.builder()
                    .goal(goal)
                    .weekRepeatType(repeatInfo.weekRepeatType())
                    .monthRepeatNum(repeatInfo.monthRepeatNum())
                    .yearRepeatMonth(repeatInfo.yearRepeatMonth())
                    .yearRepeatDate(repeatInfo.yearRepeatDate())
                    .selectRepeat(repeatInfo.selectRepeat())
                    .build();
            resultList.add(goalRepeatInfo);
        }
        return resultList;
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
                    goal.getTitle(),
                    goal.getIsActive(),
                    goal.getRepeatType()
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

        // Repeat 정보 응답 리스트 생성
        List<RepeatInfoResponseDto> repeatInfoResponseDtos = new ArrayList<>();
        for (GoalRepeatInfo repeatInfo : goal.getGoalRepeatInfoList()) {
            repeatInfoResponseDtos.add(
                    new RepeatInfoResponseDto(
                            repeatInfo.getWeekRepeatType(),
                            repeatInfo.getMonthRepeatNum(),
                            repeatInfo.getYearRepeatMonth(),
                            repeatInfo.getYearRepeatDate(),
                            repeatInfo.getSelectRepeat()
                    )
            );
        }

        return new GetGoalDetailResponseDto(
                goal.getId(),
                goal.getTitle(),
                goal.getContent(),

                goal.getIsActive(),
                goal.getStartDateTime().toLocalDate(),
                goal.getEndDateTime().toLocalDate(),
                goal.getRepeatType(),
                repeatInfoResponseDtos,

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
        // 목표정보 업데이트
        goal.updateTitle(requestDto.title());
        goal.updateContent(requestDto.content());
        goal.updateIsActive(requestDto.isActive());
        goal.updateStartDateTime(requestDto.startDate());
        goal.updateEndDateTime(requestDto.endDate());
        goal.updateRepeatType(requestDto.repeatType());

        // 목표반복정보 재생성
        List<GoalRepeatInfo> deleteGoalRepeatInfoList = goalRepeatInfoJpaRepository.findByGoal(goal);
        goalRepeatInfoJpaRepository.deleteAll(deleteGoalRepeatInfoList);
        List<GoalRepeatInfo> goalRepeatInfoList = makeGoalRepeatInfoListByUpdateGoalRequestDto(requestDto, goal);
        goalRepeatInfoJpaRepository.saveAll(goalRepeatInfoList);
    }

    private List<GoalRepeatInfo> makeGoalRepeatInfoListByUpdateGoalRequestDto(
            UpdateGoalRequestDto requestDto,
            Goal goal
    ) {
        List<GoalRepeatInfo> resultList = new ArrayList<>();
        for (RepeatInfoRequestDto repeatInfo : requestDto.repeatInfo()) {
            GoalRepeatInfo goalRepeatInfo = GoalRepeatInfo.builder()
                    .goal(goal)
                    .weekRepeatType(repeatInfo.weekRepeatType())
                    .monthRepeatNum(repeatInfo.monthRepeatNum())
                    .yearRepeatMonth(repeatInfo.yearRepeatMonth())
                    .yearRepeatDate(repeatInfo.yearRepeatDate())
                    .selectRepeat(repeatInfo.selectRepeat())
                    .build();
            resultList.add(goalRepeatInfo);
        }
        return resultList;
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

        // 정보 삭제
        List<GoalRepeatInfo> goalRepeatInfos = goalRepeatInfoJpaRepository.findByGoal(goal);
        goalRepeatInfoJpaRepository.deleteAll(goalRepeatInfos);
        goalJpaRepository.deleteById(goalId);
    }
}

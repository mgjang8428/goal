package com.haloomin.goal.user.exception;

import com.haloomin.goal.user.dto.user.request.UpdateMyInfoRequestType;

public class IllegalUpdateTypeException extends RuntimeException {
    public IllegalUpdateTypeException(UpdateMyInfoRequestType updateType) {
        super(updateType.toString());
    }
}

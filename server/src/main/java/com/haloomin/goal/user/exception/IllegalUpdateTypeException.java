package com.haloomin.goal.user.exception;

import com.haloomin.goal.api.v1.user.info.dto.request.UpdateMyInfoRequestType;

public class IllegalUpdateTypeException extends RuntimeException {
    public IllegalUpdateTypeException(UpdateMyInfoRequestType updateType) {
        super(updateType.toString());
    }
}

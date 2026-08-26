import { asClass, createContainer, InjectionMode } from "awilix";

import AuthRepositoryImpl from "@/model/auth/repository/authRepository";
import AuthServiceImpl from "@/model/auth/service/authService";
import logger from "@/util/logger/logger";

const container = createContainer({
    injectionMode: InjectionMode.PROXY,
    strict: true
})

export const ContainerSet = {
    LOGGER: "logger",

    TEST_REPOSITORY: "testRepository",
    TEST_SERVICE: "testService",

    AUTH_REPOSITORY: "authRepository",
    AUTH_SERVICE: "authService",
} as const;

container.register({
    logger: asClass(logger).singleton(),

    authRepository: asClass(AuthRepositoryImpl).singleton(),
    authService: asClass(AuthServiceImpl).singleton()
})

export default container
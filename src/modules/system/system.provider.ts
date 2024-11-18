import { SYSTEM_CONFIGURATION_REPOSITORY } from "src/common/contants";
import { SystemConfiguration } from "./entities/configuration.entity";

export const SystemProvider = [{
  provide: SYSTEM_CONFIGURATION_REPOSITORY,
  useValue: SystemConfiguration
}]
import { validate } from '../middleware/validate.middleware';
import {
  CreateServiceDto,
  ServiceFilterDto,
  ServiceIdParamsDto,
  ServiceSlugParamsDto,
  UpdateServiceDto,
} from '../dto/service.dto';

export const validateCreateService = validate(CreateServiceDto);
export const validateUpdateService = validate(UpdateServiceDto);
export const validateServiceFilter = validate(ServiceFilterDto);
export const validateServiceIdParams = validate(ServiceIdParamsDto);
export const validateServiceSlugParams = validate(ServiceSlugParamsDto);

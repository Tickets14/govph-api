import { validate } from '../middleware/validate.middleware';
import { CreateRequirementDto, RequirementIdParamsDto, UpdateRequirementDto } from '../dto/requirement.dto';

export const validateCreateRequirement = validate(CreateRequirementDto);
export const validateUpdateRequirement = validate(UpdateRequirementDto);
export const validateRequirementIdParams = validate(RequirementIdParamsDto);

import { validate } from '../middleware/validate.middleware';
import { CreateStepDto, ReorderStepsDto, StepIdParamsDto, UpdateStepDto } from '../dto/step.dto';

export const validateCreateStep = validate(CreateStepDto);
export const validateUpdateStep = validate(UpdateStepDto);
export const validateReorderSteps = validate(ReorderStepsDto);
export const validateStepIdParams = validate(StepIdParamsDto);

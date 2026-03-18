import { validate } from '../middleware/validate.middleware';
import { CreateStepsDto, ReorderStepsDto, StepIdParamsDto, UpdateStepDto } from '../dto/step.dto';

export const validateCreateSteps = validate(CreateStepsDto);
export const validateUpdateStep = validate(UpdateStepDto);
export const validateReorderSteps = validate(ReorderStepsDto);
export const validateStepIdParams = validate(StepIdParamsDto);

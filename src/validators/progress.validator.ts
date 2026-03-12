import { validate } from '../middleware/validate.middleware';
import { ProgressServiceParamsDto, ToggleProgressDto } from '../dto/progress.dto';

export const validateProgressServiceParams = validate(ProgressServiceParamsDto);
export const validateToggleProgress = validate(ToggleProgressDto);

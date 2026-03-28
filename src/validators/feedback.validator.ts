import { validate } from '../middleware/validate.middleware';
import { FeedbackFilterDto, FeedbackIdParamsDto, CreateFeedbackDto, UpdateFeedbackDto } from '../dto/feedback.dto';

export const validateFeedbackFilter = validate(FeedbackFilterDto);
export const validateCreateFeedback = validate(CreateFeedbackDto);
export const validateUpdateFeedback = validate(UpdateFeedbackDto);
export const validateFeedbackIdParams = validate(FeedbackIdParamsDto);

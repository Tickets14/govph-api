import { validate } from '../middleware/validate.middleware';
import {
  AgencyFilterDto,
  AgencyIdParamsDto,
  AgencySlugParamsDto,
  CreateAgencyDto,
  UpdateAgencyDto,
} from '../dto/agency.dto';

export const validateAgencyFilter = validate(AgencyFilterDto);
export const validateCreateAgency = validate(CreateAgencyDto);
export const validateUpdateAgency = validate(UpdateAgencyDto);
export const validateAgencyIdParams = validate(AgencyIdParamsDto);
export const validateAgencySlugParams = validate(AgencySlugParamsDto);

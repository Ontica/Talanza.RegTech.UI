/**
 *
 * This is a barrel file used for easier access to inner components from consumer modules.
 * Please see the former Angular style guide recommendation (StyleGuide 04-10 - Barrels).
 * https://github.com/angular/angular.io/issues/1301
 *
 */

export { CoreService } from './core.service';

export { ApplicationSettingsService } from './general/application-settings.service';
export { HttpService } from './http/http.service';
export { LoggerService } from './general/logger.service';

export { PrincipalService } from './security/principal.service';
export { SecurityGuardService } from './security/security-guard.service';

export { SpinnerService, SpinnerState } from './spinner/spinner.service';

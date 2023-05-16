/* eslint-disable prettier/prettier */
import { createMock } from '@golevelup/ts-jest';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleGuard } from './role.guard';

describe('RolesGuard', () => {
  let guard: RoleGuard;
  let reflector: Reflector;

  beforeEach(async () => {
    reflector = new Reflector();
    guard = new RoleGuard(reflector);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('returninng false if user does not exist', () => {
    reflector.getAllAndOverride = jest.fn().mockReturnValue(true);
    const context = createMock<ExecutionContext>();
    const canActivate = guard.canActivate(context);
    expect(canActivate).toBe(false);
  });
  it('returning true if role does not exist', () => {
    reflector.getAllAndOverride = jest.fn().mockReturnValue(false);
    const context = createMock<ExecutionContext>();
    const canActivate = guard.canActivate(context);
    expect(canActivate).toBe(true);
  });

  it('should return false if role of context does not fit to role in reflector', () => {
    reflector.getAllAndOverride = jest.fn().mockReturnValue('user');
    const context = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => ({
          user: { },
        }),
      }),
    });

    const canActivate = guard.canActivate(context);
    expect(canActivate).toBe(false);
  });
  it('should return true if role of context  fits to role in reflector', () => {
    reflector.getAllAndOverride = jest.fn().mockReturnValue('user');
    const context = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => ({
          user: { role: 'user'},
        }),
      }),
    });

    const canActivate = guard.canActivate(context);
    expect(canActivate).toBe(true);
  });
  it('should return false if no role provided in context with demanded role in reflector', () => {
    reflector.getAllAndOverride = jest.fn().mockReturnValue('user');
    const context = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => ({
          user: { role: 'user'},
        }),
      }),
    });

    const canActivate = guard.canActivate(context);
    expect(canActivate).toBe(true);
  });
});

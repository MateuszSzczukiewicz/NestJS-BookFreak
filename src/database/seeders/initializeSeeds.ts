import * as process from 'node:process';

export const initializeSeeds = () => {
  const ACCEPT_ENVS: string[] = ['development', 'test'];
  const env: string = process.env.NODE_ENV;

  if (!ACCEPT_ENVS.includes(env)) {
    console.info(
      '[DANGER] CANNOT make a seed for \x1b[31m%s\x1b[0m [DANGER]',
      env,
    );
    console.info(
      'You need to exactly specify the \x1b[35NODE_ENV\x1b[0m as one of: \x1b[36m%s\x1b[0m!',
      ACCEPT_ENVS.join(' or '),
    );
    console.info(
      'Only the %s can perform seed! TO prevent .del() DB on any of production env',
      ACCEPT_ENVS,
    );
    process.exit(1);
  }
};

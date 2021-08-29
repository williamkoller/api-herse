type EnvironmentType = {
  nodeEnv: string;
  appUrl: string;
  port: number;
};

export const environments = (): EnvironmentType => {
  return {
    nodeEnv: process.env.NODE_ENV,
    appUrl: process.env.APP_URL,
    port: +process.env.PORT,
  };
};

type EnvironmentType = {
  nodeEnv: string;
  appUrl: string;
  port: number;
  secret: string;
};

export const environments = (): EnvironmentType => {
  return {
    nodeEnv: process.env.NODE_ENV,
    appUrl: process.env.APP_URL,
    port: +process.env.PORT,
    secret: process.env.JWT_SECRET,
  };
};

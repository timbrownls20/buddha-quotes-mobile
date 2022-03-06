interface IConfig {
  api: string;
  interval: number;
}

const config: IConfig = {
  api: 'http://palicanon.codebuckets.com.au/api',
  interval: 1000,
};

export default config;

export type RootStackParamList = {
  Main: undefined;
  CreateTask: undefined;
  VerifyTask: { task: {
    id: number;
    title: string;
    category: string;
    completed: boolean;
    time: string;
    xp: number;
    canVerify: boolean;
  }};
};

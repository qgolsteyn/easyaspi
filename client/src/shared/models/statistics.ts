export interface IStudentStatistic {
    numDailyAttempts: number;
    numDailyCorrectAnswers: number;
    totals: {
        [key: string]: {
            totalAttempts: number;
            totalCorrectAnswers: number;
        };
    };
}

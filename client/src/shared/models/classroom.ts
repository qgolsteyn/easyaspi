export interface IClassroom {
    name: string;
    passcode: string;
    problemsForToday: string[];
    onlineResources: string[];
    numDailyProblems: number;
}

export interface IClassroomWithId {
    _id: string;
    name: string;
    passcode: string;
    problemsForToday: string[];
    onlineResources: string[];
    numDailyProblems: number;
}

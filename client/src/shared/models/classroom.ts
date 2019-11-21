export interface IClassroom {
    name: string;
    passcode: string;
    problemsForToday: string[];
    resourceWeb: string;
}

export interface IClassroomWithId {
    _id: string;
    name: string;
    passcode: string;
    problemsForToday: string[];
    resourceWeb: string;
}

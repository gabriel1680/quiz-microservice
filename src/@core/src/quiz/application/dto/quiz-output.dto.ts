export type QuizOutput = {
    id: string;
    title: string;
    questions: {
        id: string;
        title: string;
        correctAnswer: string;
        answers: {
            id: string | number;
            text: string;
        }[];
        createdAt: Date;
        updatedAt: Date;
    }[];
    createdAt: Date;
    updatedAt: Date;
};

export type CreateQuizInput = {
    title: string;
    questions: {
        title: string;
        correctAnswer: string;
        answers: {
            id: string | number;
            text: string;
        }[];
    }[];
};

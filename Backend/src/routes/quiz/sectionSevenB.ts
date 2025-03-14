import { Router, Request, Response } from "express";
import { saveQuery } from "../../models/saveQuery";
import { sendQuery } from "../../models/sendQuery";
import pool from "../../../db";
import { addData, deleteOneData } from "../../queries";
import { addOutcome, deleteOutcome } from "../../queries";
import { addMissingQuestions } from "../../utils/addEmptyQuestion";

const sectionSevenBRouter = Router();

//Section 7b Question 1
sectionSevenBRouter.get("/1/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "1",
        section: "7b",
        instructions:
            "With the participant sitting on a chair with their eyes closed, touch alternatively their big toes and ask which part of their body is being touched.\nThen move the toe up, and ask in which direction the toe is being moved.",
        question:
            "Is the participant able to CORRECTLY IDENTIFY the TOE being moved and DIRECTION of movement?",
        answers: ["Yes", "No"],
        imageUrl:
            "https://drive.google.com/file/d/1iM_dkfFdV0v506htxK8gjynQYUUjj4LP/view?usp=sharing",
        videoUrl:
            "https://drive.google.com/file/d/1lXedVuPkDnBLd8catzNv6fgSZQQkYoFR/view?usp=sharing",
        mc: true,
        title: "Deep Sensitivity - Lower Limb",
    };

    res.status(200).json(nextQuery);
});

sectionSevenBRouter.post("/1", (req: Request, res: Response) => {
    let nextQuestionID = 0;
    let nextSectionID = "7b";

    const data: saveQuery = {
        uuid: req.body.id,
        section: req.body.section,
        q_id: req.body.q_id,
        question: req.body.question,
        answer: req.body.answer,
    };
    pool.query(
        deleteOneData,
        [data.uuid, data.section, data.q_id],
        (error, results) => {
            if (error) throw error;
            pool.query(
                addData,
                [
                    data.uuid,
                    data.section,
                    data.q_id,
                    data.question,
                    data.answer,
                ],
                (error, results) => {
                    if (error) throw error;
                }
            );
        }
    );

    if (req.body.answer === "Yes") {
        nextQuestionID = 1;
        nextSectionID = "5";
        //1
        addMissingQuestions(
            data.uuid,
            data.section,
            [2, 3, 4, 5],
            ["", "", "", ""]
        );
    } else if (req.body.answer === "No") {
        nextQuestionID = 2;
    }

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section 7b Question 2
sectionSevenBRouter.get("/2/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "2",
        section: "7b",
        instructions:
            "With the participant sitting on a chair with their eyes closed, touch alternatively their big toes and ask which part of their body is being touched.\nThen move the toe up, and ask in which direction the toe is being moved.",
        question: "",
        answers: [
            "Participant is ABLE to IDENTIFY the TOE but NOT the DIRECTION",
            "Participant is ABLE to IDENTIFY the DIRECTION but NOT the TOE",
            "Participant is UNABLE to IDENTIFY BOTH TOE and DIRECTION",
        ],
        imageUrl: "",
        videoUrl: "",
        mc: true,
        title: "Deep Sensitivity - Lower Limb",
    };

    res.status(200).json(nextQuery);
});

sectionSevenBRouter.post("/2", (req: Request, res: Response) => {
    let nextQuestionID = 0;
    let nextSectionID = "7b";

    const data: saveQuery = {
        uuid: req.body.id,
        section: req.body.section,
        q_id: req.body.q_id,
        question: req.body.question,
        answer: req.body.answer,
    };
    pool.query(
        deleteOneData,
        [data.uuid, data.section, data.q_id],
        (error, results) => {
            if (error) throw error;
            pool.query(
                addData,
                [
                    data.uuid,
                    data.section,
                    data.q_id,
                    data.question,
                    data.answer,
                ],
                (error, results) => {
                    if (error) throw error;
                }
            );
        }
    );

    if (
        req.body.answer ===
        "Participant is ABLE to IDENTIFY the TOE but NOT the DIRECTION"
    ) {
        nextQuestionID = 3;
    } else if (
        req.body.answer ===
        "Participant is ABLE to IDENTIFY the DIRECTION but NOT the TOE"
    ) {
        nextQuestionID = 4;
    } else if (
        req.body.answer ===
        "Participant is UNABLE to IDENTIFY BOTH TOE and DIRECTION"
    ) {
        nextQuestionID = 5;
    }

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section 7b Question 3
sectionSevenBRouter.get("/3/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "3",
        section: "7b",
        instructions:
            "With the participant sitting on a chair with their eyes closed, touch alternatively their big toes and ask which part of their body is being touched.\nThen move the toe up, and ask in which direction the toe is being moved.",
        question: "",
        answers: ["LEFT TOE", "RIGHT TOE", "BOTH TOES"],
        imageUrl: "",
        videoUrl: "",
        mc: true,
        title: "Deep Sensitivity - Lower Limb",
    };

    res.status(200).json(nextQuery);
});

sectionSevenBRouter.post("/3", (req: Request, res: Response) => {
    let nextQuestionID = 1;
    let nextSectionID = "5";

    const data: saveQuery = {
        uuid: req.body.id,
        section: req.body.section,
        q_id: req.body.q_id,
        question: req.body.question,
        answer: req.body.answer,
    };
    pool.query(
        deleteOneData,
        [data.uuid, data.section, data.q_id],
        (error, results) => {
            if (error) throw error;
            pool.query(
                addData,
                [
                    data.uuid,
                    data.section,
                    data.q_id,
                    data.question,
                    data.answer,
                ],
                (error, results) => {
                    if (error) throw error;
                }
            );
        }
    );

    pool.query(deleteOutcome, [data.uuid, data.section], (error, results) => {
        if (error) throw error;
        pool.query(
            addOutcome,
            [
                data.uuid,
                data.section,
                "LL Deep Sensitivity Impairment" + " - " + data.answer,
            ],
            (error, results) => {
                if (error) throw error;
            }
        );
    });

    //1, 2, 3
    addMissingQuestions(data.uuid, data.section, [4, 5], ["", ""]);

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section 7b Question 4
sectionSevenBRouter.get("/4/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "4",
        section: "7b",
        instructions:
            "With the participant sitting on a chair with their eyes closed, touch alternatively their big toes and ask which part of their body is being touched.\nThen move the toe up, and ask in which direction the toe is being moved.",
        question: "",
        answers: ["LEFT TOE", "RIGHT TOE", "BOTH TOES"],
        imageUrl: "",
        videoUrl: "",
        mc: true,
        title: "Deep Sensitivity - Lower Limb",
    };

    res.status(200).json(nextQuery);
});

sectionSevenBRouter.post("/4", (req: Request, res: Response) => {
    let nextQuestionID = 1;
    let nextSectionID = "5";

    const data: saveQuery = {
        uuid: req.body.id,
        section: req.body.section,
        q_id: req.body.q_id,
        question: req.body.question,
        answer: req.body.answer,
    };
    pool.query(
        deleteOneData,
        [data.uuid, data.section, data.q_id],
        (error, results) => {
            if (error) throw error;
            pool.query(
                addData,
                [
                    data.uuid,
                    data.section,
                    data.q_id,
                    data.question,
                    data.answer,
                ],
                (error, results) => {
                    if (error) throw error;
                }
            );
        }
    );

    pool.query(deleteOutcome, [data.uuid, data.section], (error, results) => {
        if (error) throw error;
        pool.query(
            addOutcome,
            [
                data.uuid,
                data.section,
                "LL Superficial Sensitivity Impairment" + " - " + data.answer,
            ],
            (error, results) => {
                if (error) throw error;
            }
        );
    });

    //1, 2, 4
    addMissingQuestions(data.uuid, data.section, [3, 5], ["", ""]);

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section 7b Question 5
sectionSevenBRouter.get("/5/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "5",
        section: "7b",
        instructions:
            "With the participant sitting on a chair with their eyes closed, touch alternatively their big toes and ask which part of their body is being touched.\nThen move the toe up, and ask in which direction the toe is being moved.",
        question: "",
        answers: ["LEFT TOE", "RIGHT TOE", "BOTH TOES"],
        imageUrl: "",
        videoUrl: "",
        mc: true,
        title: "Deep Sensitivity - Lower Limb",
    };

    res.status(200).json(nextQuery);
});

sectionSevenBRouter.post("/5", (req: Request, res: Response) => {
    let nextQuestionID = 1;
    let nextSectionID = "5";

    const data: saveQuery = {
        uuid: req.body.id,
        section: req.body.section,
        q_id: req.body.q_id,
        question: req.body.question,
        answer: req.body.answer,
    };
    pool.query(
        deleteOneData,
        [data.uuid, data.section, data.q_id],
        (error, results) => {
            if (error) throw error;
            pool.query(
                addData,
                [
                    data.uuid,
                    data.section,
                    data.q_id,
                    data.question,
                    data.answer,
                ],
                (error, results) => {
                    if (error) throw error;
                }
            );
        }
    );

    pool.query(deleteOutcome, [data.uuid, data.section], (error, results) => {
        if (error) throw error;
        pool.query(
            addOutcome,
            [
                data.uuid,
                data.section,
                "LL Superficial + Deep Sensitivity Impairment" +
                    " - " +
                    data.answer,
            ],
            (error, results) => {
                if (error) throw error;
            }
        );
    });

    //1, 2, 5
    addMissingQuestions(data.uuid, data.section, [3, 4], ["", ""]);

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

export default sectionSevenBRouter;
